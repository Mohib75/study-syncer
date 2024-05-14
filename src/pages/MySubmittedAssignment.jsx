import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { Helmet } from "react-helmet-async"

const MySubmittedAssignment = () => {
	const { user } = useAuth()
	const [myAssignmentData, setMyAssignmentData] = useState([])

	useEffect(() => {
		fetch(`https://study-syncer-server.vercel.app/mySubmittedAssignment/${user?.email}`)
			.then((res) => res.json())
			.then((data) => {
				setMyAssignmentData(data)
			})
	}, [user])

	console.log(myAssignmentData)
	return (
		<div className='flex flex-col items-center mt-12 gap-4'>
			<Helmet>
				<title>StudySyncer || My Attempted Assignment</title>
			</Helmet>

			<h1 className='text-4xl font-bold'>My Attempted Assignment</h1>
			{myAssignmentData &&
				myAssignmentData.map((aData, index) => (
					<div className='overflow-x-auto bg-[#ACA9BB] rounded-2xl w-[85%] sm:w-[80%]' key={index}>
						<table className='table'>
							{/* head */}
							<thead>
								<tr className='text-[#2B2938] text-lg font-semibold'>
									<th></th>
									<th>Title</th>
									<th>Full Marks</th>
									<th>Obtained Marks</th>
									<th>Status</th>
									<th>Feedback</th>
								</tr>
							</thead>
							<tbody>
								<tr className='text-white'>
									<th>{index + 1}</th>
									<td className='w-60'>{aData.title}</td>
									<td>{aData.marks}</td>
									<td>{aData.obtainedMarks}</td>
									<td className='w-40'>{aData.obtainedMarks ? "Completed" : "Pending"}</td>
									<td className='w-40'>{aData.feedback}</td>
								</tr>
							</tbody>
						</table>
					</div>
				))}
		</div>
	)
}

export default MySubmittedAssignment
