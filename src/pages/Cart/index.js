import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/currencyFormat";

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      let data = JSON.parse(cart);
      setCart(data);
    }
  }, []);

  return (
    <Layout>
      <section id="login">
        <div className="container half-wrap card big">
          <div>
            <h4>Cart</h4>
            {cart ? (
              <div>
                <div>
                  <img
                    src={cart.image}
                    alt={cart.name}
                    style={{ maxWidth: `100%` }}
                  />
                </div>
                <div>{cart.name}</div>
                <div>{formatCurrency(cart.price)}</div>
              </div>
            ) : (
              <div>Empty cart</div>
            )}
            <Link to="/checkout">Checkout</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default Cart;
