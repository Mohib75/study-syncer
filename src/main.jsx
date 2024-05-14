import React from "react"
import ReactDOM from "react-dom/client"

import "./index.css"
import { HelmetProvider } from "react-helmet-async"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/Routes.jsx"
import { Toaster } from "react-hot-toast"
import FirebaseProvider from "./firebaseProvider/FirebaseProvider.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<FirebaseProvider>
			<HelmetProvider>
				<RouterProvider router={router} />
				<Toaster />
			</HelmetProvider>
		</FirebaseProvider>
	</React.StrictMode>
)
