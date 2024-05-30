import { useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"
import Swal from "sweetalert2"
import { Slide } from "react-awesome-reveal"
import { Helmet } from "react-helmet-async"

const AddCourse = () => {
	const { user } = useAuth()
	const { register, handleSubmit } = useForm({
		criteriaMode: "all",
	})

	const onSubmit = (data) => {
		const { title, image, description, price } = data

		const assignmentData = {
			title,
			image,
			description,
			price,
			email: user?.email,
		}

		console.log(assignmentData)

		// send data to the server
		fetch("https://study-syncer-server.vercel.app/courses", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(assignmentData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					Swal.fire({
						title: "Success!",
						text: "Assignment Added",
						icon: "success",
						confirmButtonText: "Cool😎",
					})
				}
			})
	}

	return (
		<>
			<Slide direction='down'>
				<Helmet>
					<title>StudySyncer || Add Course</title>
				</Helmet>
				<div className='flex justify-center my-16 mx-4 lg:mx-0'>
					<div className='w-full max-w-4xl py-8 px-6 sm:p-8 space-y-3 rounded-xl bg-[#ACA9BB] drop-shadow-xl mx-4 sm:mx-0'>
						<h1 className='text-xl sm:text-2xl font-bold text-center mb-4 text-[#2B2938]'>Add Course</h1>
						<form action='' className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
							<div className='flex gap-4 flex-col sm:flex-row items-center w-full'>
								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='title' className='block text-[#474554]'>
										Title
									</label>
									<input
										{...register("title")}
										type='text'
										name='title'
										id='title'
										placeholder='Title'
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'
									/>
								</div>

								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='image' className='block text-[#474554]'>
										Image
									</label>
									<input
										{...register("image")}
										type='text'
										name='image'
										id='image'
										placeholder='Image'
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'
									/>
								</div>
							</div>

							<div className='flex gap-4 flex-col sm:flex-row items-center w-full'>
								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='description' className='block text-[#474554]'>
										Description
									</label>
									<input
										{...register("description")}
										type='text'
										name='description'
										id='description'
										placeholder='Description'
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'
									/>
								</div>

								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='price' className='block text-[#474554]'>
										Price
									</label>
									<input
										{...register("price")}
										type='text'
										name='price'
										id='price'
										placeholder='Price'
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'
									/>
								</div>
							</div>

							<button className='block w-full p-3 text-center text-[#2B2938] font-bold bg-transparent border-solid border-[1px] border-[#F2ECFF] hover:bg-[#F2ECFF] transition-all duration-500 rounded-md'>
								Add
							</button>
						</form>
					</div>
				</div>
			</Slide>
		</>
	)
}

export default AddCourse
