// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC_0x0n6wyUL8mrwQM-rWpOjbAKRsYg_PE",
	authDomain: "study-syncer-8735c.firebaseapp.com",
	projectId: "study-syncer-8735c",
	storageBucket: "study-syncer-8735c.appspot.com",
	messagingSenderId: "730438264604",
	appId: "1:730438264604:web:94fb458c4b0b046e527cd9",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

export default auth
