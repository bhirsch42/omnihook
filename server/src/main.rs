mod sqlite_store;
mod user;

#[macro_use]
extern crate log;

use std::{net::SocketAddr, sync::Arc};

use axum::{extract::State, response::IntoResponse, routing::get, Extension, Json, Router};
use axum_login::{
    axum_sessions::{
        async_session::{serde::Serialize, MemoryStore},
        SessionLayer,
    },
    AuthLayer, RequireAuthorizationLayer,
};
use hyper::{http::HeaderValue, Method};
use rand::Rng;

use tower_http::cors::CorsLayer;

use sqlite_store::SqliteStore;
use user::User;

struct AppState {
    sqlite_store: SqliteStore,
}

type AuthContext = axum_login::extractors::AuthContext<String, User, axum_login::SqliteStore<User>>;

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

    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin("http://127.0.0.1:5173".parse::<HeaderValue>().unwrap())
        .allow_credentials(true);

    let app = Router::new()
        .route("/protected", get(protected_handler))
        .route_layer(RequireAuthorizationLayer::<String, User>::login())
        .route("/login", get(login_handler))
        .route("/logout", get(logout_handler))
        .layer(auth_layer)
        .layer(session_layer)
        .layer(cors)
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

async fn login_handler(
    State(state): State<Arc<AppState>>,
    mut auth: AuthContext,
) -> impl IntoResponse {
    let user = state.sqlite_store.find_user().await;
    auth.login(&user).await.unwrap();
    Json(SUCCESS_RESPONSE)
}
