import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
// Use public folder image via URL

const wasteTypes = [
  { type: "Biodegradable", icon: "🌿", description: "Organic waste that can decompose naturally.", tips: ["Compost food and garden waste", "Avoid mixing with plastics"] },
  { type: "Dry Waste", icon: "🗑️", description: "Non-biodegradable waste like paper, plastic, and metal.", tips: ["Keep dry waste separate", "Recycle paper, cardboard, and plastics"] },
  { type: "Hazardous Waste", icon: "☣️", description: "Waste that poses risks to health or environment.", tips: ["Dispose at hazardous waste centers", "Do not mix with regular trash"] },
  { type: "E-Waste", icon: "💻", description: "Discarded electronic devices and components.", tips: ["Recycle electronics at e-waste facilities", "Remove batteries before disposal"] },
  { type: "Bio Medical", icon: "🩺", description: "Medical waste from hospitals and clinics.", tips: ["Use designated bio-medical bins", "Follow hospital guidelines"] },
  { type: "Industrial", icon: "🏭", description: "Waste produced by industrial activities.", tips: ["Follow industrial waste protocols", "Segregate chemicals and metals"] },
  { type: "Construction", icon: "🚧", description: "Debris and materials from construction sites.", tips: ["Recycle concrete and metals", "Dispose debris responsibly"] },
  { type: "Agriculture", icon: "🌾", description: "Waste from farming and agricultural processes.", tips: ["Compost organic farm waste", "Dispose pesticides safely"] },
  { type: "Radioactive", icon: "☢️", description: "Radioactive materials requiring special handling.", tips: ["Handle with extreme care", "Dispose at authorized facilities"] },
  { type: "Marine", icon: "🌊", description: "Waste found in or affecting marine environments.", tips: ["Prevent ocean dumping", "Recycle fishing nets and plastics"] },
];

