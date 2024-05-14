import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"
import Swal from "sweetalert2"
import { useLoaderData, useParams } from "react-router-dom"

const TakeAssignment = () => {
	const loadedAssignment = useLoaderData()
	const { user } = useAuth()

	console.log(loadedAssignment)

	const { id } = useParams()
	console.log(id)
	const assignment = [loadedAssignment].find((assignment) => assignment._id === id)
	const { title, marks } = assignment

	const { register, handleSubmit } = useForm({
		criteriaMode: "all",
	})

	const onSubmit = (data) => {
		const { title, marks, name, file, note, obtainedMarks, feedback } = data

		const assignmentData = {
			title,
			marks,
			name,
			file,
			note,
			obtainedMarks,
			feedback,
			email: user?.email,
		}

		console.log(assignmentData)

		// send data to the server
		fetch("https://study-syncer-server.vercel.app/submittedAssignment", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(assignmentData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					Swal.fire({
						title: "Success!",
						text: "Assignment Submitted Successfully",
						icon: "success",
						confirmButtonText: "Cool😎",
					})
				}
			})
	}

	return (
		<>
			<Helmet>
				<title>StudySyncer || Submit Assignment</title>
			</Helmet>
			<div className='flex justify-center my-16 mx-4 lg:mx-0'>
				<div className='w-full max-w-4xl py-8 px-6 sm:p-8 space-y-3 rounded-xl bg-[#ACA9BB] drop-shadow-xl mx-4 sm:mx-0'>
					<h1 className='text-xl sm:text-2xl font-bold text-center mb-4 text-[#2B2938]'>Submit Assignment</h1>
					<form action='' className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
						<div className='flex gap-4 flex-col sm:flex-row items-center w-full'>
							<div className='space-y-1 text-sm w-full sm:w-1/2'>
								<label htmlFor='title' className='block text-[#474554]'>
									Title
								</label>
								<input
									readOnly
									defaultValue={title}
									{...register("title")}
									type='text'
									name='title'
									id='title'
									placeholder='Title'
									className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'
								/>
							</div>

							<div className='space-y-1 text-sm w-full sm:w-1/2'>
								<label htmlFor='title' className='block text-[#474554]'>
									Full Marks
								</label>
								<input
									readOnly
									defaultValue={marks}
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
								<label htmlFor='name' className='block text-[#474554]'>
									Name
								</label>
								<input
									required
									{...register("name")}
									type='text'
									name='name'
									id='name'
									placeholder='Name'
									className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'
								/>
							</div>

							<div className='space-y-1 text-sm w-full sm:w-1/2'>
								<label htmlFor='file' className='block text-[#474554]'>
									Submission Link
								</label>
								<input
									required
									{...register("file")}
									type='text'
									name='file'
									id='file'
									placeholder='Link Url'
									className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'
								/>
							</div>
						</div>

						<div className='flex gap-4 flex-col sm:flex-row items-center w-full'>
							<div className='space-y-1 text-sm w-full'>
								<label htmlFor='note' className='block text-[#474554]'>
									Note
								</label>
								<textarea
									required
									{...register("note")}
									name='note'
									id='note'
									placeholder='Note'
									className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'></textarea>
							</div>
						</div>

						<input
							hidden
							{...register("obtainedMarks")}
							type='text'
							name='obtainedMarks'
							id='obtainedMarks'
							placeholder='Give Marks'
							className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'
						/>

						<input
							hidden
							{...register("feedback")}
							type='text'
							name='feedback'
							id='feedback'
							placeholder='Feedback'
							className='w-full px-4 py-3 rounded-md border-gray-300 bg-[#F2ECFF] text-gray-900 outline-none'
						/>

						<button className='block w-full p-3 text-center text-[#2B2938] font-bold bg-transparent border-solid border-[1px] border-[#F2ECFF] hover:bg-[#F2ECFF] transition-all duration-500 rounded-md'>
							Submit
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default TakeAssignment
