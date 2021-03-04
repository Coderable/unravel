import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import formatCurrency from "../../utils/currencyFormat";
import jsonwebtoken from "jsonwebtoken";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  const [isLoading, setIsloading] = useState(false);
  const [items, setItems] = useState([]);

  const addCart = (obj) => {
    console.log("atc", obj);
    let token = localStorage.getItem("token");
    let cart = localStorage.getItem("cart");
    let decoded = token ? jsonwebtoken.verify(token, "unravelstan") : false;
    if (decoded.email) {
      if (cart) {
        let val = JSON.parse(cart);
        val.push(JSON.stringify(obj));
        localStorage.setItem("cart", val);
      } else {
        let val = [];
        val.push(JSON.stringify(obj));
        localStorage.setItem("cart", val);
      }
    } else {
      history.push("/login");
    }
  };
  useEffect(() => {
    setIsloading(true);
    axios
      .get("http://localhost:4000/item/list")
      .then((res) => {
        console.log(res);
        setItems(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong when loading item");
        setIsloading(false);
      });
  }, []);
  return (
    <Layout>
      <section id="home">
        <div className="container">
          <h4>Home</h4>
          <div className="item-wrapper">
            {isLoading ? (
              <div>Loading items...</div>
            ) : (
              items.map((item) => {
                return (
                  <div className="card-item">
                    <div>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div>{item.name}</div>
                    <div>{formatCurrency(item.price)}</div>
                    <div
                      className="btn btn-main text-center"
                      style={{ marginTop: `1rem` }}
                      onClick={() => addCart(item)}
                    >
                      Add to card
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default Home;
