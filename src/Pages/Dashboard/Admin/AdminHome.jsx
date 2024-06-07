import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import img1 from '../../../images/download.png'
import img2 from '../../../images/images.png'
import img3 from '../../../images/png.png'
import img4 from '../../../images/man.png'
import img5 from '../../../images/i.png'

const AdminHome = () => {
    const {user}=UseAuth()
    const axiosPublic = UseAxiosPublic()

    const {data:stats={}}= useQuery({
      queryKey:['admin-info'],
      enabled:!!user?.email,
      queryFn:async ()=>{
        const res = await axiosPublic.get('/admin-info');
        return res.data
      }     
    })
    console.log(stats);
    return (
        <div>
           <section className="p-6 my-6 dark:bg-gray-100 dark:text-gray-800">
	<div className="container grid grid-cols-1 gap-2 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4j xl:grid-cols-5 ">
		<div className="flex p-2 rounded-lg text-rose-400 w-fit dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
				<img className="h-16" src={img1} alt="" />
			</div>
			<div className="flex flex-col justify-center ">
				<p className="text-3xl font-semibold leading-none">{stats.revenue} $</p>
				<p className="capitalize">TotalRevenue</p>
			</div>
		</div>
		<div className="flex p-2 rounded-lg text-rose-400 w-fit dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
				<img className="h-16" src={img2} alt="" />
			</div>
			<div className="flex flex-col justify-center ">
				<p className="text-3xl font-semibold leading-none">{stats.biodata}</p>
				<p className="capitalize">TotalBiodata</p>
			</div>
		</div>
		<div className="flex p-2 rounded-lg text-rose-400 w-fit dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
				<img className="h-16" src={img4} alt="" />
			</div>
			<div className="flex flex-col justify-center ">
				<p className="text-3xl font-semibold leading-none">{stats.maleData} </p>
				<p className="capitalize">MaleBiodata</p>
			</div>
		</div>
		<div className="flex p-2 rounded-lg text-rose-400 w-fit dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
				<img className="h-16" src={img3} alt="" />
			</div>
			<div className="flex flex-col justify-center ">
				<p className="text-3xl font-semibold leading-none">{stats.femaleData} </p>
				<p className="capitalize">Female Biodata</p>
			</div>
		</div>
		<div className="flex p-2 rounded-lg text-rose-400 w-fit dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
				<img className="h-16" src={img5} alt="" />
			</div>
			<div className="flex flex-col justify-center ">
				<p className="text-3xl font-semibold leading-none">{stats.premiumData}</p>
				<p className="capitalize">Premium Biodata</p>
			</div>
		</div>
		
	</div>
</section>
        </div>
    );
};

export default AdminHome;