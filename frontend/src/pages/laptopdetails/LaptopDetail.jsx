import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import "./laptopdetails.css";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/laptopdetails/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const prevImage = () => setCurrentIndex((currentIndex - 1 + product.images.length) % product.images.length);
  const nextImage = () => setCurrentIndex((currentIndex + 1) % product.images.length);
  const selectImage = (index) => setCurrentIndex(index);

  const handleBuyNow = () => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      navigate("/userlogin");
      return;
    }
    navigate(`/checkout?productId=${product.id}&quantity=${quantity}`);
  };
  
  const handleAddToCartlist = async () => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      navigate("/userlogin");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cartlist/add",
        { productId: product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Product already in your cart.");
    }
  };

  return (
    <div className="laptopdetail-container">
      <div className="laptopdetailcard">
        {/* Image Section */}
        <div className="laptopdetailimage-section">
          <div className="thumbnail-container">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className={`thumbnail ${index === currentIndex ? "active" : ""}`}
                onClick={() => selectImage(index)}
              />
            ))}
          </div>

          <div className="laptopdetailimage-slider">
            <button className="laptopdetailslider-btn left" onClick={prevImage}>
              <ChevronLeft size={16} />
            </button>
            <img src={product.images[currentIndex]} alt={product.name} className="laptopdetailproduct-image" />
            <button className="laptopdetailslider-btn right" onClick={nextImage}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="laptopdetailcard-content">
          <h3 className="laptopdetailtitle">
            {product.name}
            <span className="product-model"> | Model {product.modelseries}</span>
            <span className="product-processor"> | {product.processor} Processor</span>
            <span className="product-ram"> | {product.ram} RAM</span>
            <span className="product-storage"> | {product.storage} Storage</span>
          </h3>

          <p className="laptopdetailprice">Rs {product.price}</p>
          <p className="laptopdetailbrand">Brand: <span className="bold">{product.brand}</span></p>

          <p className={`stock-status ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
            {product.stock > 0 ? `In Stock` : "Out of Stock"}
          </p>

          <ul className="laptopdetailspecs">
            <li><strong>Processor:</strong> {product.processor}</li>
            <li><strong>Display:</strong> {product.screensize}</li>
            <li><strong>Memory:</strong> {product.ram}</li>
            <li><strong>Storage:</strong> {product.storage}</li>
            <li><strong>Operating System:</strong> {product.os}</li>
          </ul>

          {/* Actions */}
          <div className="laptopdetailactions">
            <p>Quantity</p>
            <input
              type="number"
              className="quantity-input"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.min(Math.max(parseInt(e.target.value) || 1, 1), product.stock))}
              disabled={product.stock <= 0}
            />

            <button
              className="btn add-to-cart"
              onClick={handleAddToCartlist}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="icon" size={18} /> Add to Cart
            </button>

            <button
              className="btn buy-now"
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
            >
              <CreditCard className="icon" size={18} /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="laptopdetail-description">
        <h2>Product Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
