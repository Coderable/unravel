import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import LimitedRoute from "./components/LimitedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <LimitedRoute path="/login" component={() => <Login />} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
