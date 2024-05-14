import { Link, useLocation, useNavigate } from "react-router-dom"
import SocialLogin from "../components/SocialLogin"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import useAuth from "../hooks/useAuth"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Button from "../components/Button"
import { Helmet } from "react-helmet-async"

const Login = () => {
	const { signInUser } = useAuth()
	const [showPassword, setShowPassword] = useState(false)

	const { register, handleSubmit } = useForm({
		criteriaMode: "all",
	})

	// navigation system
	const navigate = useNavigate()
	const location = useLocation()
	const navigateFrom = location?.state || "/"

	const onSubmit = (data) => {
		const { email, password } = data

		signInUser(email, password)
			.then((result) => {
				if (result.user) {
					navigate(navigateFrom)
				}
			})
			.catch(() => {
				toast.error("invalid email/password")
			})
	}
	return (
		<>
			<Helmet>
				<title>Voyago || Login</title>
			</Helmet>
			<div className="flex justify-center my-16 bg-[url('register.webp')] bg-cover bg-no-repeat p-12 px-4 sm:px-12 rounded-2xl mx-2 sm:mx-0">
				<div
					className='w-full sm:max-w-md p-8 space-y-3 rounded-xl drop-shadow-xl h-full bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100
'>
					<h1 className='text-2xl font-bold text-center'>Login</h1>
					<form action='' className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
						<div className='space-y-1 text-sm'>
							<label htmlFor='email' className='block text-[#FFFFFF9E]'>
								Email
							</label>
							<input
								{...register("email")}
								type='email'
								name='email'
								id='email'
								placeholder='Email'
								className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none'
							/>
						</div>
						<div className='space-y-1 text-sm relative'>
							<label htmlFor='password' className='block text-[#FFFFFF9E]'>
								Password
							</label>
							<input
								required
								{...register("password")}
								type={showPassword ? "text" : "password"}
								name='password'
								id='password'
								placeholder='Password'
								className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none'
							/>
							<span className='absolute bottom-8 right-4 cursor-pointer text-gray-900' onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</span>
							<div className='flex justify-end text-xs text-[#FFFFFF9E]'>Forgot Password ?</div>
						</div>
						<Button className='block w-full p-3 text-center text-white bg-transparent border-solid border-[1px] border-[#FFFFFF45] hover:bg-[#FFFFFF45] transition-all duration-500 rounded-md'>
							Login
						</Button>
					</form>
					<div className='flex items-center pt-4 space-x-1'>
						<div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
						<p className='px-3 text-sm text-[#FFFFFF9E]'>Login with social accounts</p>
						<div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
					</div>
					<SocialLogin />
					<p className='text-xs text-center sm:px-6 text-[#FFFFFF9E]'>
						Don't have an account?
						<Link to='/register' rel='noopener noreferrer' className='ml-1 underline text-white'>
							Register
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}

export default Login