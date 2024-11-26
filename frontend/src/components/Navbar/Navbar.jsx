// import React from 'react';
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { Link } from 'react-router-dom'; 

const MenuLinks = [
    {
        id: 1,
        name: "Home",
        link: "/",
    },
    {
        id: 2,
        name: "Shop",
        link: "/shop",
    },
    {
        id: 3,
        name: "Workshops",
        link: "/workshops",
    },
    {
        id: 4,
        name: "Blogs",
        link: "/blogs",
    },
];

const DropdownLinks = [
    {
        id: 1,
        name: "Trending",
        link: "/trending",
    },
    {
        id: 2,
        name: "Best Selling",
        link: "/best-selling",
    },
    {
        id: 3,
        name: "Top Rated",
        link: "/top-rated",
    },
];

const Navbar = ({ handleOrderPopup }) => {
    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
            <div className="py-4">
                <div className="container flex justify-between items-center">
                    {/* Logo and link section */}
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl">
                            Artify
                        </Link>

                        {/* Menu Items */}
                        <div className="hidden lg:block">
                            <ul className="flex items-center gap-4">
                                {MenuLinks.map((data) => (
                                    <li key={data.id}>
                                        <Link to={data.link}
                                            className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200">
                                            {data.name}
                                        </Link>
                                    </li>
                                ))}
                                {/* Dropdown */}
                                <li className="relative cursor-pointer group">
                                    <span className="flex items-center gap-[2px] font-semibold text-gray-500 dark-hover:text-white py-2">
                                        Quick Links
                                        <FaCaretDown className="group-hover:rotate-180 duration-300" />
                                    </span>
                                    {/* Dropdown Links */}
                                    <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white">
                                        <ul className="space-y-2">
                                            {DropdownLinks.map((data) => (
                                                <li key={data.id}>
                                                    <Link to={data.link}
                                                        className="text-gray-500 dark:hover:text-white duration-200 inline-block p-2 w-full hover:bg-primary/20 rounded-md font-semibold">
                                                        {data.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Navbar right section */}
                    <div className="flex justify-between items-center gap-4">
                        {/* search Bar section */}
                        {/* <div className="relative group hidden sm:block">
                            <input type="text" placeholder="Search.." className="search-bar" />
                            <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
                        </div> */}

                        {/* Order-button section */}
                        <button className="relative p-3" onClick={handleOrderPopup}>
                            <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
                            <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                                0
                            </div>
                        </button>

                        {/* Dark-Mode section */}
                        <DarkMode />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
