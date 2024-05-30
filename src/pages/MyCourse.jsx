import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { Helmet } from "react-helmet-async"
import { Slide } from "react-awesome-reveal"

const MyCourse = () => {
	const { user } = useAuth()
	const [myCourse, setMyCourse] = useState([])
	console.log(user)

	useEffect(() => {
		fetch(`https://study-syncer-server.vercel.app/myCourses/${user?.email}`)
			.then((res) => res.json())
			.then((data) => {
				setMyCourse(data)
				console.log(data)
			})
	}, [user])
	console.log(myCourse)

	return (
		<div className='bg-[#ACA9BB] p-8 flex flex-col items-center rounded-2xl mt-12 mx-4 sm:mx-0'>
			<Helmet>
				<title>StudySyncer || Course</title>
			</Helmet>
			<Slide direction='down'>
				<h2 className='text-xl sm:text-6xl text-[#2B2938] font-bold my-8 text-center'>My Enrolled Courses</h2>
			</Slide>

			<Slide direction='up'>
				<div className='grid grid-cols-1 xl:grid-cols-3 gap-8 place-items-center mt-4'>
					{myCourse &&
						myCourse.map((course, index) => (
							<div key={index} className='card sm:w-96 bg-[#878495] drop-shadow-2xl shadow-2xl sm:h-[550px] rounded-2xl'>
								<figure className='w-full h-full'>
									<img
										src={course.image}
										className='object-cover w-full h-full hover:scale-110 transform transition-all duration-500'
										alt='Tourist Spot'
									/>
								</figure>
								<div className='card-body'>
									<h2 className='card-title text-[#2B2938] font-bold'>{course.title}</h2>
									<p className='text-[#474554] font-semibold'>Price: {course.price}$</p>
									<p className='text-[#474554] font-semibold'>
										Payment Status: <span className='text-green-300'>{course.status}</span>
									</p>
								</div>
							</div>
						))}
				</div>
			</Slide>
		</div>
	)
}

export default MyCourse
