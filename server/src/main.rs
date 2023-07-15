mod sqlite_store;
mod user;

#[macro_use]
extern crate log;

use std::{net::SocketAddr, sync::Arc};

use axum::{
    extract::State,
    response::IntoResponse,
    routing::{get, post},
    Extension, Json, Router,
};
use axum_login::{
    axum_sessions::{
        async_session::{serde::Serialize, MemoryStore},
        SessionLayer,
    },
    AuthLayer, RequireAuthorizationLayer,
};
use hyper::{http::HeaderValue, Method};
use rand::Rng;

use serde::Deserialize;
use tower_http::cors::{Any, Cors, CorsLayer};

use sqlite_store::{CreateUser, SqliteStore};
use user::User;

struct AppState<'a> {
    sqlite_store: SqliteStore<'a>,
}

type AuthContext = axum_login::extractors::AuthContext<i64, User, axum_login::SqliteStore<User>>;

#[derive(Serialize)]
struct SuccessResponse {
    success: bool,
}

const SUCCESS_RESPONSE: SuccessResponse = SuccessResponse { success: true };
const DB_URL: &str = "omnihook-store.db";

#[tokio::main]
async fn main() {
    env_logger::init();
    let secret = rand::thread_rng().gen::<[u8; 64]>();

    let session_store = MemoryStore::new();
    let session_layer = SessionLayer::new(session_store, &secret).with_secure(false);

    let sqlite_store = SqliteStore::new(DB_URL).await;

    let pool = sqlite_store.pool.clone();
    let user_store = axum_login::SqliteStore::<User>::new(pool);
    let auth_layer = AuthLayer::new(user_store, &secret);

    let router_state = Arc::new(AppState { sqlite_store });

    let app = Router::new()
        .route("/protected", get(protected_handler))
        .route_layer(RequireAuthorizationLayer::<i64, User>::login())
        .route("/login", post(login_handler))
        .route("/logout", post(logout_handler))
        .route("/signup", post(signup_handler))
        .layer(auth_layer)
        .layer(session_layer)
        .layer(CorsLayer::very_permissive())
        .with_state(router_state);

    info!("Serving on: http://127.0.0.1:3010");

    let addr = SocketAddr::from(([127, 0, 0, 1], 3010));
    // let tls_config = RustlsConfig::from_pem_file()

    axum_server::bind(addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn logout_handler(mut auth: AuthContext) -> impl IntoResponse {
    dbg!("Logging out user: {}", &auth.current_user);
    auth.logout().await;
    Json(SUCCESS_RESPONSE)
}

async fn protected_handler(Extension(user): Extension<User>) -> impl IntoResponse {
    format!("Logged in as: {}", user.username)
}

#[derive(Deserialize, Serialize)]
struct LoginForm {
    email_or_username: String,
    password: String,
}

#[derive(Serialize)]
struct LoginResponse {
    message: String,
}

impl LoginResponse {
    fn new(message: &str) -> Self {
        Self {
            message: message.to_string(),
        }
    }
}

async fn login_handler(
    State(state): State<Arc<AppState<'_>>>,
    mut auth: AuthContext,
    Json(login_form): Json<LoginForm>,
) -> Json<LoginResponse> {
    let user = state
        .sqlite_store
        .find_user(&login_form.email_or_username)
        .await
        .unwrap();

    if let Some(user) = user {
        let password_is_correct =
            argon2::verify_encoded(&user.password_hash, login_form.password.as_bytes()).unwrap();

        if password_is_correct {
            auth.login(&user).await.unwrap();
            Json(LoginResponse::new("login_successful"))
        } else {
            Json(LoginResponse::new("password_incorrect"))
        }
    } else {
        Json(LoginResponse::new("could_not_find_user"))
    }
}

async fn signup_handler(
    State(state): State<Arc<AppState<'_>>>,
    mut auth: AuthContext,
    create_user: Json<CreateUser>,
) -> Json<LoginResponse> {
    let user = state
        .sqlite_store
        .find_user_by_username(&create_user.username)
        .await
        .unwrap();

    if user.is_some() {
        return Json(LoginResponse::new("username_exists"));
    }

    if let Some(email) = &create_user.email {
        let user = state.sqlite_store.find_user_by_email(email).await.unwrap();

        if user.is_some() {
            return Json(LoginResponse::new("email_exists"));
        }
    }

    let user = state.sqlite_store.create_user(&create_user).await.unwrap();
    auth.login(&user).await.unwrap();
    Json(LoginResponse::new("signup_successful"))
}
