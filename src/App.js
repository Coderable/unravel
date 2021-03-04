import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
// import Navbar from "./components/Navbar";
import LimitedRoute from "./components/LimitedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router>
      <Switch>
        <LimitedRoute path="/login" component={() => <Login />} />
        <LimitedRoute path="/register" component={() => <Register />} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
