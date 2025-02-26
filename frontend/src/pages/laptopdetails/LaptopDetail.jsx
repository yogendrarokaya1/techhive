import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import "./laptopdetails.css";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/laptopdetails/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const prevImage = () => setCurrentIndex((currentIndex - 1 + product.images.length) % product.images.length);
  const nextImage = () => setCurrentIndex((currentIndex + 1) % product.images.length);
  const selectImage = (index) => setCurrentIndex(index);

  return (
    <div className="laptopdetail-container">
      <div className="laptopdetailcard">
        
        {/* Image Section with Thumbnails */}
        <div className="laptopdetailimage-section">
          {/* Thumbnails on Left */}
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

          {/* Main Image Slider */}
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
            <input type="number" className="quantity-input" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
            <button className="btn add-to-cart"><ShoppingCart className="icon" size={18} /> Add to Cart</button>
            <button className="btn buy-now"><CreditCard className="icon" size={18} /> Buy Now</button>
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
