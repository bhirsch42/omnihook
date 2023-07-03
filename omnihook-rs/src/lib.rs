mod utils;

use rhai::{Engine, EvalAltResult};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn print(s: &str) {
    log(s);
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct LancerScript {
    engine: Engine,
}

#[wasm_bindgen]

impl LancerScript {
    pub fn new() -> Self {
        Self {
            engine: Engine::new(),
        }
    }

    pub fn eval_script(&self, s: &str) -> i32 {
        self.engine.eval::<i32>(s).unwrap()
    }
}
