// import { useState } from "react"
import { Link, useLoaderData } from "react-router-dom"
import Button from "../components/Button"
import { Helmet } from "react-helmet-async"
import { Slide } from "react-awesome-reveal"

const PendingAssignment = () => {
	const loadedAssignment = useLoaderData()
	// const [filteredAssignment, setFilteredAssignment] = useState([])
	// Filter assignments that have not been marked yet
	const pendingAssignments = loadedAssignment.filter((assignment) => !assignment.obtainedMarks)

	return (
		<div className='flex flex-col items-center mt-12 gap-4'>
			<Helmet>
				<title>StudySyncer || Pending Assignment</title>
			</Helmet>

			<Slide direction='down'>
				<h1 className='text-4xl font-bold'>Pending Assignment</h1>
			</Slide>

			{pendingAssignments &&
				pendingAssignments.map((aData, index) => (
					<div className='overflow-x-auto bg-[#878495] rounded-2xl w-[85%] sm:w-[80%]' key={index}>
						<table className='table'>
							{/* head */}
							<thead>
								<tr className='text-[#2B2938] text-lg font-semibold'>
									<th></th>
									<th>Title</th>
									<th>Full Marks</th>
									<th>Examinee Name</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr className='text-white'>
									<th>{index + 1}</th>
									<td className='w-60'>{aData.title}</td>
									<td>{aData.marks}</td>
									<td>{aData.name}</td>
									<td>
										<Link to={`/giveMark/${aData._id}`}>
											<Button className='text-[#2B2938] hover:scale-105 transition-all duration-500 font-bold bg-[#AFACBE] hover:bg-[#AFACBE] btn rounded-lg border-none drop-shadow-xl'>
												Give Mark
											</Button>
										</Link>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				))}
		</div>
	)
}

export default PendingAssignment
