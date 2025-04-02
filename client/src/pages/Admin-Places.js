import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const AdminPlaces = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [entryFees, setEntryFees] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [places, setPlaces] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchHovered, setSearchHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/places/getdata');
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };
    fetchPlaces();
  }, []);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace with your upload preset
    const response = await axios.post(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, formData);
    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrls = [];
      for (const image of images) {
        const imageUrl = await uploadImageToCloudinary(image);
        imageUrls.push(imageUrl);
      }

      const token = localStorage.getItem('token'); // assuming the token is stored in localStorage
      await axios.post('http://localhost:5000/api/places/data', {
        title,
        description,
        location: { address, city, state, country },
        images: imageUrls,
        video,
        openingHours,
        entryFees,
        contactInformation: { phone, email, website },
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert('Place uploaded successfully');
      // Reset form fields
      setTitle('');
      setDescription('');
      setAddress('');
      setCity('');
      setState('');
      setCountry('');
      setImages([]);
      setVideo('');
      setOpeningHours('');
      setEntryFees('');
      setPhone('');
      setEmail('');
      setWebsite('');
      // Fetch updated places list
      const response = await axios.get('http://localhost:5000/api/places/getdata');
      setPlaces(response.data);
    } catch (error) {
      console.error('Failed to upload place:', error);
      alert('Failed to upload place');
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

  const filteredPlaces = places.filter((place) =>
    place.title.toLowerCase().includes(searchQuery.toLowerCase())
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
      <h1>Place Uploader</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', width: '50%', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <input 
          type="text" 
          placeholder="City" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <input 
          type="text" 
          placeholder="State" 
          value={state} 
          onChange={(e) => setState(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Country" 
          value={country} 
          onChange={(e) => setCountry(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <input 
          type="file" 
          multiple 
          onChange={handleImageChange} 
          style={{ padding: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Video URL" 
          value={video} 
          onChange={(e) => setVideo(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Opening Hours" 
          value={openingHours} 
          onChange={(e) => setOpeningHours(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Entry Fees" 
          value={entryFees} 
          onChange={(e) => setEntryFees(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Website" 
          value={website} 
          onChange={(e) => setWebsite(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', borderRadius: '5px' }}>Upload Place</button>
      </form>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for places"
        style={searchInputStyles}
        onMouseEnter={() => handleSearchHover(true)}
        onMouseLeave={() => handleSearchHover(false)}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px', gap: '20px' }}>
        {filteredPlaces.map((place, index) => (
          <div
            key={place._id}
            style={{ ...cardStyles, margin: '10px' }}
            className="card"
            onMouseEnter={() => handleCardHover(true, index)}
            onMouseLeave={() => handleCardHover(false, index)}
          >
            <Card.Img variant="top" src={place.images[0]} style={imgStyles} />
            <div className="overlay" style={overlayStyles(index)}>
              <h2 style={h2Styles}>
                {place.title}
              </h2>
              <p style={pStyles}>{place.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPlaces;
