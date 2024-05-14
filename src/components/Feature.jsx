import { useState } from "react"
import AssignmentCard from "./AssignmentCard"

const Feature = ({ loadedAssignment }) => {
	const [assignment, setAssignment] = useState(loadedAssignment)
	return (
		<div className='bg-[#ACA9BB] p-8 pb-16 flex flex-col items-center rounded-2xl mt-20'>
			<h2 className='text-3xl lg:text-6xl text-white font-bold my-8 text-center'>Our Assignments</h2>

			<div className='grid grid-cols-1 xl:grid-cols-3 gap-8 place-items-center mt-4'>
				{assignment &&
					assignment.slice(0, 6).map((aData, index) => (
						<div key={index} className=''>
							<AssignmentCard assign={aData} filteredAssignments={assignment} setFilteredAssignments={setAssignment} />
						</div>
					))}
			</div>
		</div>
	)
}

export default Feature
