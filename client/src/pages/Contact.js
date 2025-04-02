import React, { useState } from 'react';
import './Contact.css';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const defaultContactFormData={
  username:"",
  email:"",
  message:"",
};

const Contact = () => {
  const [contact,setContact]=useState(defaultContactFormData);

  const [userData,setUserData]=useState(true);

  const { user } = useAuth();

  if(userData && user){
    setContact({
      username:user.username,
      email:user.email,
      message:"",
    });
    setUserData(false);
  }

  const handleInput=(e)=>{
    const name=e.target.name;
    const value=e.target.value;

    setContact({
      ...contact,
      [name]:value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response=await fetch("http://localhost:5000/api/form/contact",{
        method:"POST",
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify(contact),
      });
      if(response.ok){
        setContact(defaultContactFormData);
        const data=await response.json();
        console.log(data);
        toast.success('Message sent successfully!');
      }
    } catch (error) {
      console.log(error);
    } 
    console.log(contact);
  };

  return (
    <div>
      <section id="contact">
        <h1 className="section-header">Contact US</h1>
        <div className="contact-wrapper">
          {/* Left side - Google Map */}
          <div className="maps">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2221.4021289571187!2d80.6212099727735!3d16.44209511829111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0a2a7d81943%3A0x8ba5d78f65df94b8!2sK%20L%20Deemed%20To%20Be%20University!5e0!3m2!1sen!2sin!4v1710296237285!5m2!1sen!2sin"
              width="100%"
              height="550"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {/* Right side - Contact Form */}
          <form id="contact-form" className="form-horizontal" onSubmit={handleSubmit}>

            <div className="form-group">
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="NAME"
                  name="username"
                  value={contact.username}
                  onChange={handleInput}
                  autoComplete='off'
                  required
                />
                <br />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="EMAIL"
                  name="email"
                  value={contact.email}
                  onChange={handleInput}
                  autoComplete='off'
                  required
                />
                <br />
              </div>
            </div>
            <textarea
              className="form-control"
              rows="10"
              placeholder="MESSAGE"
              name="message"
              id="message"
              value={contact.message}
              onChange={handleInput}
              autoComplete='off'
              required
            ></textarea>
            <br/>
            <br/>
            <button
              className="btn btn-primary send-button"
              id="submit"
              type="submit"
              value="SEND"
            >
              <div className="alt-send-button">
                <span className="send-text">SEND</span>
              </div>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
