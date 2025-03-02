import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./resetpass.css"

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { email, otp } = location.state || {};

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/user/resetpassword", { email, otp, newPassword });
            setMessage(response.data.msg);
            navigate("/userlogin");
        } catch (error) {
            setMessage(error.response?.data?.msg || "Error resetting password");
        }
    };

    return (
        <div className="forgot-pass-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword} className="forgotpass-form">
                <input className="forgotpass-input" type="password" placeholder="New Password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <input className="forgotpass-input" type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button  type="submit" className="send-otp-btn">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
