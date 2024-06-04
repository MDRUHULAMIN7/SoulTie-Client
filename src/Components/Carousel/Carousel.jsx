
import banner from '../../images/chuttersnap-iQVn40PdwW0-unsplash.jpg'

const Carousel = () => {
    return (
        <div>
            <section className='h-[600px] w-full bg-cover bg-no-repeat' style={{
          backgroundImage: `url(${banner})`,
        }}>
		<div className="flex flex-col  justify-center lg:ml-36   lg:pt-36 p-6 text-center rounded-sm  lg:text-left">
			<h1 className="text-5xl text-rose-100 font-bold leading-none sm:text-6xl">SoulTie
				
			</h1>
			<p className="mt-6 mb-8 text-lg lg:text-xl sm:mb-12">Are you looking for love and lasting partnership? <br /> Our matrimony website is here to connect you with compatible individuals <br />   seeking the same. We believe in fostering connections built on shared <br />  values and understanding, helping you find your perfect match and embark on a beautiful journey together.
				<br  className="hidden md:inline lg:hidden" />
			</p>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Suspendisse</a>
				<a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800">Malesuada</a>
			</div>
		</div>
   
</section>
        </div>
    );
};

export default Carousel;