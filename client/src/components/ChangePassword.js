import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function ChangePassword() {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailFromUrl = queryParams.get('email');
        setEmail(emailFromUrl);
    }, [location.search]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        const data = {
            email,
            password,
        };
        try {
            const response = await axios.post("http://localhost:5000/api/users/change-password", data);
            if (response.data.success) {
                toast.success('Password changed successfully!!');
                navigate('/signin');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                const { message, extraDetails } = err.response.data;
                toast.error(message);
                toast.error(extraDetails);
            } else {
                toast.error('An error occurred while changing password');
            }
        }
    }

    return (
        <div className='change-password'>
            <div className='container mt-4'>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>New Password:</label>
                            <input className='form-control' value={password} type='password' onChange={(e) => setPassword(e.target.value)} required style={{
                                maxWidth:'400px'
                            }}/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Confirm Password:</label>
                            <input className='form-control' value={confirmPassword} type='password' onChange={(e) => setConfirmPassword(e.target.value)} required style={{
                                maxWidth:'400px'
                            }}/>
                        </div>
                        <br />
                        <div align="center">
                            <button type='submit'  style={{ display: 'inline-block', padding: '10px 15px', fontSize: '20px', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', outline: 'none', color: '#fff', backgroundColor: '#04AA6D', border: 'none', borderRadius: '15px', boxShadow: '0 9px #999', transition: 'background-color 0.3s' }} 
                            onMouseOver={(e) => e.target.style.backgroundColor = '#007bff'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#646cff'}>
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;
