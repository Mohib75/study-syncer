import { useLoaderData } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import { Helmet } from "react-helmet-async"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const UpdateAssignment = () => {
	const { user } = useAuth()
	const assignment = useLoaderData()
	const { _id, title, image, description, date, marks, difficulty } = assignment
	const { register, handleSubmit, setValue } = useForm({
		criteriaMode: "all",
	})
	const [startDate, setStartDate] = useState(new Date(date))

	useEffect(() => {
		setValue("date", startDate) // Set form value
	}, [date, setValue])

	const onSubmit = (data) => {
		const { title, image, description, marks, difficulty, date } = data

		const updateAssignmentData = {
			title,
			image,
			description,
			marks,
			difficulty,
			date,
			email: user?.email,
		}

		console.log(updateAssignmentData)

		// send data to the server
		fetch(`https://study-syncer-server.vercel.app/assignment/${_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updateAssignmentData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					Swal.fire({
						title: "Success!",
						text: "Assignment Updated Successfully",
						icon: "success",
						confirmButtonText: "Cool😎",
					})
				}
			})
	}

	return (
		<>
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
									defaultValue={title}
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
									defaultValue={image}
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
									defaultValue={description}
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
									defaultValue={marks}
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
									id='difficulty'
									defaultValue={difficulty}>
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
									selected={startDate}
									onChange={(date) => {
										setStartDate(date) // Update local state
										setValue("date", date.toISOString()) // Update form value
									}}
									className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'
								/>
							</div>
						</div>

						<button className='block w-full p-3 text-center text-[#2B2938] font-bold bg-transparent border-solid border-[1px] border-[#F2ECFF] hover:bg-[#F2ECFF] transition-all duration-500 rounded-md'>
							Update
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default UpdateAssignment
