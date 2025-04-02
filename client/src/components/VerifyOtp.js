import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VerifyOtp() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [timer, setTimer] = useState(120); //timer
    const [resendDisabled, setResendDisabled] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailFromOtpMail = queryParams.get('email');
        setEmail(emailFromOtpMail);
    }, [location.search]);

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        } else {
            setResendDisabled(false);
        }
    }, [timer]);

    const handleResend = async () => {
        setResendDisabled(true); 
        try {
            await axios.delete("http://localhost:5000/api/users/deleteotp", { data: { email } });
            const response = await axios.post("http://localhost:5000/api/users/sendotp", { email });

            if (response.data.success) {
                toast.success('OTP sent successfully');
                setTimer(120); 
                setResendDisabled(false); 
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to resend OTP');
            setResendDisabled(false); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { otp, email };

        try {
            const response = await axios.post("http://localhost:5000/api/users/verifyotp", data);

            if (response.data.success) {
                setMessage('OTP verification successful');
                navigate(`/change-password?email=${email}`);
            } else {
                setMessage('Incorrect OTP');
            }
        } catch (err) {
            console.log(err);
            toast.error('Invalid OTP!!');
        }
    };

    return (
        <div className='sendotp'>
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <br></br>
                            <label className='form-label'>Enter Email:</label>
                            <input type='email' value={email} className='form-control' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} disabled style={{
                                maxWidth:'400px',
                                color:'black'
                            }}/>
                        </div>
                        <div className='mb-3' style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ maxWidth: '400px' }}>
                                <label className='form-label'>Enter OTP:</label>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(inputProps, index) => (
                                        <input
                                            {...inputProps}
                                            autoFocus={index === 0} 
                                            style={{
                                                width: '3rem',
                                                height: '3rem',
                                                margin: '0 0.5rem',
                                                fontSize: '2rem',
                                                borderRadius: '4px',
                                                border: '1px solid blue',
                                                backgroundColor:'white',
                                                color:'black',
                                                textAlign: 'center'
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <br></br>
                        <div align="center">
                            <button type='submit' style={{ display: 'inline-block', padding: '10px 15px', fontSize: '20px', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', outline: 'none', color: '#fff', backgroundColor: '#04AA6D', border: 'none', borderRadius: '15px', boxShadow: '0 9px #999', transition: 'background-color 0.3s' }} 
                                onMouseOver={(e) => e.target.style.backgroundColor = '#007bff'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#04AA6D'}>
                                Submit OTP
                            </button>
                        </div>
                    </form>
                    <br></br>
                    <div className="mt-3" align="center">
                        {message && <p className={message.includes('successful') ? 'text-success' : 'text-danger'}>{message}</p>}
                        {timer === 0 && (
                            <button onClick={handleResend} disabled={resendDisabled} style={{ display: 'inline-block', padding: '10px 15px', fontSize: '20px', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', outline: 'none', color: '#fff', backgroundColor: '#04AA6D', border: 'none', borderRadius: '15px', boxShadow: '0 9px #999', transition: 'background-color 0.3s' }} 
                            onMouseOver={(e) => e.target.style.backgroundColor = '#007bff'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#646cff'}>Resend OTP</button>
                        )}
                        {timer > 0 && (
                            <p>Resend OTP in {timer} seconds</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp;
