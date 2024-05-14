import { Helmet } from "react-helmet-async"
import Hero from "../components/Hero"
import Feature from "../components/Feature"
import { useLoaderData } from "react-router-dom"
import Faq from "../components/Faq"

const Home = () => {
	const loadedAssignment = useLoaderData()
	return (
		<div className='mt-12 mx-4 xl:mx-0'>
			<Helmet>
				<title>Voyago</title>
			</Helmet>

			<Hero />

			<Feature loadedAssignment={loadedAssignment} />

			<Faq />

			{/* <BestTouristSpot loadedtouristsSpot={loadedtouristsSpot} />

			<WhyChooseUs />

			<Country />

			<VideoHome /> */}
		</div>
	)
}

export default Home
