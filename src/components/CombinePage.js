import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import './CombinePage.css'; // Ensure your CSS file is linked
import FeatureModal from './FeatureModal'; // Import the modal component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const CombinedPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage hamburger menu visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  const features = [
    { id: 'short-stories', title: 'Izindatshana', description: 'Funda izindaba ezimnandi ezizokhuthaza izingane zakho.' },
    { id: 'izintsomi', title: 'Izintsomi', description: 'Izintsomi ezikhuluma ngempilo nezingane.' },
    { id: 'ukuphicaphica', title: 'Ukuphicaphica', description: 'Thola ukuphicaphica okuhle nezifundo ezinzulu.' },
    { id: 'izisho', title: 'Izisho/Nezaga', description: 'Izisho ezinamandla nezaga ezizokhuthaza izingane.' },
    { id: 'ongamisa', title: 'Ongamisa', description: 'Amathiphu nezindlela zokuphila.' },
    { id: 'imisindo', title: 'Imisindo', description: 'Izinsizakalo ezithokozisayo ezizokwenza izingane zifunde.' },
  ];

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close state
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown open/close state
  };

  const zuluafricanmama = '/zuluafricanmama.png'; // Directly use the path for images in the public directory

  return (
    <div>
      {/* Navbar Section */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'linear-gradient(90deg, #ffcc00, #ff6699, #66ccff)' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Ingane Edu</Link>
          <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-controls="navbarNav" aria-expanded={isMenuOpen} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" onClick={toggleDropdown} aria-expanded={isDropdownOpen}>
                  Izici
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu show">
                    {features.map((feature) => (
                      <Link key={feature.id} to={`/${feature.id}`} className="dropdown-item">
                        {feature.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              <li className="nav-item">
                <Link to="/signin" className="nav-link bounce">Qala Lapha</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Landing Page Section */}
      <div className="landing-page">
        <header className="hero-section fade-in">
          <div className="hero-text">
            <h2>Izindatshana, Izintsomi, Izisho/Nezaga</h2>
            <p>Hlangana nokuphicaphica okujabulisayo nezingane</p>
            <Link to="/learn-more" className="btn btn-warning bounce">Funda Okuningi</Link>
          </div>
          <div className="hero-image">
            <img className="image hero-small-image" src={zuluafricanmama} alt="Kids enjoying stories" />
          </div>
        </header>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2>Izici Zethu</h2>
        <div className="features-cards row">
          {features.map((feature) => (
            <div 
              className="feature-card col-sm-12 col-md-6 col-lg-4 zoom-in" 
              key={feature.id} 
              onClick={() => handleFeatureClick(feature)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleFeatureClick(feature);
                }
              }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Features */}
      <FeatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feature={selectedFeature}
      />
    </div>
  );
};

export default CombinedPage;
