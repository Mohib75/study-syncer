import { Helmet } from "react-helmet-async"
import { FaPhoneAlt } from "react-icons/fa"
import { IoMailOpenSharp } from "react-icons/io5"
import { useLoaderData } from "react-router-dom"
import Button from "../components/Button"
import useAuth from "../hooks/useAuth"
import Swal from "sweetalert2"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../components/Payment"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const CourseDetail = () => {
	const { user } = useAuth()
	const course = useLoaderData()
	const { title, image, description, price } = course

	// const handleSubmit = () => {
	// 	Swal.fire({
	// 		title: "Are you sure?",
	// 		text: "You eant to Take this course and pay the payment",
	// 		icon: "warning",
	// 		showCancelButton: true,
	// 		confirmButtonColor: "#3085d6",
	// 		cancelButtonColor: "#d33",
	// 		confirmButtonText: "Yes, Confirm It!",
	// 	}).then((result) => {
	// 		if (result.isConfirmed) {
	// 			const courseData = {
	// 				name: user?.displayName,
	// 				email: user?.email,
	// 				title: title,
	// 				image: image,
	// 				description: description,
	// 				price: price,
	// 			}
	// 			// send data to the server
	// 			fetch("https://study-syncer-server.vercel.app/enrolledCourses", {
	// 				method: "POST",
	// 				headers: { "Content-Type": "application/json" },
	// 				body: JSON.stringify(courseData),
	// 			})
	// 				.then((res) => res.json())
	// 				.then((data) => {
	// 					if (data.insertedId) {
	// 						Swal.fire({
	// 							title: "Success!",
	// 							text: "Course taken Successfully. You can now go to your my course page. It is located in your profile image section. Click the image",
	// 							icon: "success",
	// 							confirmButtonText: "Cool😎",
	// 						})
	// 					}
	// 				})
	// 		}
	// 	})
	// }

	return (
		<div className='flex flex-col gap-8 mt-8 mx-4 xl:mx-0'>
			<Helmet>
				<title>StudySyncer || Course Detail</title>
			</Helmet>

			<h1 className='text-3xl sm:text-6xl font-bold text-center'>Details</h1>

			<div className='grid grid-cols-1 xl:grid-cols-3 gap-12 mt-12'>
				<div className='xl:col-span-2 flex flex-col gap-8'>
					<h1 className='text-2xl sm:text-4xl font-bold text-center xl:text-left'>{title}</h1>
					<div className='rounded-2xl sm:w-96 h-80 self-center'>
						<img className='object-cover w-full h-full rounded-2xl' src={image} />
					</div>
					<h3 className=' text-lg font-bold'>Course Description</h3>
					<p className=' '>{description}</p>
				</div>

				<div className='flex flex-col gap-8'>
					<div className='bg-[#878495] px-8 py-12 flex flex-col rounded-2xl gap-8 h-[500px] w-full sm:w-96 xl:w-full self-center xl:self-auto'>
						<div className='flex flex-col'>
							<p className='text-xl font-extrabold'>Title</p>
							<p className=''>{title}</p>
						</div>

						<div className='flex flex-col'>
							<p className='text-xl font-extrabold'>Price</p>
							<p className=''>{price}$</p>
						</div>

						{/* Open the modal using document.getElementById('ID').showModal() method */}
						<Button
							className='text-[#2B2938] hover:scale-105 transition-all duration-500 font-bold bg-[#AFACBE] hover:bg-[#AFACBE] btn rounded-lg border-none drop-shadow-xl'
							onClick={() => document.getElementById("my_modal_5").showModal()}>
							Take Course
						</Button>

						<dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
							<div className='modal-box'>
								<h3 className='font-bold text-lg'>Title: {title}</h3>
								<h3 className='font-bold text-lg'>Price: {price}</h3>
								<p className='py-4'></p>

								<Elements stripe={stripePromise}>
									<CheckoutForm course={course} />
								</Elements>
							</div>
						</dialog>
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

export default CourseDetail
