// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

import "../styles/checkoutForm.css"
import Button from "./Button"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { ImSpinner } from "react-icons/im"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const CheckoutForm = ({ handleSubmit, course }) => {
	const stripe = useStripe()
	const elements = useElements()
	const [clientSecret, setClientSecret] = useState()
	const [cardError, setCardError] = useState("")
	const [processing, setProcessing] = useState(false)
	const { user } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (course?.price && course?.price > 1) {
			fetch("https://study-syncer-server.vercel.app/create-payment-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ price: course?.price }),
			})
				.then((res) => res.json())
				.then((data) => {
					setClientSecret(data.clientSecret)
					console.log(data.clientSecret)
				})
		}
	}, [course?.price])

	// const getClientSecret = async (price) => {
	// 	const { data } = await axios.post("https://study-syncer-server.vercel.app/create-payment-intent", { withCredentials: true }, price)
	// 	console.log("client secret from server ----->", data)
	// 	setClientSecret(data.clientSecret)
	// }

	const handlePaymentSubmit = async (event) => {
		// Block native form submission.
		event.preventDefault()
		setProcessing(true)

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return
		}

		// Get a reference to a mounted CardElement. Elements knows how
		// to find your CardElement because there can only ever be one of
		// each type of element.
		const card = elements.getElement(CardElement)

		if (card == null) {
			return
		}

		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		})

		if (error) {
			console.log("[error]", error)
			setCardError(error.message)
			setProcessing(false)
		} else {
			console.log("[PaymentMethod]", paymentMethod)
			setCardError("")
		}

		// confirm Payment
		const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: card,
				billing_details: {
					email: user?.email,
					name: user?.displayName,
				},
			},
		})

		if (confirmError) {
			console.log(confirmError)
			setCardError(confirmError.message)
			setProcessing(false)
		}

		if (paymentIntent.status === "succeeded") {
			console.log(paymentIntent)
			// create payment info object
			const paymentInfo = {
				...course,
				courseId: course._id,
				transactionId: paymentIntent.id,
				date: new Date(),
				status: paymentIntent.status,
				name: user?.displayName,
				email: user?.email,
			}

			delete paymentInfo._id
			console.log(paymentInfo)

			// try(save payment info in enrolled course collection (db))
			try {
				await fetch("https://study-syncer-server.vercel.app/enrolledCourses", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(paymentInfo),
				})
				// .then((res) => res.json())
				// .then((data) => {
				// 	setClientSecret(data.clientSecret)
				// 	console.log(data)
				// })

				toast.success("Course Taken Successfully")
				navigate("/myCourses")
			} catch (err) {
				console.log(err)
			}
		}

		setProcessing(false)
	}

	return (
		<>
			<form onSubmit={handlePaymentSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#424770",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/>

				<div className='modal-action justify-around'>
					<Button
						disabled={!stripe | !clientSecret || processing}
						type='submit'
						className='text-[#2B2938] hover:scale-105 transition-all duration-500 font-bold bg-[#AFACBE] hover:bg-[#AFACBE] btn rounded-lg border-none drop-shadow-xl'>
						{processing ? <ImSpinner className='animate-spin m-auto' size={24} /> : `{Pay ${course?.price}}`}
					</Button>

					<form method='dialog'>
						{/* if there is a button in form, it will close the modal */}
						<Button className='text-[#2B2938] hover:scale-105 transition-all duration-500 font-bold bg-[#AFACBE] hover:bg-[#AFACBE] btn rounded-lg border-none drop-shadow-xl'>
							No
						</Button>
					</form>
				</div>
			</form>

			{cardError && <p className='text-red-600 nl-8'>{cardError}</p>}
		</>
	)
}

export default CheckoutForm
