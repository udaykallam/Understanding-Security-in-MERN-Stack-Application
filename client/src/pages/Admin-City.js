import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';

const AdminCity = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [cities, setCities] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchHovered, setSearchHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cities');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);

    try {
      const token = localStorage.getItem('token'); // assuming the token is stored in localStorage
      await axios.post('http://localhost:5000/api/cities/city', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('City uploaded successfully');
      setTitle('');
      setImage(null);
      // Fetch updated cities list
      const response = await axios.get('http://localhost:5000/api/cities');
      setCities(response.data);
    } catch (error) {
      console.error('Failed to upload city:', error);
      toast.error('Failed to upload city');
    }
  };

  const handleCardHover = (isHovered, index) => {
    if (isHovered) {
      setHoveredCard(index);
    } else {
      setHoveredCard(null);
    }
  };

  const handleSearchHover = (isHovered) => {
    setSearchHovered(isHovered);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCities = cities.filter((city) =>
    city.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cardStyles = {
    width: '19rem',
    height: '25rem',
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    color: 'var(--color-primary-white)',
    boxShadow: '0 10px 30px 5px rgba(0, 0, 0, 0.2)',
  };

  const imgStyles = {
    position: 'absolute',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    transition: 'opacity 0.2s ease-out',
    overflow: 'hidden',
  };

  const overlayStyles = (index) => ({
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '20px',
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))',
    pointerEvents: hoveredCard === index ? 'all' : 'none',
    opacity: hoveredCard === index ? '1' : '0',
    transition: 'opacity 0.3s ease-out',
  });

  const h2Styles = {
    fontWeight: '549',
    fontSize: '2.5em',
    textTransform: 'uppercase',
    color: 'white',
    marginBottom: '10px',
  };

  const pStyles = {
    color: 'white',
  };

  const searchInputStyles = {
    padding: '15px',
    fontSize: '16px',
    border: '1px solid lightblue',
    borderRadius: '5px',
    marginBottom: '10px',
    background: 'none',
    width: '100%', 
    maxWidth: '600px', 
    boxShadow: searchHovered ? '0 5px 15px rgba(0, 0, 0, 0.2)' : '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    outline: 'none',
    marginTop: '1px', 
    color: 'white',
  };

  return (
    <div style={{ padding: '20px', marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={handleTitleChange} 
          style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid lightgray' }}
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          style={{ marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer' }}>
          Upload
        </button>
      </form>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for cities"
        style={searchInputStyles}
        onMouseEnter={() => handleSearchHover(true)}
        onMouseLeave={() => handleSearchHover(false)}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px', gap: '20px' }}>
        {filteredCities.map((city, index) => (
          <div
            key={city._id}
            style={{ ...cardStyles, margin: '10px' }}
            className="card"
            onMouseEnter={() => handleCardHover(true, index)}
            onMouseLeave={() => handleCardHover(false, index)}
          >
            <Card.Img variant="top" src={city.imageUrl} style={imgStyles} />
            <div className="overlay" style={overlayStyles(index)}>
              <h2 style={h2Styles}>
                {city.title}
              </h2>
              <p style={pStyles}>{city.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCity;
