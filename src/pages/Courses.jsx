import { Slide } from "react-awesome-reveal"
import Button from "../components/Button"
import CourseCard from "../components/CourseCard"
import { Helmet } from "react-helmet-async"
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"

const Courses = () => {
	const loadedCourse = useLoaderData()
	const [originalCourses, setOriginalCourses] = useState([])
	const [filteredCourses, setFilteredCourses] = useState([])
	const [currentPage, setCurrentPage] = useState(0)
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [count, setCount] = useState(0)

	const numberOfPages = Math.ceil(count / itemsPerPage)
	const pages = [...Array(numberOfPages).keys()]

	useEffect(() => {
		setOriginalCourses(loadedCourse)
		setFilteredCourses(loadedCourse)
	}, [loadedCourse])

	useEffect(() => {
		fetch("https://study-syncer-server.vercel.app/courseCount")
			.then((res) => res.json())
			.then((data) => setCount(data.count))
	}, [])

	useEffect(() => {
		fetch(`https://study-syncer-server.vercel.app/courses?page=${currentPage}&size=${itemsPerPage}`)
			.then((res) => res.json())
			.then((data) => setFilteredCourses(data))
	}, [currentPage, itemsPerPage])

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
				<title>StudySyncer || Course</title>
			</Helmet>
			<Slide direction='down'>
				<h2 className='text-xl sm:text-6xl text-[#2B2938] font-bold my-8 text-center'>Courses</h2>
			</Slide>

			<Slide direction='up'>
				<div className='grid grid-cols-1 xl:grid-cols-3 gap-8 place-items-center mt-4'>
					{filteredCourses &&
						filteredCourses.map((course, index) => (
							<div key={index}>
								<CourseCard course={course} />
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

export default Courses
