import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";




const BiodataCard = ({data}) => {
    return (
        <div>
            <div className="max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
	<div className="flex justify-between pb-4 border-bottom">
		<div className="flex items-center ">
			<p rel="noopener noreferrer" href="#" className="mb-0 capitalize dark:text-gray-800">{data?.biodataType} <span className="bg-rose-300 w-10 h-10 p-1 text-white rounded-full">{data?.biodataId}</span></p>
		</div>
		<Link to={`/detailprofile/${data?._id}`}><button rel="noopener noreferrer" className="flex gap-1 items-center h-10" >  <ImProfile></ImProfile> 
        View Profile</button></Link>
	</div>
	<div className="space-y-4">
		<div className="space-y-2">
			<img src={data?.photo} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
			<div className="flex items-center text-sm">
				<span>Age:{data?.Age}</span>
			</div>
		</div>
		<div className="space-y-2">
			<a rel="noopener noreferrer" href="#" className="block">
				<h3 className="text-2xl font-semibold dark:text-violet-600">{data?.Occupation}</h3>
			</a>
			<p className="leading-snug text-xl dark:text-gray-600">ParmanentDivison:{data?.ParmanentDivison
}</p>
		</div>
	</div>
</div>
        </div>
    );
};

export default BiodataCard;