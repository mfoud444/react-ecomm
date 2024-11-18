// import React from "react";

import axios from 'axios';
import Slider from "react-slick";
import Button from '../Shared/Button';
import { useEffect, useState } from 'react';

const Hero = () => {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await axios.get('https://api.artic.edu/api/v1/artworks?page=1&limit=5');
                const formattedData = response.data.data.map((artwork) => ({
                    id: artwork.id,
                    img: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
                    subtitle: artwork.artist_title || "Unknown Artist",
                    title: artwork.title || "Untitled",
                    title2: "Art Collection",
                    description: artwork.thumbnail ? artwork.thumbnail.alt_text || "No description available" : "No description available",
                }));
                setArtworks(formattedData);
            } catch (error) {
                console.error('Error fetching artworks:', error);
            }
        };

        fetchArtworks();
    }, []);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };

    return (
        <div className='container'>
            <div className="overflow-hidden rounded-3xl min-h-[400px] sm:min-h-[550px] hero-bg-color flex justify-center items-center">
                <div className='container'>
                    <Slider {...settings}>
                        {artworks.map((artwork) => (
                            <div key={artwork.id} className="w-full p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                    {/* Text content section */}
                                    <div className='flex flex-col justify-center gap-2 sm:pl-3 text-center sm:text-left'>
                                        <h1 className="text-lg sm:text-4xl font-bold">{artwork.title}</h1>
                                        <h1 className="text-3xl sm:text-5xl font-bold">{artwork.subtitle}</h1>
                                        <h1 className="text-4xl uppercase text-white dark:text-white/5 sm:text-[60px] font-bold">{artwork.title2}</h1>
                                        <p className="text-xs sm:text-sm text-gray-400 mb-2">{artwork.description}</p>
                                        <Button
                                            text="View By Category"
                                            bgColor="bg-primary"
                                            textColor="text-white"
                                        />
                                    </div>

                                    {/* IMG section */}
                                    <div className='flex justify-center'>
                                        <img
                                            src={artwork.img}
                                            alt={artwork.title}
                                            className="w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] object-contain mx-auto drop-shadow-[-80px_4px_6px_rgba(0,0,0,.4)]"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Hero;
