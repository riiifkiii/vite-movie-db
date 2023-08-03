import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	getCreditsFetch,
	getDetailFetch,
	getImagesFetch,
	getRecommendationsFetch,
	// getReviewsFetch,
	getSimilarFetch,
	getVideosFetch,
} from "../../utility/fetching";
import Slider from "../../components/Slider";
import Button from "../../components/Button";
import List from "../../components/List";

export default function Detail() {
	const { id } = useParams();
	const [detailMovie, setDetailMovie] = useState([]);
	const [imagesMovies, setImagesMovies] = useState([]);
	const [casts, setCasts] = useState([]);
	const [videos, setVideos] = useState([]);
	const [recomendations, setRecomendations] = useState([]);
	const [similar, setSimilar] = useState([]);
	// const [reviews, setReviews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getData = async () => {
			try {
				const dataMovie = await getDetailFetch("movie", id);
				const dataImage = await getImagesFetch("movie", id);
				const dataCast = await getCreditsFetch("movie", id);
				const dataVideo = await getVideosFetch("movie", id);
				const dataRecomendations = await getRecommendationsFetch("movie", id);
				const dataSimilar = await getSimilarFetch("movie", id);
				// const dataReviews = await getReviewsFetch("movie", id);
				setDetailMovie(dataMovie);
				setImagesMovies(dataImage);
				setCasts(dataCast);
				setVideos(dataVideo);
				setRecomendations(dataRecomendations);
				setSimilar(dataSimilar);
				// setReviews(dataReviews);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getData();
	}, [id]);

	if (isLoading) return "Loading ...";

	console.log(imagesMovies.backdrops);

	document.title = detailMovie.title;

	return (
		<section>
			<Slider
				data={imagesMovies.backdrops.length > 0 ? imagesMovies.backdrops : [1]}
				limit={10}
				card={false}
				pauseOnHover={false}
				className={"h-[500px] w-full object-cover object-top"}
			/>
			<main className="relative -top-[150px] flex items-start gap-2 p-2">
				<div className="w-[20%] border border-slate-200 bg-white p-2">
					<picture>
						<img
							src={`http://image.tmdb.org/t/p/w342${detailMovie.poster_path}`}
							alt={detailMovie.title}
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
									{String(detailMovie.vote_average).substring(0, 3)}
								</span>
								<span className="text-xs">/10</span>
							</h2>
						</div>
					</div>
				</div>
				<div className="w-[80%]">
					{/* detail */}
					<div className="border border-slate-200 bg-white p-2">
						<div className="border-b border-slate-200 pb-2">
							<h1 className="text-xl font-bold">{detailMovie.title}</h1>
							<div className="flex items-center gap-1">
								{detailMovie.genres.map((item, index) => {
									return (
										<Button
											key={index}
											to={`/genre/${item.id}`}
											title={item.name}
											className={
												"rounded-full bg-slate-800 px-2 py-1 text-xs font-light text-slate-50 hover:bg-slate-200 hover:text-slate-800"
											}
										>
											{item.name}
										</Button>
									);
								})}
							</div>
						</div>
						<div>
							<div className="py-2 text-lg font-bold">
								<h2>Detail</h2>
							</div>
							<table>
								<tbody>
									<tr>
										<td>Title</td>
										<td>{detailMovie.title}</td>
									</tr>
									<tr>
										<td>Release Date</td>
										<td>{detailMovie.release_date}</td>
									</tr>
									<tr>
										<td>Homepage</td>
										<td>
											{detailMovie.homepage ? (
												<Link
													to={detailMovie.homepage}
													className="font-bold transition-all duration-300 hover:text-slate-500"
												>
													{detailMovie.title}
												</Link>
											) : (
												"-"
											)}
										</td>
									</tr>
									<tr>
										<td>Runtime</td>
										<td>{detailMovie.runtime} min</td>
									</tr>
									<tr>
										<td>Status</td>
										<td>{detailMovie.status}</td>
									</tr>
									<tr>
										<td>Overview</td>
										<td>{detailMovie.overview}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					{/* dtail */}
					{/* video */}
					{videos.length > 0 ? (
						<div className="mt-2 border border-slate-200 bg-white p-2">
							<div className="mb-2 text-lg font-bold">
								<h2>Videos</h2>
							</div>
							<div className="custom-scrollbar overflow-x-scroll">
								<div className="flex w-fit items-center gap-2">
									{videos.slice(0, 10).map((item) => {
										return (
											<>
												<iframe
													key={item.id}
													src={`https://www.youtube.com/embed/${item.key}`}
													title={item.name}
													frameBorder="0"
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
													allowFullScreen
													className="mb-2 block aspect-video w-[360px]"
												/>
											</>
										);
									})}
								</div>
							</div>
						</div>
					) : (
						""
					)}
					{/* video */}
					{/* cast */}
					{casts.cast.length > 0 ? (
						<div className="mt-2 border border-slate-200 bg-white p-2">
							<div className="pb-2 text-lg font-bold">
								<h2>Cast</h2>
							</div>
							<div>
								<div className="grid grid-cols-4 gap-2 xl:grid-cols-5">
									{casts.cast.slice(0, 10).map((item) => {
										return (
											<Link
												key={item.id}
												to={`/person/${item.id}`}
												className="group relative overflow-hidden border border-slate-200"
												rel={"noopener noreferrer"}
											>
												<picture>
													<img
														src={
															item.profile_path
																? `http://image.tmdb.org/t/p/w185${item.profile_path}`
																: "http://image.dummyjson.com/300x400?type=webp"
														}
														alt={item.name}
														className="h-full w-full object-cover"
													/>
												</picture>
												<div className="absolute -left-full bottom-0 w-full bg-white py-1 text-center leading-3 transition-all duration-300 group-hover:left-0">
													<h6 className="text-sm font-bold">
														{item.character}
													</h6>
													<span className="text-xs font-light">
														{item.name}
													</span>
												</div>
											</Link>
										);
									})}
								</div>
							</div>
						</div>
					) : (
						""
					)}
					{/* cast */}
					{/* similar */}
					{similar.results.length > 0 ? (
						<List
							data={similar.results}
							limit={10}
							title={"Similar Movies"}
							className={"mt-2 !shadow-none"}
						/>
					) : (
						""
					)}
					{/* similar */}
					{/* recomendation */}
					{recomendations.results.length > 0 ? (
						<List
							data={recomendations.results}
							limit={10}
							title={"Recommendation Movies"}
							className={"mt-2 !shadow-none"}
						/>
					) : (
						""
					)}
					{/* recomendation */}
				</div>
			</main>
		</section>
	);
}
