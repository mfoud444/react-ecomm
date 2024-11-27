import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import Button from "../common/Button";

const ProductCard = ({ data }) => {
    // Local cart state for this component
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);  // Loading state for adding to cart
    const [successMessage, setSuccessMessage] = useState("");  // Success message state

    // Add to cart function
    const AddToCart = (item) => {
        setLoading(true); // Set loading to true when starting the add-to-cart action

        // Simulate a delay (e.g., API call)
        setTimeout(() => {
            setCart((prevCart) => [...prevCart, item]);  // Add the item to the cart
            setLoading(false); // Stop the loading indicator
            setSuccessMessage(`${item.title} has been added to the cart!`); // Show success message

            // Clear the success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage("sss");
            }, 3000);
        }, 1000);  // Simulate a 1-second delay for adding to the cart
    };

    return (
        <div className="mb-10">
            <div className="grid grid-col-3 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
                
                {/* Card Section */}
                {data.map((item) => (
                    <div className="group bg-blue-100 p-2 rounded-sm shadow-lg" key={item.id}>
                        <div className="relative">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="h-[180px] w-[260px] object-cover rounded-md"
                            />
                        </div>
                        
                        <div className="leading-7">
                            <h2 className="font-semibold"> {item.title} </h2>
                            <h2 className="font-bold"> {item.price} </h2>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="mt-4">
                            <Button
                                text={loading ? "Adding..." : "Add to Cart"}
                                bgColor={loading ? "bg-gray-500" : "bg-primary"}  // Change button color when loading
                                textColor={"text-white"}
                                onClick={() => AddToCart(item)} 
                                disabled={loading}  // Disable the button while loading
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="mt-6 bg-green-100 text-green-800 p-4 rounded-md">
                    <strong>{successMessage}</strong>
                </div>
            )}

            {/* Displaying the cart items */}
            {/* <dv className="mt-6">
                <h3 className="font-semibold">Cart Items:</h3>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>{item.title} - {item.price}</li>
                    ))}
                </ul>
            </dv> */}
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
