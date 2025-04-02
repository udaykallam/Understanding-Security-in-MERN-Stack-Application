import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OtpMail() {
    const [email, setSemail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please enter your email.');
            return;
        }

        const data = { email };

        try {
            const response = await axios.get(`http://localhost:5000/api/users/user-emails?email=${email}`);
            if (!response.data.emails || !response.data.emails.includes(email)) {
                toast.error('User does not exist.');
                return;
            }
            await axios.post("http://localhost:5000/api/users/sendotp", data);
            console.log("OTP Sent Successfully");
            navigate(`/verifyotp?email=${email}`);
        } catch (error) {
            console.log("Error sending OTP:", error);
        }
    };

    return (
        <div className='sendotp'>
            <div className="container mt-4">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className='form-label'>Enter Email:</label>
                            <input type='email' value={email} className='form-control' placeholder='Enter Email' style={{ maxWidth: '410px' }} onChange={(e) => setSemail(e.target.value)} />
                        </div>
                        <div align="center">
                            <br></br>
                            <button className="button" type='submit' style={{ display: 'inline-block', padding: '10px 15px', fontSize: '20px', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', outline: 'none', color: '#fff', backgroundColor: '#04AA6D', border: 'none', borderRadius: '15px', boxShadow: '0 9px #999', transition: 'background-color 0.3s' }} 
                                onMouseOver={(e) => e.target.style.backgroundColor = '#007bff'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#04AA6D'}>
                                Send OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OtpMail;
