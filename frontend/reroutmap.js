const handleReroute = async () => {
  const supplyChainData = {
    lat: 12.97, // Example data
    lng: 77.59,
    traffic: 5
  };

  try {
    // We use 'localhost:5000' because the backend is running on your computer
    const response = await fetch('http://localhost:5000/predict-route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supplyChainData),
    });

    const result = await response.json();
    console.log("New Route from ML:", result.new_route);
    alert("New Route Calculated: " + result.new_route);
    
  } catch (error) {
    console.error("Error connecting to backend:", error);
  }
};