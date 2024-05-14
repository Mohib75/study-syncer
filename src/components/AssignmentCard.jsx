import { Link } from "react-router-dom"
import Button from "./Button"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import Swal from "sweetalert2"
import useAuth from "../hooks/useAuth"

const AssignmentCard = ({ assign, filteredAssignments, setFilteredAssignments }) => {
	const { user } = useAuth()
	const { _id, title, image, marks, difficulty, email } = assign
	const handleDelete = (_id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (user?.email === email) {
				if (result.isConfirmed) {
					fetch(`https://study-syncer-server.vercel.app/assignment/${_id}`, {
						method: "DELETE",
					})
						.then((res) => res.json())
						.then((data) => {
							console.log(data)
							if (data.deletedCount > 0) {
								Swal.fire({
									title: "Deleted!",
									text: "Assignment has been deleted.",
									icon: "success",
								})

								const remaining = filteredAssignments.filter((aData) => aData._id !== _id)
								setFilteredAssignments(remaining)
							}
						})
				}
			} else {
				Swal.fire({
					title: "Error!",
					text: "Forbidden access",
					icon: "error",
					confirmButtonText: "Ok",
				})
			}
		})
	}

	return (
		<div className='card sm:w-96 bg-[#878495] drop-shadow-2xl shadow-2xl sm:h-[550px] rounded-2xl'>
			<figure className='w-full h-full'>
				<img src={image} className='object-cover w-full h-full hover:scale-110 transform transition-all duration-500' alt='Tourist Spot' />
			</figure>
			<div className='card-body'>
				<h2 className='card-title text-[#2B2938] font-bold'>{title}</h2>
				<p className='text-[#474554] font-semibold'>Marks: {marks}</p>
				<p className='text-[#474554] font-semibold'>Difficulty: {difficulty}</p>
				<div className='flex justify-between items-center my-4'>
					<Link to={`/updateAssignment/${_id}`}>
						<Button className='btn rounded-lg bg-transparent text-[#2B2938] border-solid border-[1px] border-[#F2ECFF] hover:bg-[#F2ECFF] transition-all duration-500'>
							<FaEdit className='sm:text-2xl' />
						</Button>
					</Link>

					<Button
						onClick={() => handleDelete(_id)}
						className='btn rounded-lg bg-transparent text-[#2B2938] border-solid border-[1px] border-[#F2ECFF] hover:bg-[#F2ECFF] transition-all duration-500'>
						<MdDelete className='sm:text-2xl' />
					</Button>
				</div>
				<div className='card-actions justify-center'>
					<Link
						to={`/assignment/${_id}`}
						className='text-[#2B2938] hover:scale-105 transition-all duration-500 font-bold bg-[#AFACBE] hover:bg-[#AFACBE] btn rounded-lg border-none drop-shadow-xl'>
						View Assignment
					</Link>
				</div>
			</div>
		</div>
	)
}

export default AssignmentCard
