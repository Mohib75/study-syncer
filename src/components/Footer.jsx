import { Slide } from "react-awesome-reveal"
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa"
import { Link } from "react-router-dom"

const Footer = () => {
	return (
		<footer className='footer footer-center p-10 bg-[#909CB2] text-primary-content mt-20'>
			<nav className='grid grid-flow-col gap-4'>
				<Slide direction='down'>
					<Link to='/assignment' className='link link-hover text-white'>
						Assignment
					</Link>
				</Slide>

				<Slide direction='down'>
					<Link to='/login' className='link link-hover text-white'>
						Login
					</Link>
				</Slide>

				<Slide direction='down'>
					<Link to='/register' className='link link-hover text-white'>
						Register
					</Link>
				</Slide>
			</nav>
			<aside>
				<Slide direction='up'>
					<h1 className='text-4xl font-bold text-white'>StudySyncer</h1>
				</Slide>

				<Slide direction='down'>
					<p className='font-light leading-7 text-[#FFFFFF9E]'>
						StudySyncer Ltd. <br />
						Providing reliable service since 2023
					</p>
				</Slide>

				<Slide direction='up'>
					<p className='text-[#FFFFFF9E]'>Copyright © 2024 - All right reserved</p>
				</Slide>
			</aside>
			<nav>
				<div className='grid grid-flow-col gap-4'>
					<Slide direction='up'>
						<Link to='https://twitter.com/' target='_blank' className='hover:scale-110 transform transition-all duration-500'>
							<FaTwitter className='text-3xl text-[#1DA1F2]' />
						</Link>
					</Slide>

					<Slide direction='down'>
						<Link to='https://web.facebook.com/' target='_blank' className='hover:scale-110 transform transition-all duration-500'>
							<FaFacebookF className='text-3xl text-[#4267B2]' />
						</Link>
					</Slide>

					<Slide direction='up'>
						<Link to='https://www.youtube.com/' target='_blank' className='hover:scale-110 transform transition-all duration-500'>
							<FaYoutube className='text-3xl text-[#FF0000]' />
						</Link>
					</Slide>
				</div>
			</nav>
		</footer>
	)
}

export default Footer
