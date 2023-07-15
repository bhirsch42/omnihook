use anyhow::anyhow;
use serde::Deserialize;
use sqlx::sqlite::SqlitePoolOptions;

use crate::user::User;

pub struct SqliteStore<'a> {
    pub pool: sqlx::Pool<sqlx::Sqlite>,
    password_hasher: PasswordHasher<'a>,
}

#[derive(Deserialize)]
pub struct CreateUser {
    pub username: String,
    pub password: String,
    pub email: Option<String>,
}

impl SqliteStore<'_> {
    pub async fn new(db_url: &str) -> SqliteStore<'_> {
        SqliteStore {
            pool: SqlitePoolOptions::new().connect(db_url).await.unwrap(),
            password_hasher: PasswordHasher(argon2::Config::default()),
        }
    }

    async fn conn(&self) -> sqlx::pool::PoolConnection<sqlx::Sqlite> {
        self.pool.acquire().await.unwrap()
    }

    pub async fn find_user(&self, email_or_username: &str) -> anyhow::Result<Option<User>> {
        sqlx::query_as!(
            User,
            "select * from users where username = ? or email = ?",
            email_or_username,
            email_or_username
        )
        .fetch_optional(&mut self.conn().await)
        .await
        .map_err(|_| anyhow!("Error finding user"))
    }

    pub async fn find_user_by_username(&self, username: &str) -> anyhow::Result<Option<User>> {
        sqlx::query_as!(User, "select * from users where username = ?", username)
            .fetch_optional(&mut self.conn().await)
            .await
            .map_err(|_| anyhow!("Error finding user"))
    }

    pub async fn find_user_by_email(&self, email: &str) -> anyhow::Result<Option<User>> {
        sqlx::query_as!(User, "select * from users where email = ?", email)
            .fetch_optional(&mut self.conn().await)
            .await
            .map_err(|_| anyhow!("Error finding user"))
    }

    pub async fn create_user(&self, create_user: &CreateUser) -> anyhow::Result<User> {
        let password_hash = self.password_hasher.create_hash(&create_user.password);

        sqlx::query!(
            "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
            create_user.username,
            create_user.email,
            password_hash
        )
        .execute(&mut self.conn().await)
        .await?;

        sqlx::query_as!(
            User,
            "select * from users where username = ?",
            create_user.username
        )
        .fetch_one(&mut self.conn().await)
        .await
        .map_err(|_| anyhow!("Error finding user"))
    }
}

struct PasswordHasher<'a>(argon2::Config<'a>);

impl PasswordHasher<'_> {
    fn create_hash(&self, password: &str) -> String {
        let salt = b"randomsalt"; // TODO: Load from .env
        argon2::hash_encoded(password.as_bytes(), salt, &self.0).unwrap()
    }
}
