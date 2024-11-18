// import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const footerLinks = [
    {
        title: "Home",
        link: "/#",
    },
    {
        title: "About",
        link: "/#about",
    },
    {
        title: "Contact",
        link: "/#contact",
    },
    {
        title: "Blog",
        link: "/#blog",
    },
];

const Footer = () => {
    return (
        <div className="dark:bg-gray-950 bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Column 1 - ESHOP details */}
                    <div>
                        <a
                            href="#"
                            className="text-primary font-semibold tracking-widest text-2xl uppercase">Artify
                        </a>
                        <p className="text-gray-600 dark:text-white/70 lg:pr-24 pt-3">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores alias cum.
                        </p>
                        <p className="text-gray-500 mt-4">Made with 💖 </p>
                        <a href="linkedIn url !!" target="_blank" rel="noopener noreferrer"
                            className="inline-block bg-red-500 text-white py-2 px-4 mt-4 text-sm rounded-full">
                            My Profile
                        </a>
                    </div>

                    {/* Column 2 -  Links */}
                    <div>
                        <h1 className="text-xl font-bold mb-3"> Links</h1>
                        <ul className="space-y-3">
                            {footerLinks.map((data, index) => (
                                <li key={index}>
                                    <a
                                        href={data.link}
                                        className="text-gray-600 dark:text-gray-400 hover:text-black duration-300"
                                    >
                                        {data.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 - Address and Social Media */}
                    <div>
                        <h1 className="text-xl font-bold mb-3">Address</h1>
                        <p className="flex items-center text-gray-600 dark:text-gray-400">
                            <FaMapMarkerAlt className="mr-2" /> Saudi Arabia
                        </p>
                        <p className="flex items-center text-gray-600 dark:text-gray-400 mt-3">
                            <FaPhoneAlt className="mr-2" /> +996 501122333
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
