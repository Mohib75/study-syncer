import { Fade } from "react-awesome-reveal"

const Faq = () => {
	return (
		<div className='flex flex-col bg-[#ACA9BB] lg:h-[600px] mt-20 rounded-2xl items-center'>
			<Fade cascade className='flex flex-col items-center w-full'>
				<h2 className='text-2xl font-semibold lg:text-6xl text-center mt-12 text-white'>Frequently Asked Questions</h2>
				<div className='hero-content flex-col lg:flex-row w-full gap-4 h-full'>
					<div className='container flex flex-col justify-center px-4 py-8 mx-auto md:p-8'>
						<div className='space-y-4'>
							<details className='w-full border rounded-lg cursor-pointer'>
								<summary className='px-4 py-6 focus:outline-none'>How can I create a assignment on this platform?</summary>
								<p className='px-4 py-6 pt-0 ml-4 -mt-4'>
									To create a assignment simply navigate to the create assignment section of the website. Fill out the required
									information such as assignment title, description then click Add.
								</p>
							</details>
							<details className='w-full border rounded-lg cursor-pointer'>
								<summary className='px-4 py-6 focus:outline-none'>Can I give mark to others assignment?</summary>
								<p className='px-4 py-6 pt-0 ml-4 -mt-4'>
									Yes, you can. Go to the pending assignment section and click give mark button. Fill out the required form for
									giving mark then click submit.
								</p>
							</details>
							<details className='w-full border rounded-lg cursor-pointer'>
								<summary className='px-4 py-6 focus:outline-none'>Can i edit any assignment?</summary>
								<p className='px-4 py-6 pt-0 ml-4 -mt-4'>
									Yes, you can edit any assignment. Go to the assignment section then choose any of your prefer assignment, there is
									a edit button then click it. Fil out required information then click Update.
								</p>
							</details>
						</div>
					</div>

					<div className='w-1/2'>
						<img src='faq.gif' className='w-full' />
					</div>
				</div>
			</Fade>
		</div>
	)
}

export default Faq
