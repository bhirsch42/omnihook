use sqlx::sqlite::SqlitePoolOptions;

use crate::user::User;

pub struct SqliteStore {
    pub pool: sqlx::Pool<sqlx::Sqlite>,
}

impl SqliteStore {
    pub async fn new(db_url: &str) -> Self {
        Self {
            pool: SqlitePoolOptions::new().connect(db_url).await.unwrap(),
        }
    }

    async fn conn(&self) -> sqlx::pool::PoolConnection<sqlx::Sqlite> {
        self.pool.acquire().await.unwrap()
    }

    pub async fn find_user(&self) -> User {
        let user: User = sqlx::query_as!(User, "select * from users where id = 1")
            .fetch_one(&mut self.conn().await)
            .await
            .unwrap();

        user
    }
}
