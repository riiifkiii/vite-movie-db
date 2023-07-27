import { useEffect } from "react";
import { getTrendingFetch } from "../../utility/fetching";

export default function Home() {
	useEffect(() => {
		const getTrending = async () => {
			try {
				const data = await getTrendingFetch("movie", "day");
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};

		getTrending();
	}, []);

	return (
		<>
			<section>{/* <h1>Home</h1> */}</section>
		</>
	);
}
