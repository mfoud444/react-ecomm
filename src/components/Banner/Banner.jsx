import PropTypes from 'prop-types';
const Banner = ({ data }) => {
    return (
        <div className="min-h-[550px] justify-center items-center py-12 ">
            <div className="container">
                <div style={{ backgroundColor: data.bgColor }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6
                    items-center text-white rounded-3xl">
                    {/* 1 col Left */}
                    <div className='p-6 sm:p-8'>
                        <p className='text-sm'> {data.discount}</p>
                        <h1 className='uppercase text-4xl lg:text-7xl font-bold'>
                            {" "}
                            {data.title}</h1>
                        <p className='text-sm'>{data.date}</p>
                    </div>
                    {/* 2 col Center */}
                    <div className='h-full flex items-center'>
                        <img src={data.image} alt="" className='scalw125 w-[250px] md:w-[340px] mx-auto drop-shadow-2xl object-cover ' />
                    </div>
                    {/* 3 col Right */}
                    <div className='flex flex-col justify-center gap-4 p-6 sm:p-8 '>
                        <p className=' font-bold text-xl '>{data.title2}</p>
                        <p className='text-3xl sm:text-5xl font-bold'>{data.title3}</p>
                        <p className='text-sm tracking-wide leading-5'>{data.title4}</p>
                        <div>
                            <button style={{ color: data.bgColor }}
                                className='bg-white py-2 px-4 rounded-full'>
                                Shop
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

Banner.propTypes = {
    data: PropTypes.shape({
        discount: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        image: PropTypes.string,
        title2: PropTypes.string,
        title3: PropTypes.string,
        title4: PropTypes.string,
        bgColor: PropTypes.string,
    }).isRequired,
};
export default Banner