export default function ZeroWaste() {
  const [selectedType, setSelectedType] = useState(null);
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeScore, setChallengeScore] = useState(0);
  const [challengeFinished, setChallengeFinished] = useState(false);
  // Pool of items for the challenge
  const challengeItems = [
    { item: "Plastic bottle", answer: "Dry Waste" },
    { item: "Egg shells", answer: "Biodegradable" },
    { item: "Battery", answer: "Hazardous Waste" },
    { item: "Old computer", answer: "E-Waste" },
    { item: "Bandage", answer: "Bio Medical" },
    { item: "Scrap metal", answer: "Industrial" },
    { item: "Concrete", answer: "Construction" },
    { item: "Manure", answer: "Agriculture" },
    { item: "Spent nuclear fuel", answer: "Radioactive" },
    { item: "Fishing net", answer: "Marine" }
  ];
  const handleStartChallenge = () => {
    setChallengeOpen(true);
    setChallengeIndex(0);
    setChallengeScore(0);
    setChallengeFinished(false);
  };

  const handleChallengeAnswer = (category) => {
    if (challengeItems[challengeIndex].answer === category) {
      setChallengeScore(challengeScore + 1);
    }
    if (challengeIndex + 1 < challengeItems.length) {
      setChallengeIndex(challengeIndex + 1);
    } else {
      setChallengeFinished(true);
    }
  };

  const handleCloseChallenge = () => {
    setChallengeOpen(false);
    setChallengeFinished(false);
    setChallengeIndex(0);
    setChallengeScore(0);
  };
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hoveredType, setHoveredType] = useState(null);
  const navigate = useNavigate();

  const filteredWaste = wasteTypes.filter(w =>
    w.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (type) => {
    setSearch(type);
    setShowSuggestions(false);
    setSelectedType(type);
  };

  const handleClearSearch = () => {
    setSearch("");
    setSelectedType(null);
    setShowSuggestions(false);
  };

  return (
    <div className="zerowaste-page" style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Zero Waste Assistant</h1>
      <p>
        Welcome to your interactive recycling assistant! Search for waste types, get tips, and learn how to recycle better.
      </p>
      <div style={{ position: 'relative', display: 'inline-block', width: '60%' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <input
            type="text"
            placeholder="Search waste type..."
            value={search}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            style={{ padding: "0.5rem", marginBottom: "1rem", width: "100%" }}
          />
          {search && (
            <button
              onClick={handleClearSearch}
              style={{
                marginLeft: '-2.2rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: '#888',
                position: 'relative',
                zIndex: 11,
              }}
              title="Clear search"
            >
              ❌
            </button>
          )}
        </div>
        {showSuggestions && search && (
          <ul style={{
            position: 'absolute',
            left: 0,
            right: 0,
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '0 0 8px 8px',
            zIndex: 10,
            listStyle: 'none',
            margin: 0,
            padding: 0,
            maxHeight: '220px',
            overflowY: 'auto',
          }}>
            {filteredWaste.length === 0 && (
              <li style={{ padding: '0.5rem', color: '#888' }}>No matches found</li>
            )}
            {filteredWaste.map(w => (
              <li
                key={w.type}
                style={{
                  padding: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: selectedType === w.type ? '#e0ffe0' : hoveredType === w.type ? '#f0f8ff' : '#fff',
                  borderBottom: hoveredType === w.type ? '1px solid #4caf50' : 'none',
                  fontWeight: selectedType === w.type ? 'bold' : 'normal',
                }}
                onMouseDown={() => handleSuggestionClick(w.type)}
                onMouseEnter={() => setHoveredType(w.type)}
                onMouseLeave={() => setHoveredType(null)}
              >
                <span style={{ fontSize: '1.2rem' }}>{w.icon}</span>
                <span>{w.type}</span>
                <span style={{ fontSize: '0.9rem', color: '#888', marginLeft: 'auto' }}>{w.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
        {filteredWaste.map(w => (
          <div
            key={w.type}
            className="waste-card"
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem",
              width: "180px",
              cursor: "pointer",
              background: selectedType === w.type ? "#e0ffe0" : "#fff"
            }}
            onClick={() => {
              setSelectedType(w.type);
              navigate(`/category/${w.type}`);
            }}
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>{w.icon}</span> {w.type}
            </h3>
            {selectedType === w.type && (
              <ul style={{ textAlign: "left" }}>
                {w.tips.map(tip => <li key={tip}>{tip}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "2rem" }}>
        <h2>Gamify Your Recycling!</h2>
        <p>Earn points for sorting waste correctly. Track your progress and challenge friends!</p>
        <button onClick={handleStartChallenge} style={{ padding: "0.7rem 1.5rem", background: "#4caf50", color: "#fff", border: "none", borderRadius: "5px", fontSize: "1rem" }}>
          Start Challenge
        </button>
      </div>

      {/* Challenge Modal */}
      {challengeOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: 10, minWidth: 320, textAlign: 'center', boxShadow: '0 2px 16px #2222' }}>
            {!challengeFinished ? (
              <>
                <h2>Waste Segregation Challenge</h2>
                <p>Which category does this item belong to?</p>
                <h3 style={{ margin: '1rem 0', fontSize: '1.5rem' }}>{challengeItems[challengeIndex].item}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
                  {wasteTypes.map(w => (
                    <button
                      key={w.type}
                      onClick={() => handleChallengeAnswer(w.type)}
                      style={{ padding: '0.5rem 1rem', borderRadius: 5, border: '1px solid #ccc', background: '#f5f5f5', cursor: 'pointer', fontSize: '1rem' }}
                    >
                      {w.icon} {w.type}
                    </button>
                  ))}
                </div>
                <p>Score: {challengeScore} / {challengeItems.length}</p>
                <button onClick={handleCloseChallenge} style={{ marginTop: 10, background: '#eee', border: 'none', borderRadius: 5, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>Quit</button>
              </>
            ) : (
              <>
                <h2>Challenge Complete!</h2>
                <p>Your Score: <b>{challengeScore} / {challengeItems.length}</b></p>
                <button onClick={handleCloseChallenge} style={{ marginTop: 10, background: '#4caf50', color: '#fff', border: 'none', borderRadius: 5, padding: '0.7rem 1.5rem', fontSize: '1rem' }}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
