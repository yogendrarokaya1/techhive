import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./resetpass.css"


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/user/forgotpassword", { email });
            setMessage(response.data.msg);
            navigate("/verify-otp", { state: { email } }); // Pass email to next page
        } catch (error) {
            setMessage(error.response?.data?.msg || "Error sending OTP");
        }
    };

    return (
        <div className="forgot-pass-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSendOTP} className="forgotpass-form">
                <input className="forgotpass-input" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" className="send-otp-btn">Send OTP</button>
            </form>
            {message && <p className="otp-msg">{message}</p>}
        </div>
    );
};

export default ForgotPassword;
