import { Link } from "react-router-dom"

const Hero = () => {
	return (
		<div className='hero bg-[#ACA9BB] lg:h-[600px] rounded-2xl'>
			<div className='hero-content flex-col lg:flex-row w-full gap-12 lg:gap-4'>
				<div className='lg:w-1/2 flex flex-col items-center lg:items-start'>
					<h1 className='text-3xl lg:text-6xl text-white font-bold text-center lg:text-left'>Online Group Study</h1>
					<p className='py-6 sm:text-lg text-center lg:text-left'>
						Here you can create assignment,complete them and Grade their assignments.
					</p>
					<Link
						to={`/assignment`}
						className='text-[#2B2938] text-center hover:scale-105 transition-all duration-500 font-bold bg-[#878495] hover:bg-[#878495] btn rounded-lg border-none drop-shadow-xl w-44'>
						Go To Assignment
					</Link>
				</div>
				<div className='lg:w-1/2'>
					<img src='banner.gif' className='w-full' />
				</div>
			</div>
		</div>
	)
}

export default Hero
