import { Helmet } from "react-helmet-async"
import { FaAngleDown } from "react-icons/fa"
import AssignmentCard from "../components/AssignmentCard"
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"
import Button from "../components/Button"
import { Slide } from "react-awesome-reveal"

const Assignments = () => {
	const loadedAssignment = useLoaderData()
	const [originalAssignments, setOriginalAssignments] = useState([])
	const [filteredAssignments, setFilteredAssignments] = useState([])
	const [currentPage, setCurrentPage] = useState(0)
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [count, setCount] = useState(0)

	const numberOfPages = Math.ceil(count / itemsPerPage)
	const pages = [...Array(numberOfPages).keys()]

	useEffect(() => {
		setOriginalAssignments(loadedAssignment)
		setFilteredAssignments(loadedAssignment)
	}, [loadedAssignment])

	useEffect(() => {
		fetch("http://localhost:5000/assignmentCount")
			.then((res) => res.json())
			.then((data) => setCount(data.count))
	}, [])

	useEffect(() => {
		fetch(`http://localhost:5000/assignment?page=${currentPage}&size=${itemsPerPage}`)
			.then((res) => res.json())
			.then((data) => setFilteredAssignments(data))
	}, [currentPage, itemsPerPage])

	const handleFilterByDifficultyLevel = (difficulty) => {
		if (difficulty) {
			const filtered = originalAssignments.filter((assign) => assign.difficulty === difficulty)
			setFilteredAssignments(filtered)
		} else {
			setFilteredAssignments(originalAssignments)
		}
	}

	const handleItemsPerPage = (e) => {
		const val = parseInt(e.target.value)
		console.log(val)
		setItemsPerPage(val)
		setCurrentPage(0)
	}

	const handlePrevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handleNextPage = () => {
		if (currentPage < pages.length - 1) {
			setCurrentPage(currentPage + 1)
		}
	}

	return (
		<div className='bg-[#ACA9BB] p-8 flex flex-col items-center rounded-2xl mt-12 mx-4 sm:mx-0'>
			<Helmet>
				<title>StudySyncer || Assignment</title>
			</Helmet>
			<Slide direction='down'>
				<h2 className='text-xl sm:text-6xl text-[#2B2938] font-bold my-8 text-center'>Assignments</h2>
			</Slide>

			<Slide direction='up'>
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
			</Slide>

			<Slide direction='up'>
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
			</Slide>

			<div className='pagination mt-20 flex flex-col sm:flex-row gap-8'>
				<div className='join'>
					<Button onClick={handlePrevPage} className='join-item btn'>
						«
					</Button>
					{pages.map((page, index) => (
						<Button
							onClick={() => setCurrentPage(page)}
							key={index}
							className={currentPage === page ? "bg-[#878495] join-item btn text-white" : "join-item btn"}>
							{page + 1}
						</Button>
					))}

					<Button onClick={handleNextPage} className='join-item btn'>
						»
					</Button>
				</div>
				{/* <div className='flex gap-8 items-center'>
					<Button
						className='text-[#2B2938] hover:scale-105 transition-all duration-500 font-bold bg-[#878495] hover:bg-[#878495] btn rounded-lg border-none drop-shadow-xl'
						onClick={handlePrevPage}>
						Prev
					</Button>
					{pages.map((page) => (
						<Button
							className={currentPage === page ? "bg-[#878495] p-1 px-6 rounded-2xl" : "p-1 px-6 rounded-2xl"}
							onClick={() => setCurrentPage(page)}
							key={page}>
							{page + 1}
						</Button>
					))}
					<Button
						className='text-[#2B2938] hover:scale-105 transition-all duration-500 font-bold bg-[#878495] hover:bg-[#878495] btn rounded-lg border-none drop-shadow-xl'
						onClick={handleNextPage}>
						Next
					</Button>
				</div> */}

				<select
					className='select border-gray-300 bg-[#F2ECFF] outline-none focus:outline-none w-full max-w-xs text-[#2B2938]'
					value={itemsPerPage}
					onChange={handleItemsPerPage}
					name=''
					id=''>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='20'>20</option>
					<option value='50'>50</option>
				</select>
			</div>
		</div>
	)
}

export default Assignments
