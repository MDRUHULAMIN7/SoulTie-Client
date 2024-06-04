
import { Link } from 'react-router-dom';
import error from '../../images/error.jpg'
const ErrorPage = () => {
    return (
        <div className='bg-cover bg-no-repeat h-screen flex justify-center items-center'  style={{
            backgroundImage: `url(${error})`,
          }}>
         <Link to={'/'}>   <button className=' px-16 py-4 rounded-lg bg-rose-100 text-black text-3xl'>Go Home</button></Link>
            
        </div>
    );
};

export default ErrorPage;