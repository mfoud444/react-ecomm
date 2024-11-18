// import React from 'react'

import PropTypes from 'prop-types';  
import Button from "../Shared/Button";

const ProductCard = ({ data }) => {
    return (
        <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
                
                {/* Card Section */}
                {
                    data.map((item) => (
                        <div className="group" key={item.id}>
                            <div className="relative">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="h-[180px] w-[260px] object-cover rounded-md"
                                />
                            </div>
                           
                            {/* hover btn */}
                            <div className="hidden group-hover:flex
                             absolute top-1/2 -translate-y-1/2 left-1/2 
                             -translate-x-1/2 h-full w-full text-center 
                             group-hover:backdrop-blur-sm justify-center
                              items-center duration-200">
                                <Button
                                    text={"Add to cart"}
                                    bgColor={"bg-primary"}
                                    textColor={"text-white"}
                                />
                            </div>
                            <div className="leading-7">
                                <h2 className="font-semibold"> {item.title} </h2>
                                <h2 className="font-bold"> {item.price} </h2>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            img: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            aosDelay: PropTypes.string,
        })
    ).isRequired,
};

export default ProductCard;
