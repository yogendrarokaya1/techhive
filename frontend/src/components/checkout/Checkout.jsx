import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./checkout.css";
import qrImage from "../../media/qr.jpg";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("productId");
  const initialQuantity = parseInt(searchParams.get("quantity")) || 1;

  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [address, setAddress] = useState({
    district: "",
    city: "",
    tole: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          navigate("/userlogin");
          return;
        }
        const response = await axios.get("http://localhost:5000/api/user/userdata", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/laptopdetails/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("You must be logged in to place an order.");
        navigate("/userlogin");
        return;
      }

      // Validate shipping address
      if (!address.district || !address.city || !address.tole) {
        alert("Please fill out all shipping address fields.");
        return;
      }

      const orderData = {
        productId: product.id,
        quantity,
        totalPrice: product.price * quantity,
        district: address.district,
        city: address.city,
        tole: address.tole,
        paymentmethod: paymentMethod,
      };

      // Create order
      const response = await axios.post(
        "http://localhost:5000/api/orders/place",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully!");
      navigate("/order");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  if (!user || !product) return <p>Loading...</p>;

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Product Details */}
      <div className="checkout-section">
        <h3>Product Details</h3>
        <p>Name: {product.name}</p>
        <p>Price: Rs {product.price}</p>
        <p>
          Quantity:{" "}
          <input
            type="number"
            value={quantity}
            min="1"
            max={product.stock}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          />
        </p>
        <p>Total Price: Rs {totalPrice}</p>
      </div>

      {/* User Details */}
      <div className="checkout-section">
        <h3>Customer Details</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Contact: {user.contact}</p>
      </div>

      {/* Shipping Address */}
      <div className="checkout-section">
        <h3>Shipping Address</h3>
        <input
          type="text"
          placeholder="District"
          value={address.district}
          onChange={(e) => setAddress({ ...address, district: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tole"
          value={address.tole}
          onChange={(e) => setAddress({ ...address, tole: e.target.value })}
        />
      </div>

      {/* Payment Options */}
      <div className="checkout-section">
        <h3>Payment Method</h3>
        <label>
          <input
            type="radio"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />
          Cash on Delivery
        </label>
        <label>
          <input
            type="radio"
            value="esewa"
            checked={paymentMethod === "esewa"}
            onChange={() => setPaymentMethod("esewa")}
          />
          eSewa QR Payment
        </label>
        {paymentMethod === "esewa" && <img src={qrImage} alt="eSewa QR Code" className="qr-image" />}
      </div>

      <button className="confirmbtn" onClick={handleOrder}>
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;