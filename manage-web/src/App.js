import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Main from "./modules/Main";
import Login from "./modules/Login";

import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
