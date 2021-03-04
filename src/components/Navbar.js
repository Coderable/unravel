import { useHistory, Link } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";
import { useEffect } from "react";

function Navbar() {
  const history = useHistory();

  const token = localStorage.getItem("token");
  let decoded = token ? jsonwebtoken.verify(token, "unravelstan") : false;
  console.log("decoded", decoded);

  const onLogout = () => {
    console.log("logging out");
    localStorage.removeItem("token");
    history.push("/login");
  };

  useEffect(() => {
    let decoded = token ? jsonwebtoken.verify(token, "unravelstan") : false;
    console.log("useEffect decoded", decoded);
  }, [token]);
  return (
    <nav>
      <div>
        <Link to="/">Unravel</Link>
      </div>
      {decoded ? (
        <>
          <div>
            <Link to="/cart">Cart</Link>
          </div>
          <div>
            Hello, {decoded.firstname} {decoded.lastname}.{" "}
            <button type="button" onClick={() => onLogout()}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
