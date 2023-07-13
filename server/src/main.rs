//! Run with
//!
//! ```not_rust
//! cd examples && cargo run -p example-sqlite
//! ```

use std::{net::SocketAddr, sync::Arc};

use axum::{extract::State, response::IntoResponse, routing::get, Extension, Router};
use axum_login::{
    axum_sessions::{async_session::MemoryStore, SessionLayer},
    secrecy::SecretVec,
    AuthLayer, AuthUser, RequireAuthorizationLayer, SqliteStore,
};
use axum_server::tls_rustls::RustlsConfig;
use rand::Rng;
use sqlx::sqlite::SqlitePoolOptions;

#[derive(Debug, Default, Clone, sqlx::FromRow)]
struct User {
    id: i64,
    password_hash: String,
    name: String,
}

impl AuthUser<i64> for User {
    fn get_id(&self) -> i64 {
        self.id
    }

    fn get_password_hash(&self) -> SecretVec<u8> {
        SecretVec::new(self.password_hash.clone().into())
    }
}

struct MySQL {
    pool: sqlx::Pool<sqlx::Sqlite>,
}

impl MySQL {
    async fn conn(&self) -> sqlx::pool::PoolConnection<sqlx::Sqlite> {
        self.pool.acquire().await.unwrap()
    }

    async fn find_user(&self) -> User {
        let mut conn = self.conn().await;

        let user: User = sqlx::query_as("select * from users where id = 1")
            .fetch_one(&mut conn)
            .await
            .unwrap();

        user
    }
}

struct AppState {
    mysql: MySQL,
}

type AuthContext = axum_login::extractors::AuthContext<i64, User, SqliteStore<User>>;

#[tokio::main]
async fn main() {
    let secret = rand::thread_rng().gen::<[u8; 64]>();

    let session_store = MemoryStore::new();
    let session_layer = SessionLayer::new(session_store, &secret).with_secure(false);

    let pool = SqlitePoolOptions::new()
        .connect("sqlite/user_store.db")
        .await
        .unwrap();

    let user_store = SqliteStore::<User>::new(pool);
    let auth_layer = AuthLayer::new(user_store, &secret);

    let router_state = Arc::new(AppState {
        mysql: MySQL {
            pool: SqlitePoolOptions::new()
                .connect("sqlite/user_store.db")
                .await
                .unwrap(),
        },
    });

    let app = Router::new()
        .route("/protected", get(protected_handler))
        .route_layer(RequireAuthorizationLayer::<i64, User>::login())
        .route("/login", get(login_handler))
        .route("/logout", get(logout_handler))
        .layer(auth_layer)
        .layer(session_layer)
        .with_state(router_state);

    println!("Serving on: http://127.0.0.1:3010");

    let addr = SocketAddr::from(([127, 0, 0, 1], 3010));
    // let tls_config = RustlsConfig::from_pem_file()

    axum_server::bind(addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn logout_handler(mut auth: AuthContext) {
    dbg!("Logging out user: {}", &auth.current_user);
    auth.logout().await;
}

async fn protected_handler(Extension(user): Extension<User>) -> impl IntoResponse {
    format!("Logged in as: {}", user.name)
}

async fn login_handler(State(state): State<Arc<AppState>>, mut auth: AuthContext) {
    let user = state.mysql.find_user().await;
    auth.login(&user).await.unwrap();
}
