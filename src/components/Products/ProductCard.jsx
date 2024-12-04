import { useState } from 'react';
import { addToCart } from '../../utils/cart';
import Button from '../common/Button';
import PropTypes from 'prop-types';

const ProductCard = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleAddToCart = (item) => {
        console.log("ggggg");
        setLoading(true);
        try {
            addToCart(item);
            console.log("ggggg");
            setSuccessMessage(`${item.title} has been added to the cart!`);
            
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
                {data.map((item) => (
                    <div className="group bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg" key={item.id}>
                        <div className="relative">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="h-[180px] w-[260px] object-cover rounded-md"
                            />
                        </div>
                        
                        <div className="leading-7 mt-4">
                            <h2 className="font-semibold dark:text-white">{item.title}</h2>
                            <h2 className="font-bold text-primary">${item.price}</h2>
                        </div>

                        <div className="mt-4">
                            <Button
                                text={loading ? "Adding..." : "Add to Cart"}
                                bgColor={loading ? "bg-gray-500" : "bg-primary"}
                                textColor="text-white"
                                handler={() => handleAddToCart(item)}
                                disabled={loading}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {successMessage && (
                <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 p-4 rounded-md shadow-lg">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

ProductCard.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            img: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            aosDelay: PropTypes.string,
        })
    ).isRequired,
};

export default ProductCard;
