use axum_login::{secrecy::SecretVec, AuthUser};
use sqlx::types::chrono::NaiveDateTime;

#[derive(Debug, Default, Clone, sqlx::FromRow)]
pub struct User {
    pub id: i64,
    pub password_hash: String,
    pub username: String,
    pub email: Option<String>,
    pub created_at: Option<NaiveDateTime>,
}

impl AuthUser<i64> for User {
    fn get_id(&self) -> i64 {
        self.id
    }

    fn get_password_hash(&self) -> SecretVec<u8> {
        SecretVec::new(self.password_hash.clone().into())
    }
}
