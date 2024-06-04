

const Heading = ({heading,subheading}) => {
    return (
        <div className='mx-auto my-8 w-96'>
            <h1 className='text-4xl text-rose-300 font-mono font-semibold text-center mb-2'>{heading}</h1>

            <h2 className='text-xl text-black font-normal text-center mb-3'>{subheading}</h2>

            <hr className="text-rose-300" />
        </div>
    );
};

export default Heading;