import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { DEBUG_MODE } from "./config";
const { detect } = require("detect-browser");
const browser = detect();

const initalState = {};
const middleware = [thunk];

let store;

if (browser) {
  console.log(browser.name);
  console.log(browser.version);
  console.log(browser.os);
}

// handle the case where we don't detect the browser
switch (browser && browser.name) {
  case "chrome":
    console.log("supported");
    break;

  case "firefox":
    console.log("kinda ok");
    break;

  default:
    console.log("not supported");
}

if (DEBUG_MODE) {
  store = createStore(
    rootReducer,
    initalState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  store = createStore(
    rootReducer,
    initalState,
    compose(applyMiddleware(...middleware))
  );
}

export default store;
