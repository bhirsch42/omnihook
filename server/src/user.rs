use axum_login::{secrecy::SecretVec, AuthUser};
use sqlx::types::chrono::NaiveDateTime;

#[derive(Debug, Default, Clone, sqlx::FromRow)]
pub struct User {
    pub id: String,
    pub password_hash: String,
    pub username: String,
    pub email: String,
    pub created_at: Option<NaiveDateTime>,
}

impl AuthUser<String> for User {
    fn get_id(&self) -> String {
        self.id.clone()
    }

    fn get_password_hash(&self) -> SecretVec<u8> {
        SecretVec::new(self.password_hash.clone().into())
    }
}
