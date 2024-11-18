// import React from 'react';

import { FaCarSide, FaCheckCircle, FaWallet, FaHeadphonesAlt } from "react-icons/fa";

const ServiceData = [
    {
        id: 1,
        icon: <FaCarSide className="text-4xl md:text-5xl text-primary" />,
        title: "Free Shipping",
        description: "Free Shipping On All Orders",
    },
    {
        id: 2,
        icon: <FaCheckCircle className="text-4xl md:text-5xl text-primary" />,
        title: "Safe Money",
        description: "30 Days Money Back",
    },
    {
        id: 3,
        icon: <FaWallet className="text-4xl md:text-5xl text-primary" />,
        title: "Secure Payment",
        description: "All Payments Secure",
    },
    {
        id: 4,
        icon: <FaHeadphonesAlt className="text-4xl md:text-5xl text-primary" />,
        title: "We Are Here",
        description: "Online Support 24/7",
    },
];

const Services = () => {
    return (
        <div>
            <div className="container my-14 md:my-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
                    {ServiceData.map((data) => (
                        <div key={data.id} className="flex items-start gap-4">
                            {data.icon}
                            <div className="flex flex-col">
                                <h1 className="lg:text-xl font-bold">{data.title}</h1>
                                <p className="text-gray-400 text-sm">{data.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
