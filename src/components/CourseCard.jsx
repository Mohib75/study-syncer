import { Link } from "react-router-dom"

const CourseCard = ({ course }) => {
	const { _id, title, image, price } = course

	return (
		<div className='card sm:w-96 bg-[#878495] drop-shadow-2xl shadow-2xl sm:h-[550px] rounded-2xl z-10'>
			<figure className='w-full h-full'>
				<img src={image} className='object-cover w-full h-full hover:scale-110 transform transition-all duration-500' alt='Tourist Spot' />
			</figure>
			<div className='card-body'>
				<h2 className='card-title text-[#2B2938] font-bold'>{title}</h2>
				<p className='text-[#474554] font-semibold'>Price: {price}$</p>

				<div className='card-actions justify-center'>
					<Link
						to={`/courses/${_id}`}
						className='text-[#2B2938] hover:scale-105 transition-all duration-500 font-bold bg-[#AFACBE] hover:bg-[#AFACBE] btn rounded-lg border-none drop-shadow-xl'>
						View Course
					</Link>
				</div>
			</div>
		</div>
	)
}

export default CourseCard
