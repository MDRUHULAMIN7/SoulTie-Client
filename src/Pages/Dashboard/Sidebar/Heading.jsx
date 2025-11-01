

const Heading = ({heading,subheading}) => {
    return (
        <div className='mx-auto my-8 w-full lg:w-96'>
            <h1 className='text-2xl lg:text-4xl text-rose-300 font-mono font-semibold text-center  lg:mb-2'>{heading}</h1>

            <h2 className='lg:text-xl text-black font-normal text-center mb-1 lg:mb-3'>{subheading}</h2>

            <hr className="text-rose-300 " />
        </div>
    );
};

export default Heading;