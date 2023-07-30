import { useEffect, useState } from "react";
import {
	getAiringTodayFetch,
	getPopularFetch,
	getTrendingFetch,
	getUpcomingFetch,
} from "../../utility/fetching";
import Slider from "../../components/Slider";
import List from "../../components/List";

export default function Home() {
	const [trendings, setTrendings] = useState([]);
	const [upcomings, setUpcomings] = useState([]);
	const [tvShowAiringToday, setTvShowAiringToday] = useState([]);
	const [popularPerson, setPopularPerson] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getData = async () => {
			try {
				const dataTrendings = await getTrendingFetch("movie", "day");
				const dataUpcoming = await getUpcomingFetch();
				const dataPopularPerson = await getPopularFetch("person");
				const dataTvShowAiringToday = await getAiringTodayFetch();
				setTrendings(dataTrendings);
				setUpcomings(dataUpcoming);
				setPopularPerson(dataPopularPerson);
				setTvShowAiringToday(dataTvShowAiringToday);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getData();
	}, []);

	if (isLoading) return "Loading...";

	console.log(tvShowAiringToday, popularPerson);

	return (
		<>
			<section>
				<main>
					<Slider
						data={trendings.results}
						limit={10}
						className={"h-[500px] w-full object-cover object-top"}
					/>
					<List
						data={upcomings.results}
						title={"Upcomming Movies"}
						className={"m-2"}
						limit={10}
					/>
					<List
						data={tvShowAiringToday.results}
						title={"Tv Shows Airing Today"}
						limit={10}
						className={"m-2"}
					/>
				</main>
			</section>
		</>
	);
}
