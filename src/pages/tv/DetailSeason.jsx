import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
	// getSeasonCreditsFetch,
	getSeasonDetailFetch,
} from "../../utility/fetching";
import Slider from "../../components/Slider";
import { BsCollectionPlay, BsClock, BsStar, BsCalendar2 } from "react-icons/bs";

import ButtonUp from "../../components/ButtonUp";

export default function DetailSeason() {
	const { id, seasonId } = useParams();
	const { state } = useLocation();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState([]);
	// const [images, setImages] = useState(true);
	// const [credits, setCredits] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const dataSeason = await getSeasonDetailFetch(id, seasonId);
				// const dataImgaes = await getSeasonImagesFetch(id, seasonId);
				// const dataCredit = await getSeasonCreditsFetch(id, seasonId);
				// setCredits(dataCredit);
				// setImages(dataImgaes);
				setData(dataSeason);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getData();
	}, [id, seasonId]);

	if (isLoading) return "Loading ...";

	document.title = state.title + " : Season " + seasonId;

	console.log(data);

	return (
		<section className="relative">
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
							src={
								data.poster_path
									? `http://image.tmdb.org/t/p/w342${data.poster_path}`
									: "http://image.dummyjson.com/50x80?text=404"
							}
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
						<h1>
							{state.title} : Season {seasonId}
						</h1>
					</div>
					<div className="mt-2 border border-slate-200 bg-white p-2">
						<div className="font-bold">
							<h2>Season Details</h2>
						</div>
						<table className=" mt-2">
							<tbody>
								<tr>
									<td>Total Episode</td>
									<td>{data.episodes.length} episode</td>
								</tr>
								<tr>
									<td>Airing Date</td>
									<td>{data.air_date}</td>
								</tr>
								<tr>
									<td>Overview</td>
									<td>{data.overview ? data.overview : "-"}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="mt-2 border border-slate-200 bg-white p-2">
						<div className="mb-2 font-bold">
							<h2>List Episode</h2>
						</div>
						<div className="grid grid-cols-3 gap-1">
							{data.episodes.map((item) => {
								return (
									<div key={item.id} className="border border-slate-200">
										<picture>
											<img
												src={
													item.still_path
														? `http://image.tmdb.org/t/p/original${item.still_path}`
														: "http://image.dummyjson.com/300x200?text=Not+Found"
												}
												alt={item.name}
												className="object-cover"
											/>
										</picture>
										<div className="p-2">
											<div className="border-b border-slate-200 pb-2">
												<div className="font-bold">
													<h3>{item.name}</h3>
												</div>
												<div className="flex items-center gap-2 text-xs font-light text-slate-500">
													<span className="flex items-center gap-1">
														<BsCollectionPlay /> {item.episode_number}
													</span>
													|
													<span className="flex items-center gap-1">
														<BsClock />
														{item.runtime} min
													</span>
													|
													<span className="flex items-center gap-1">
														<BsStar />
														{String(item.vote_average).substring(0, 3)}
													</span>
													|
													<span className="flex items-center gap-1">
														<BsCalendar2 />
														{item.air_date}
													</span>
												</div>
											</div>
										</div>
										<div className="mb-2 px-2 text-sm">
											<p>{item.overview}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</main>

			<ButtonUp />
		</section>
	);
}
