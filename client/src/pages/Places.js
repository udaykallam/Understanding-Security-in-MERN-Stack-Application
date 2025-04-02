import React,{ useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
import './Places.css'; // Import CSS file for styling
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';

const Places = () => {
    const [cities, setCities] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
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
  
    const handleCardHover = (isHovered, index) => {
      if (isHovered) {
        setHoveredCard(index);
      } else {
        setHoveredCard(null);
      }
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
  
  
    return (
      <>
      <br></br>
      <h1>Cities</h1>
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
      </>
    );
};

export default Places;
