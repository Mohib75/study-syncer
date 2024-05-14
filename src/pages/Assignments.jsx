import { Helmet } from "react-helmet-async"
import { FaAngleDown } from "react-icons/fa"
import AssignmentCard from "../components/AssignmentCard"
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

const Assignments = () => {
	const loadedAssignment = useLoaderData()
	const [originalAssignments, setOriginalAssignments] = useState([])
	const [filteredAssignments, setFilteredAssignments] = useState([])

	useEffect(() => {
		setOriginalAssignments(loadedAssignment)
		setFilteredAssignments(loadedAssignment)
	}, [loadedAssignment])

	const handleFilterByDifficultyLevel = (difficulty) => {
		if (difficulty) {
			const filtered = originalAssignments.filter((assign) => assign.difficulty === difficulty)
			setFilteredAssignments(filtered)
		} else {
			setFilteredAssignments(originalAssignments)
		}
	}

	return (
		<div className='bg-[#ACA9BB] p-8 flex flex-col items-center rounded-2xl mt-12 mx-4 sm:mx-0'>
			<Helmet>
				<title>Voyago || Assignment</title>
			</Helmet>
			<h2 className='text-xl sm:text-6xl text-[#2B2938] font-bold my-8 text-center'>Assignments</h2>

			<div className='flex flex-col'>
				<p className='text-2xl text-center mt-8 text-[#474554]'>Sort By</p>
				<div className='dropdown self-center mt-4 mb-8'>
					<div
						tabIndex={0}
						role='button'
						className='btn rounded-lg bg-transparent text-[#2B2938] border-solid border-[1px] border-[#F2ECFF] hover:bg-[#F2ECFF] transition-all duration-500'>
						Difficulty Level
						<FaAngleDown />
					</div>
					<ul tabIndex={0} className='dropdown-content z-[1] menu p-4 shadow bg-[#C8C2E7] rounded-lg w-40 sm:w-52 space-y-4'>
						<li
							onClick={() => handleFilterByDifficultyLevel("easy")}
							className='hover:bg-[#F2ECFF] transition-all duration-500 rounded-lg text-[#474554]'>
							<a>Easy</a>
						</li>
						<li
							onClick={() => handleFilterByDifficultyLevel("medium")}
							className='hover:bg-[#F2ECFF] transition-all duration-500 rounded-lg text-[#474554]'>
							<a>Medium</a>
						</li>
						<li
							onClick={() => handleFilterByDifficultyLevel("hard")}
							className='hover:bg-[#F2ECFF] transition-all duration-500 rounded-lg text-[#474554]'>
							<a>Hard</a>
						</li>
					</ul>
				</div>
			</div>

			<div className='grid grid-cols-1 xl:grid-cols-3 gap-8 place-items-center mt-4'>
				{filteredAssignments &&
					filteredAssignments.map((assign, index) => (
						<div key={index}>
							<AssignmentCard
								assign={assign}
								filteredAssignments={filteredAssignments}
								setFilteredAssignments={setFilteredAssignments}
							/>
						</div>
					))}
			</div>
		</div>
	)
}

export default Assignments
