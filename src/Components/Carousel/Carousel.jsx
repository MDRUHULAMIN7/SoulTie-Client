
import { Link } from 'react-router-dom';
import banner from '../../images/chuttersnap-iQVn40PdwW0-unsplash.jpg'

const Carousel = () => {
    return (
        <div>
            <section className='h-[600px] w-full bg-cover bg-no-repeat' style={{
          backgroundImage: `url(${banner})`,
        }}>
		<div className="flex flex-col  justify-center lg:ml-36   lg:pt-36 p-6 text-center rounded-sm  lg:text-left">
			<h1 className="text-5xl text-rose-500 font-serif leading-none sm:text-6xl">SoulTie
				
			</h1>
			<p className="mt-6 mb-8 text-lg lg:text-xl sm:mb-12">Are you looking for love and lasting partnership? <br /> Our matrimony website is here to connect you with compatible individuals <br />   seeking the same. We believe in fostering connections built on shared <br />  values and understanding, helping you find your perfect match and embark on a beautiful journey together.
				<br  className="hidden md:inline lg:hidden" />
			</p>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<Link to={'/biodatas'}  rel="noopener noreferrer"  className="px-8 py-3 text-lg hover:text-white text-rose-400 hover:border hover:border-rose-500 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Explore</Link>
				<Link to={'/dashboard/editbiodata'} rel="noopener noreferrer"  className="px-8 py-3 text-lg font-semibold border rounded border-rose-300 hover:text-white hover:bg-rose-300 hover:border-none">Join with us</Link>
			</div>
		</div>
   
</section>
        </div>
    );
};

export default Carousel;