import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import card1 from '../assets/cards/card1.jpg';
import card2 from '../assets/cards/card2.jpg';
import tajmahal from '../assets/cards/tajmahal.jpg';
import redfort from '../assets/cards/redfort.jpg';
import goldentemple from '../assets/cards/goldentemple.jpg';
import aguadafort from '../assets/cards/aguadafort.jpg';
import auth, { useAuth } from '../store/auth';
import Loading from './Loading';

const cardData = [
  {
    title: 'Taj Mahal',
    text: 'The Taj Mahal is a world-renowned white marble mausoleum in Agra, India, built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal.',
    imageSrc: tajmahal,
  },
  {
    title: 'Red Fort',
    text: 'The Red Fort, located in Delhi, India, is a historic fort and UNESCO World Heritage Site built by Emperor Shah Jahan, known for its impressive red sandstone architecture and historical significance in Mughal history.',
    imageSrc: redfort,
  },
  {
    title: 'Golden Temple',
    text: 'The Golden Temple, situated in Amritsar, India, is a sacred Sikh shrine renowned for its stunning golden architecture and central significance in Sikhism.',
    imageSrc: goldentemple,
  },
  {
    title: 'Aguada Fort,Goa',
    text: 'Aguada Fort in Goa, India, is a historic Portuguese fort overlooking the Arabian Sea, known for its 17th-century architecture and scenic views.',
    imageSrc: aguadafort,
  },
  {
    title: 'Hyderabad',
    text: 'Hyderabad is one of the best places to visit in Telangana.',
    imageSrc: card1,
  },
  {
    title: 'New Delhi',
    text: 'Delhi, the capital city of India, is a vibrant and historically rich metropolis that seamlessly blends the old with the new',
    imageSrc: card2,
  },
  {
    title: 'Hyderabad',
    text: 'Hyderabad is one of t he best places to visit in Telangana.',
    imageSrc: card1,
  },
  {
    title: 'New Delhi',
    text: 'Delhi, the capital city of India, is a vibrant and historically rich metropolis that seamlessly blends the old with the new',
    imageSrc: card2,
  },
];

const Home = () => {

  const {user,isLoading} = useAuth();

  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchHovered, setSearchHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if(isLoading){
    return <Loading/>
  }

  const handleCardHover = (isHovered, index) => {
    if (isHovered) {
      setHoveredCard(index);
    } else {
      setHoveredCard(null);
    }
  };

  const handleTitleClick = (index) => {
    setHoveredCard(index);
  };

  const handleSearchHover = (isHovered) => {
    setSearchHovered(isHovered);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCardData = cardData.filter((data) =>
    data.title.toLowerCase().includes(searchQuery.toLowerCase())
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
    '::placeholder':'red'
    
  };
  const headerStyle = {
    background: `linear-gradient(45deg, #657ee4, #9168b5, #d76674)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 750, 
};
  
  return (
    <div style={{ padding: '20px', marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
     <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                    <h1 style={headerStyle}>
            {user ? `Hii, ${user.username}. Welcome to ExploreIndia` : `Welcome to ExploreIndia`}
        </h1>
        <br></br>
        {user ? null : (
              <div className="btn btn-group">
                <a href="/signin">
                  <button className="btn" style={{ color: 'white' }}>Connect Now</button>
                </a>
                <a href="/services">
                  <button className="btn secondary-btn" style={{ color: 'white' }}>Learn More</button>
                </a>
              </div>
            )}
                    </div>
                </div>
            </section>
       <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for places"
        style={searchInputStyles}
        onMouseEnter={() => handleSearchHover(true)}
        onMouseLeave={() => handleSearchHover(false)}
      />
      <h1 style={{ color: 'white', marginRight: '1130px' }}>Top Places</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px', gap: '20px' }}>
        {filteredCardData.map((data, index) => (
          <div
            key={index}
            style={{ ...cardStyles, margin: '10px' }}
            className="card"
            onMouseEnter={() => handleCardHover(true, index)}
            onMouseLeave={() => handleCardHover(false, index)}
          >
            <Card.Img variant="top" src={data.imageSrc} style={imgStyles} />
            <div className="overlay" style={overlayStyles(index)}>
              <h2 style={h2Styles} onClick={() => handleTitleClick(index)}>
                {data.title}
              </h2>
              <p style={pStyles}>{data.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
