import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const categoryDetails = {
  Biodegradable: {
    icon: "🌿",
    description: "Biodegradable waste is organic material that can be broken down naturally by microorganisms. It includes food scraps, garden waste, and other natural materials.",
    categories: [
      "Food waste",
      "Vegetable peels",
      "Fruit scraps",
      "Garden clippings",
      "Leaves",
      "Coffee grounds",
      "Egg shells",
      "Paper towels (unbleached)",
      "Tea bags (without staples)",
      "Compostable packaging"
    ]
  },
  "Dry Waste": {
    icon: "🗑️",
    description: "Dry waste includes non-biodegradable items such as paper, plastics, metals, and glass that do not decompose easily.",
    categories: [
      "Paper",
      "Cardboard",
      "Plastic bottles",
      "Plastic bags",
      "Metal cans",
      "Glass bottles",
      "Styrofoam",
      "Wrappers",
      "Packaging materials",
      "Rubber items"
    ]
  },
  "Hazardous Waste": {
    icon: "☣️",
    description: "Hazardous waste contains substances that are dangerous to human health or the environment, such as chemicals, batteries, and paints.",
    categories: [
      "Batteries",
      "Paints",
      "Solvents",
      "Pesticides",
      "Cleaning agents",
      "Medical sharps",
      "Mercury thermometers",
      "Fluorescent bulbs",
      "Chemicals",
      "Asbestos"
    ]
  },
  "E-Waste": {
    icon: "💻",
    description: "E-waste refers to discarded electronic devices and components, including computers, phones, and appliances.",
    categories: [
      "Computers",
      "Mobile phones",
      "Tablets",
      "Televisions",
      "Printers",
      "Cables",
      "Chargers",
      "Batteries",
      "Hard drives",
      "Electronic toys"
    ]
  },
  "Bio Medical": {
    icon: "🩺",
    description: "Bio-medical waste is generated from hospitals, clinics, and laboratories, including syringes, bandages, and other medical disposables.",
    categories: [
      "Syringes",
      "Bandages",
      "Cotton swabs",
      "Gloves",
      "IV bags",
      "Medicines",
      "Test tubes",
      "Masks",
      "Medical gowns",
      "Sharps containers"
    ]
  },
  "Industrial": {
    icon: "🏭",
    description: "Industrial waste is produced by factories and manufacturing processes, including chemicals, scrap metal, and process residues.",
    categories: [
      "Scrap metal",
      "Chemical waste",
      "Slag",
      "Ash",
      "Packaging waste",
      "Industrial sludge",
      "Plastic pellets",
      "Rubber waste",
      "Oils",
      "Paint residues"
    ]
  },
  "Construction": {
    icon: "🚧",
    description: "Construction waste includes debris and materials from building sites, such as concrete, bricks, and wood.",
    categories: [
      "Concrete",
      "Bricks",
      "Wood",
      "Tiles",
      "Glass",
      "Metal rods",
      "Insulation materials",
      "Plastic sheets",
      "Paint cans",
      "Pipes"
    ]
  },
  "Agriculture": {
    icon: "🌾",
    description: "Agricultural waste is generated from farming activities, including crop residues, manure, and pesticide containers.",
    categories: [
      "Crop residues",
      "Manure",
      "Fertilizer bags",
      "Pesticide containers",
      "Animal bedding",
      "Spoiled produce",
      "Twine",
      "Plastic mulch",
      "Feed bags",
      "Seed packets"
    ]
  },
  "Radioactive": {
    icon: "☢️",
    description: "Radioactive waste contains radioactive materials and must be handled and disposed of with extreme care.",
    categories: [
      "Spent nuclear fuel",
      "Radioactive isotopes",
      "Contaminated equipment",
      "Protective clothing",
      "Lab waste",
      "Medical radioactive waste",
      "Industrial radioactive waste",
      "Smoke detectors",
      "X-ray equipment",
      "Sealed sources"
    ]
  },
  "Marine": {
    icon: "🌊",
    description: "Marine waste is found in or affects oceans and waterways, including plastics, fishing gear, and oil spills.",
    categories: [
      "Plastic bottles",
      "Fishing nets",
      "Oil spills",
      "Microplastics",
      "Boat debris",
      "Cans",
      "Glass",
      "Rubber",
      "Marine paint",
      "Lost cargo"
    ]
  }
};

export default function CategoryDetail() {
  const { type } = useParams();
  const navigate = useNavigate();
  const detail = categoryDetails[type];
  const [quantity, setQuantity] = React.useState("");
  const [pickupMode, setPickupMode] = React.useState("");

  if (!detail) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Category not found</h2>
        <button onClick={() => navigate(-1)} style={{ marginTop: 20 }}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "auto", textAlign: "center" }}>
      <h1>{detail.icon} {type}</h1>
      <p style={{ marginBottom: 24 }}>{detail.description}</p>
      <h3>Common {type} Waste Items:</h3>
      <ul style={{ textAlign: "left", display: "inline-block", margin: "auto" }}>
        {detail.categories.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* Show quantity and pickup mode for all categories */}
      <div style={{ marginTop: 32, textAlign: "left", display: "inline-block" }}>
        <h3>Enter Quantity (kg):</h3>
        <input
          type="number"
          min="0"
          step="0.1"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder="e.g. 5"
          style={{ padding: "0.5rem", width: 120, marginBottom: 16, borderRadius: 5, border: "1px solid #ccc" }}
        />
        <h3>Choose Mode of Pickup:</h3>
        <div style={{ display: "flex", gap: "1rem", marginBottom: 16 }}>
          <button
            onClick={() => setPickupMode("Doorstep")}
            style={{
              padding: "0.5rem 1.2rem",
              borderRadius: 5,
              border: pickupMode === "Doorstep" ? "2px solid #4caf50" : "1px solid #ccc",
              background: pickupMode === "Doorstep" ? "#e0ffe0" : "#fff",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            🚪 Doorstep
          </button>
          <button
            onClick={() => setPickupMode("Community Center")}
            style={{
              padding: "0.5rem 1.2rem",
              borderRadius: 5,
              border: pickupMode === "Community Center" ? "2px solid #4caf50" : "1px solid #ccc",
              background: pickupMode === "Community Center" ? "#e0ffe0" : "#fff",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            🏢 Community Center
          </button>
          <button
            onClick={() => setPickupMode("Self Drop")}
            style={{
              padding: "0.5rem 1.2rem",
              borderRadius: 5,
              border: pickupMode === "Self Drop" ? "2px solid #4caf50" : "1px solid #ccc",
              background: pickupMode === "Self Drop" ? "#e0ffe0" : "#fff",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            🚗 Self Drop
          </button>
        </div>
        {quantity && pickupMode && (
          <div style={{ marginTop: 12, color: '#4caf50', fontWeight: 'bold' }}>
            You entered <span style={{ color: '#222' }}>{quantity} kg</span> for <span style={{ color: '#222' }}>{pickupMode}</span> pickup.
          </div>
        )}
      </div>

      <button onClick={() => navigate(-1)} style={{ marginTop: 24, padding: "0.5rem 1.2rem", borderRadius: 5, border: "none", background: "#4caf50", color: "#fff" }}>Go Back</button>
    </div>
  );
}
