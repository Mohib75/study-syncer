import { useState } from "react"
import { Helmet } from "react-helmet-async"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import useAuth from "../hooks/useAuth"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import { Slide } from "react-awesome-reveal"

const CreateAssignment = () => {
	const { user } = useAuth()
	const { register, handleSubmit } = useForm({
		criteriaMode: "all",
	})
	const [startDate, setStartDate] = useState(new Date())

	const onSubmit = (data) => {
		const { title, image, description, marks, difficulty } = data

		const assignmentData = {
			title,
			image,
			description,
			marks,
			difficulty,
			date: startDate,
			email: user?.email,
		}

		console.log(assignmentData)

		// send data to the server
		fetch("https://study-syncer-server.vercel.app/assignment", {
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
					<title>StudySyncer || Add Assignment</title>
				</Helmet>
				<div className='flex justify-center my-16 mx-4 lg:mx-0'>
					<div className='w-full max-w-4xl py-8 px-6 sm:p-8 space-y-3 rounded-xl bg-[#ACA9BB] drop-shadow-xl mx-4 sm:mx-0'>
						<h1 className='text-xl sm:text-2xl font-bold text-center mb-4 text-[#2B2938]'>Add Assignment</h1>
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
									<label htmlFor='marks' className='block text-[#474554]'>
										Marks
									</label>
									<input
										{...register("marks")}
										type='text'
										name='marks'
										id='marks'
										placeholder='Marks'
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'
									/>
								</div>
							</div>

							<div className='flex gap-4 flex-col sm:flex-row items-center w-full'>
								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='difficulty' className='block text-[#474554]'>
										Difficulty
									</label>
									<select
										{...register("difficulty")}
										className='select border-gray-300 bg-[#F2ECFF] focus:outline-none w-full text-gray-900 outline-none'
										name='difficulty'
										id='difficulty'>
										<option disabled selected>
											Difficulty Level
										</option>
										<option value='easy'>Easy</option>
										<option value='medium'>Medium</option>
										<option value='hard'>Hard</option>
									</select>
								</div>

								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='date' className='block text-[#474554]'>
										Date
									</label>
									<DatePicker
										{...register("date")}
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'
										selected={startDate}
										onChange={(date) => setStartDate(date)}
										name='date'
										id='date'
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

export default CreateAssignment
