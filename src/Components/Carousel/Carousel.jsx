import { Link } from 'react-router-dom';

const Carousel = () => {
  return (
    <div>
      <section
        className="h-[700px] w-full bg-cover bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dpomtzref/image/upload/v1725112319/chuttersnap-iQVn40PdwW0-unsplash_wqjdxk.jpg')",
        }}
      >
        <div className="flex flex-col justify-center lg:ml-36 p-6 lg:p-0 text-center lg:text-left">
          <h1 className="text-5xl font-serif text-rose-500 leading-none sm:text-6xl">
            SoulTie
          </h1>
          <p className="mt-6 mb-8 text-lg lg:text-xl text-gray-800 dark:text-gray-200">
            Are you looking for love and a lasting partnership? <br />
            Our matrimony website connects you with compatible individuals
            seeking the same. We foster connections built on shared values
            and understanding, helping you find your perfect match and embark
            on a beautiful journey together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              to={'/biodatas'}
              className="px-8 py-3 text-lg text-rose-400 hover:text-white border border-rose-500 font-semibold rounded transition duration-300"
            >
              Explore
            </Link>
            <Link
              to={'/dashboard/editbiodata'}
              className="px-8 py-3 text-lg text-rose-400 hover:text-white border border-rose-500 font-semibold rounded transition duration-300"
            >
              Join with us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carousel;
