import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";
import axios from "axios";

function App() {
  const [directions, setDirections] = useState(null);

  const getRoute = () => {
    const service = new window.google.maps.DirectionsService();

    service.route({
      origin: "Mumbai",
      destination: "Pune",
      travelMode: "DRIVING",
      provideRouteAlternatives: true
    }, async (result, status) => {
      if (status === "OK") {
        const routes = result.routes;

        let bestRoute = routes[0];
        let bestScore = 999999;

        for (let route of routes) {
          const points = route.overview_path
            .filter((_, i) => i % 20 === 0)
            .map(p => ({ lat: p.lat(), lng: p.lng() }));

          const res = await axios.post("http://localhost:5000/weather", { points });

          const risk = res.data.risk;
          const duration = route.legs[0].duration.value;

          const score = risk * 1000 + duration;

          if (score < bestScore) {
            bestScore = score;
            bestRoute = route;
          }
        }

        setDirections({ ...result, routes: [bestRoute] });
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap mapContainerStyle={{ height: "500px", width: "100%" }} zoom={7} center={{ lat: 19.0760, lng: 72.8777 }}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <button onClick={getRoute}>Find Best Route</button>
    </LoadScript>
  );
}

export default App;