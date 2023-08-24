import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Make API call to Flask backend
        axios.get('/api/search-tracks')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Render your React components
    return (
        <div>
            {/* Render your components using the data */}
        </div>
    );
}

export default App;
