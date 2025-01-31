import React, { useState, useEffect } from "react";
import HackathonForm from "./HackathonForm";
import HackathonList from "./HackathonList";

const AdminDashboard = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch hackathons from API when the component mounts
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch("https://your-api-endpoint.com/hackathons");
        const data = await response.json();
        setHackathons(data);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  // Add a new hackathon
  const addHackathon = async (newHackathon) => {
    try {
      const response = await fetch("https://your-api-endpoint.com/hackathons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHackathon),
      });
      const createdHackathon = await response.json();
      setHackathons([...hackathons, createdHackathon]);
    } catch (error) {
      console.error("Error adding hackathon:", error);
    }
  };

  // Delete a hackathon
  const deleteHackathon = async (id) => {
    try {
      await fetch(`https://your-api-endpoint.com/hackathons/${id}`, {
        method: "DELETE",
      });
      setHackathons(hackathons.filter(hackathon => hackathon.id !== id));
    } catch (error) {
      console.error("Error deleting hackathon:", error);
    }
  };

  // Update a hackathon
  const updateHackathon = async (updatedHackathon) => {
    try {
      const response = await fetch(`https://your-api-endpoint.com/hackathons/${updatedHackathon.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedHackathon),
      });
      const updated = await response.json();
      setHackathons(hackathons.map(hackathon => 
        hackathon.id === updated.id ? updated : hackathon
      ));
    } catch (error) {
      console.error("Error updating hackathon:", error);
    }
  };

  if (loading) {
    return <p>Loading hackathons...</p>;
  }

  return (
    <div>
      <HackathonForm addHackathon={addHackathon} />
      <HackathonList 
        hackathons={hackathons} 
        deleteHackathon={deleteHackathon} 
        updateHackathon={updateHackathon} 
      />
    </div>
  );
};

export default AdminDashboard;
