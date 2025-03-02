import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./resetpass.css"


const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/user/verifyotp", { email, otp });
            setMessage(response.data.msg);
            navigate("/reset-password", { state: { email, otp } });
        } catch (error) {
            setMessage(error.response?.data?.msg || "Invalid OTP");
        }
    };

    return (
        <div className="forgot-pass-container">
            <h2>Verify OTP</h2>
            <form onSubmit={handleVerifyOTP} className="forgotpass-form">
                <input className="forgotpass-input"  type="text" placeholder="Enter OTP" required value={otp} onChange={(e) => setOtp(e.target.value)} />
                <button className="send-otp-btn" type="submit">Verify</button>
            </form>
            {message && <p className="otp-msg">{message}</p>}
        </div>
    );
};

export default VerifyOTP;
