import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import CreateAssignment from "../pages/CreateAssignment"
import PrivateRoute from "../components/privateRoute/PrivateRoute"
import Assignments from "../pages/Assignments"
import AssignmentDetail from "../pages/AssignmentDetail"
import TakeAssignment from "../pages/TakeAssignment"
import UpdateAssignment from "../pages/UpdateAssignment"
import MySubmittedAssignment from "../pages/MySubmittedAssignment"
import PendingAssignment from "../pages/PendingAssignment"
import GiveMark from "../pages/GiveMark"
import ErrorPage from "../components/ErrorPage"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
				loader: () => fetch("https://study-syncer-server.vercel.app/assignment"),
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/createAssignment",
				element: (
					<PrivateRoute>
						<CreateAssignment />
					</PrivateRoute>
				),
			},
			{
				path: "/assignment",
				element: <Assignments />,
				loader: () => fetch("https://study-syncer-server.vercel.app/assignment"),
			},
			{
				path: "/assignment/:id",
				element: (
					<PrivateRoute>
						<AssignmentDetail />
					</PrivateRoute>
				),
				loader: ({ params }) => fetch(`https://study-syncer-server.vercel.app/assignment/${params.id}`),
			},
			{
				path: "/takeAssignment/:id",
				element: (
					<PrivateRoute>
						<TakeAssignment />
					</PrivateRoute>
				),
				loader: ({ params }) => fetch(`https://study-syncer-server.vercel.app/assignment/${params.id}`),
			},
			{
				path: "/updateAssignment/:id",
				element: (
					<PrivateRoute>
						<UpdateAssignment />
					</PrivateRoute>
				),
				loader: ({ params }) => fetch(`https://study-syncer-server.vercel.app/assignment/${params.id}`),
			},
			{
				path: "/mySubmittedAssignment",
				element: (
					<PrivateRoute>
						<MySubmittedAssignment />
					</PrivateRoute>
				),
			},
			{
				path: "/pendingAssignment",
				element: (
					<PrivateRoute>
						<PendingAssignment />
					</PrivateRoute>
				),
				loader: () => fetch("https://study-syncer-server.vercel.app/submittedAssignment"),
			},
			{
				path: "/giveMark/:id",
				element: (
					<PrivateRoute>
						<GiveMark />
					</PrivateRoute>
				),
				loader: ({ params }) => fetch(`https://study-syncer-server.vercel.app/submittedAssignment/${params.id}`),
			},
			// {
			// 	path: "/myList",
			// 	element: (
			// 		<PrivateRoute>
			// 			<MyList />
			// 		</PrivateRoute>
			// 	),
			// },
			// {
			// 	path: "/touristsSpotUpdate/:id",
			// 	element: (
			// 		<PrivateRoute>
			// 			<TouristsSpotUpdate />
			// 		</PrivateRoute>
			// 	),
			// 	loader: ({ params }) => fetch(`https://studysyncer-tourism-server.vercel.app/touristsSpot/${params.id}`),
			// },
			// {
			// 	path: "/addCountry",
			// 	element: (
			// 		<PrivateRoute>
			// 			<AddCountry />
			// 		</PrivateRoute>
			// 	),
			// },
			// {
			// 	path: "/country/:id",
			// 	element: (
			// 		<PrivateRoute>
			// 			<CountryTouristsSpot />
			// 		</PrivateRoute>
			// 	),
			// 	loader: () => fetch("https://studysyncer-tourism-server.vercel.app/country"),
			// },
		],
	},
])
