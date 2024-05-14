import { Helmet } from "react-helmet-async"
import { FaPhoneAlt } from "react-icons/fa"
import { IoMailOpenSharp } from "react-icons/io5"
import { Link, useLoaderData } from "react-router-dom"
import Button from "../components/Button"
import { GoDotFill } from "react-icons/go"

const AssignmentDetail = () => {
	const assignment = useLoaderData()
	const { _id, title, image, description, date, marks, difficulty } = assignment
	return (
		<div className='flex flex-col gap-8 mt-8 mx-4 xl:mx-0'>
			<Helmet>
				<title>Voyago || Assignment Detail</title>
			</Helmet>

			<h1 className='text-3xl sm:text-6xl font-bold text-center'>Details</h1>

			<div className='grid grid-cols-1 xl:grid-cols-3 gap-12 mt-12'>
				<div className='xl:col-span-2 flex flex-col gap-8'>
					<h1 className='text-2xl sm:text-4xl font-bold text-center xl:text-left'>{title}</h1>
					<div className='rounded-2xl sm:w-96 h-80 self-center'>
						<img className='object-cover w-full h-full rounded-2xl' src={image} />
					</div>
					<h3 className=' text-lg font-bold'>Assignment Description</h3>
					<p className=' '>{description}</p>

					{/* <h3 className='text-white text-lg font-semibold'>Location</h3>
						<p className='text-[#FFFFFF9E] '>It is located in the {location}.</p> */}

					<div className='flex flex-col gap-8 sm:flex-row sm:justify-between sm:w-[70%]'>
						<div className='flex flex-col gap-6'>
							<h3 className=' text-lg font-bold mb-2'>Rules</h3>

							<div className='flex gap-4 items-center'>
								<GoDotFill />
								<p className='font-light'>Not more than 250 words</p>
							</div>
							<div className='flex gap-4 items-center'>
								<GoDotFill />
								<p className='font-light'>Must be in PDF</p>
							</div>
							<div className='flex gap-4 items-center'>
								<GoDotFill />
								<p className='font-light'>Align words perfectly</p>
							</div>
						</div>
					</div>
				</div>

				<div className='flex flex-col gap-8'>
					<div className='bg-[#878495] px-8 py-12 flex flex-col rounded-2xl gap-8 h-[500px] w-full sm:w-96 xl:w-full self-center xl:self-auto'>
						<div className='flex flex-col'>
							<p className='text-xl font-extrabold'>Title</p>
							<p className=''>{title}</p>
						</div>

						<div className='flex flex-col'>
							<p className='text-xl font-extrabold'>Marks</p>
							<p className=''>{marks}</p>
						</div>

						<div className='flex flex-col'>
							<p className='text-xl font-extrabold'>Difficulty</p>
							<p className=''>{difficulty}</p>
						</div>

						<div className='flex flex-col'>
							<p className='text-xl font-extrabold'>Due Date</p>
							<p className=''>{date.slice(0, 10)}</p>
						</div>

						<Link to={`/takeAssignment/${_id}`} className='self-center'>
							<Button className='text-[#2B2938] hover:scale-105 transition-all duration-500 font-bold bg-[#AFACBE] hover:bg-[#AFACBE] btn rounded-lg border-none drop-shadow-xl'>
								Take Assignment
							</Button>
						</Link>
					</div>

					<div className='relative'>
						<div className='rounded-2xl w-full h-72 opacity-30'>
							<img className='object-cover w-full h-full rounded-2xl' src='/contact.jpg' />
						</div>

						<div className='flex flex-col gap-8 absolute top-6 sm:top-12 justify-center items-center w-full'>
							<h4 className='text-xl font-bold'>Have Any Question?</h4>

							<p className='text-center text-xs sm:text-base font-bold'>
								feel free to contact with us at anytime. Our information is given below.
							</p>

							<div className='flex flex-col gap-4'>
								<div className='flex gap-4 items-center text-sm sm:text-base'>
									<FaPhoneAlt className='' />
									<p className='font-bold'>+8801971125806</p>
								</div>

								<div className='flex gap-4 items-center text-sm sm:text-base'>
									<IoMailOpenSharp className='' />
									<p className='font-bold'>ifthakherrahman426@gmail.com</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AssignmentDetail
