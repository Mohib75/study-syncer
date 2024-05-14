import { createContext, useEffect, useState } from "react"
import auth from "../firebase/firebaseConfig"
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth"
import axios from "axios"

export const AuthContext = createContext(null)

// social auth provider
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const FirebaseProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	// Create User
	const createUser = (email, password) => {
		setLoading(true)
		return createUserWithEmailAndPassword(auth, email, password)
	}

	// update user profile
	const updateUserProfile = (name, image) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: image,
		})
	}

	// sign in user
	const signInUser = (email, password) => {
		setLoading(true)
		return signInWithEmailAndPassword(auth, email, password)
	}

	// google sign in
	const googleSignIn = () => {
		setLoading(true)
		return signInWithPopup(auth, googleProvider)
	}

	// github sign in
	const githubSignIn = () => {
		setLoading(true)
		return signInWithPopup(auth, githubProvider)
	}

	// sign out
	const logout = () => {
		setUser(null)
		signOut(auth)
	}

	// // observer
	// useEffect(() => {
	// 	const unsubscribe = onAuthStateChanged(auth, (user) => {
	// 		if (user) {
	// 			setUser(user)
	// 			setLoading(false)
	// 		}
	// 	})
	// 	return () => unsubscribe()
	// }, [])

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			const userEmail = currentUser?.email || user?.email
			const loggedUser = { email: userEmail }
			setUser(currentUser)
			console.log("current user", currentUser)
			setLoading(false)
			// if user exists then issue a token
			if (currentUser) {
				axios.post("https://study-syncer-server.vercel.app/jwt", loggedUser, { withCredentials: true }).then((res) => {
					console.log("token response", res.data)
				})
			} else {
				axios
					.post("https://study-syncer-server.vercel.app/logout", loggedUser, {
						withCredentials: true,
					})
					.then((res) => {
						console.log(res.data)
					})
			}
		})
		return () => {
			return unsubscribe()
		}
	}, [])

	// set timeout for loading
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setLoading(false)
		}, 5000)

		return () => clearTimeout(timeoutId)
	}, [])

	const allValues = {
		createUser,
		signInUser,
		googleSignIn,
		githubSignIn,
		logout,
		user,
		loading,
		updateUserProfile,
	}
	return <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
}

export default FirebaseProvider
