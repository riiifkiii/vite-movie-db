import { useEffect, useState } from "react";
import {
	getPopularFetch,
	getTrendingFetch,
	getUpcomingFetch,
} from "../../utility/fetching";
import Slider from "../../components/Slider";
import Card from "../../components/Card";

export default function Home() {
	const [trendings, setTrendings] = useState([]);
	const [upcomings, setUpcomings] = useState([]);
	const [popularPerson, setPopularPerson] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getData = async () => {
			try {
				const dataTrendings = await getTrendingFetch("movie", "day");
				const dataUpcoming = await getUpcomingFetch();
				const dataPopularPerson = await getPopularFetch("person");
				setTrendings(dataTrendings);
				setUpcomings(dataUpcoming);
				setPopularPerson(dataPopularPerson);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getData();
	}, []);

	if (isLoading) return "Loading...";

	console.log(trendings, upcomings, popularPerson);

	return (
		<>
			<section>
				<main>
					<Slider
						data={trendings.results}
						limit={10}
						className={"h-[500px] w-full object-cover object-top"}
					/>
					<div className="m-2 border border-slate-200 bg-white p-2 shadow">
						<div className="mb-2">
							<h1 className="font-bold">Upcoming Movies</h1>
						</div>
						<div className=" custom-scrollbar overflow-x-scroll pb-1">
							<div className="flex w-fit items-start gap-2">
								{upcomings.results.slice(0, 10).map((item) => {
									return (
										<Card key={item.id} data={item} className={`w-[400px]`} />
									);
								})}
							</div>
						</div>
					</div>
				</main>
			</section>
		</>
	);
}
