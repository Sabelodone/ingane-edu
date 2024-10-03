import React, { useState } from 'react';
import './Features.css';
import FeatureModal from './FeatureModal'; // Import the modal component

const Features = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState({});

  const features = [
    { id: 'short-stories', title: 'Izindaba Ezincane', description: 'Funda izindaba ezimnandi ezizokhuthaza izingane zakho.' },
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

  return (
    <div className="features-page">
      <h1>Izici Zethu</h1>
      <div className="features-list">
        {features.map((feature) => (
          <div 
            className="feature-card" 
            key={feature.id} 
            onClick={() => handleFeatureClick(feature)} // Open modal on click
          >
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Modal for Features */}
      <FeatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feature={selectedFeature}
      />
    </div>
  );
};

export default Features;
