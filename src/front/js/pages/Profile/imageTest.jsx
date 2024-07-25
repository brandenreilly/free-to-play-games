import React, { useState, useEffect } from 'react';

const PhotoDisplay = ({ photoId }) => {
    const [photoBlobUrl, setPhotoBlobUrl] = useState('');
    const backend = process.env.BACKEND_URL

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await fetch(backend + `api/get-photo/1`);
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                setPhotoBlobUrl(blobUrl);
            } catch (error) {
                console.error('Error fetching photo:', error);
            }
        };

        fetchPhoto();
    }, []);

    return (
        <div>
            {photoBlobUrl && (
                <img src={photoBlobUrl} alt="Uploaded" />
            )}
        </div>
    );
};

export default PhotoDisplay;