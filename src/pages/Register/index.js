import Layout from "../../components/Layout";
import Input from "../../components/Input";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();

  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name + value);
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("register submitted", state);

    axios
      .post("http://localhost:4000/user/register", state)
      .then((response) => {
        console.log("res", response);
        if (response.data.success) {
          alert("Success create account");
          //   localStorage.setItem("token", response.data.data.token);
          history.push("/login");
          // props.handleLogin();
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        alert(err.response.data);
        console.log("err", err.response.data);
      });
  };

  const { firstname, lastname, email, password } = state;
  return (
    <Layout>
      <section id="register">
        <div className="container half-wrap card big">
          <div>
            <h4>Register</h4>
            <form onSubmit={onSubmit}>
              <Input
                name="firstname"
                value={firstname}
                handleChange={handleChange}
              />
              <Input
                name="lastname"
                value={lastname}
                handleChange={handleChange}
              />
              <Input name="email" value={email} handleChange={handleChange} />
              <Input
                name="password"
                type="password"
                value={password}
                handleChange={handleChange}
              />
              <button
                type="submit"
                disabled={
                  firstname === "" ||
                  lastname === "" ||
                  email === "" ||
                  password === ""
                }
                className="btn btn-main"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default Register;
