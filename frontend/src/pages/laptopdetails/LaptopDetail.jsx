import { useState } from "react";
import { ShoppingCart, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import "./laptopdetails.css";
import LaptopImage1 from "../../media/products/laptop1.jpg";
import LaptopImage2 from "../../media/products/laptop.jpg";
import LaptopImage3 from "../../media/products/laptop2.jpg";

const images = [LaptopImage1, LaptopImage2, LaptopImage3]; // List of images

const LaptopDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState([
    { name: "John Doe", rating: 5, comment: "Excellent performance and great value for money!" },
    { name: "Jane Smith", rating: 4, comment: "The display is smooth, and the build quality is solid." },
  ]);

  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleReviewSubmit = () => {
    if (newReview.name && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", rating: 5, comment: "" });
    } else {
      alert("Please enter your name and review comment before submitting.");
    }
  };

  return (
    <div>
    <div className="laptopdetail-container">
      <div className="laptopdetailcard">
        <div className="laptopdetailimage-slider">
          <button className="laptopdetailslider-btn left" onClick={prevImage}>
            <ChevronLeft size={16} />
          </button>
          <img src={images[currentIndex]} alt="Laptop" className="laptopdetailproduct-image" />
          <button className="laptopdetailslider-btn right" onClick={nextImage}>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="laptopdetailcard-content">
          <h1 className="laptopdetailtitle">Acer Nitro V 15</h1>
          <p className="laptopdetailprice">Rs 112,800.00</p>
          <p className="laptopdetailmodel">Model: 83JC0031IN-1</p>
          <p className="laptopdetailbrand">Brand: <span className="bold">Acer</span></p>
          <ul className="laptopdetailspecs">
            <li><strong>Processor:</strong> 13th Gen Intel Core i5-13420H (up to 4.6GHz, 8 cores, 12 threads)</li>
            <li><strong>Display:</strong> 15.6" FHD (1920x1080) IPS, 144Hz refresh rate, anti-glare</li>
            <li><strong>Memory:</strong> 8GB DDR5 RAM (expandable)</li>
            <li><strong>Storage:</strong> 512GB NVMe SSD (expandable)</li>
            <li><strong>Operating System:</strong> Windows 11 Home</li>
          </ul>
          <div className="laptopdetailactions">
            <p>Quantity</p>
            <input 
              type="number" 
              className="quantity-input" 
              min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            /> 
            <button className="btn add-to-cart">
              <ShoppingCart className="icon" size={18} /> Add to Cart
            </button>
            <button className="btn buy-now">
              <CreditCard className="icon" size={18} /> Buy Now
            </button>
          </div>
        </div>
      </div>
      </div>
      {/* Description Section */}
      <div className="laptopdetail-description">
        <h2>Product Description</h2>
        <p>
          The Acer Nitro V 15 is designed for gaming and performance users. It features a high-refresh-rate 144Hz display, 
          ensuring smooth visuals, while the 13th Gen Intel Core i5 processor powers through multitasking and gaming effortlessly. 
          The laptop includes an advanced cooling system, immersive sound quality, and upgradable storage and RAM, making it future-proof 
          for users looking to enhance their setup. The sleek design, combined with a powerful GPU, provides a great gaming experience.
        </p>
      </div>

      {/* Reviews Section */}
      <div className="laptopdetail-reviews">
        <h2>Customer Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <h4>{review.name}</h4>
              <p>⭐ {review.rating} / 5</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}

        {/* Write a Review */}
        <div className="write-review">
          <h3>Write a Review</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            className="review-input"
          />
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
            className="review-rating"
          >
            <option value={5}>⭐ 5 - Excellent</option>
            <option value={4}>⭐ 4 - Good</option>
            <option value={3}>⭐ 3 - Average</option>
            <option value={2}>⭐ 2 - Poor</option>
            <option value={1}>⭐ 1 - Very Bad</option>
          </select>
          <textarea
            placeholder="Write your review here..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="review-textarea"
          ></textarea>
          <button className="btn submit-review" onClick={handleReviewSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaptopDetail;
