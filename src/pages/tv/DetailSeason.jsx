import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
	getSeasonCreditsFetch,
	getSeasonDetailFetch,
	getSeasonImagesFetch,
} from "../../utility/fetching";
import Slider from "../../components/Slider";

export default function DetailSeason() {
	const { id, seasonId } = useParams();
	const params = useParams();
	const { state } = useLocation();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState([]);
	// const [images, setImages] = useState(true);
	const [credits, setCredits] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const dataSeason = await getSeasonDetailFetch(id, seasonId);
				// const dataImgaes = await getSeasonImagesFetch(id, seasonId);
				const dataCredit = await getSeasonCreditsFetch(id, seasonId);
				setCredits(dataCredit);
				// setImages(dataImgaes);
				setData(dataSeason);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getData();
	}, []);

	if (isLoading) return "Loading ...";

	console.log(state.images, state.title);

	return (
		<section>
			<Slider
				data={state.images.backdrops.length > 0 ? state.images.backdrops : [1]}
				limit={10}
				card={false}
				pauseOnHover={false}
				className={"h-[500px] w-full object-cover object-top"}
			/>
			<main className="relative -top-[150px] flex items-start gap-2 p-2">
				<div className="w-[20%] border border-slate-200 bg-white p-2">
					<picture>
						<img
							src={`http://image.tmdb.org/t/p/w342${data.poster_path}`}
							alt={data.title}
							className="h-full w-full object-cover"
						/>
					</picture>
					<div className="m-auto mt-2 w-fit rounded text-center">
						{/* <div className="flex h-full w-full items-center justify-center bg-slate-800 p-2 text-slate-50">
							<BiSolidStar />
						</div> */}
						<div className=" p-2">
							<h2>
								<span className="text-xl font-bold">
									{String(data.vote_average).substring(0, 3)}
								</span>
								<span className="text-xs">/10</span>
							</h2>
						</div>
					</div>
				</div>
				<div className="w-[80%]">
					<div className="bg-white p-2 text-xl font-bold">
						<h1>{state.title}</h1>
					</div>
				</div>
			</main>
		</section>
	);
}
