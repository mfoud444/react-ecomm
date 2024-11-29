import { useEffect, useState } from 'react';
import axiosInstance from './axios';  

const MyComponent = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await axiosInstance.get('/api/v1/Artworks');
                setArtworks(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (artworks.length === 0) {
        return <div>No artworks found</div>;
    }

    return (
        <div>
            <h2>Artworks</h2>
            <ul>
                {artworks.map((artwork) => (
                    <li key={artwork.id}>{artwork.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default MyComponent;
