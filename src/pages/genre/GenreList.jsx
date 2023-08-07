/* eslint-disable no-case-declarations */
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMovieOrTvByGenre } from "../../utility/fetching";
import Slider from "../../components/Slider";
import Poster from "../../components/Poster";
import Button from "../../components/Button";

export default function GenreList() {
	const { id } = useParams();
	const { state } = useLocation();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [sort, setSort] = useState("all");
	const [page, setPage] = useState(1);

	useEffect(() => {
		const getData = async () => {
			try {
				switch (sort) {
					case "movie":
						const justMovie = await getMovieOrTvByGenre("movie", id, page);
						setData(justMovie.results);
						break;
					case "tv":
						const justTv = await getMovieOrTvByGenre("tv", id, page);
						setData(justTv.results);
						break;
					default:
						const dataAll = [];
						const dataMovie = await getMovieOrTvByGenre("movie", id, page);
						dataMovie.results.map((item) => {
							item.dateToSort = item.release_date;
							dataAll.push(item);
						});
						const dataTv = await getMovieOrTvByGenre("tv", id, page);
						dataTv.results.map((item) => {
							item.dateToSort = item.first_air_date;
							dataAll.push(item);
						});
						setData(
							dataAll.sort((a, b) =>
								a.dateToSort < b.dateToSort
									? 1
									: a.dateToSort > b.dateToSort
									? -1
									: 0,
							),
						);
						break;
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getData();
	}, [id, sort, page]);

	if (isLoading) return "Loading ...";

	document.title = "Genre: " + state.name;

	console.log(state.name);

	return (
		<section>
			<Slider data={data} limit={1} />
			<div className="m-2 border border-slate-200 bg-white p-2">
				<div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-2">
					<div className="font-bold">
						<h1>Genre</h1>
					</div>
					<ul className="flex items-center gap-2" id="sorting">
						<li>
							<Button
								className={
									"active rounded bg-slate-800 px-2 py-1 text-xs text-slate-50"
								}
								onClick={() => {
									setSort("All");
								}}
							>
								All
							</Button>
						</li>
						<li>
							<Button
								className={
									"rounded bg-slate-800 px-2 py-1 text-xs text-slate-50"
								}
								onClick={() => {
									setSort("movie");
								}}
							>
								Movie
							</Button>
						</li>
						<li>
							<Button
								className={
									"rounded bg-slate-800 px-2 py-1 text-xs text-slate-50"
								}
								onClick={() => {
									setSort("tv");
								}}
							>
								TV
							</Button>
						</li>
					</ul>
				</div>
				<div className="grid grid-cols-5 gap-2">
					{data.map((item, index) => {
						return <Poster data={item} key={index} />;
					})}
				</div>
				<div className="mt-3 flex items-center justify-center gap-2">
					<Button
						className={
							"rounded bg-slate-800 px-2 py-1 text-slate-50 disabled:bg-slate-500"
						}
						onClick={() => {
							setPage(page - 1);
							window.scrollTo({
								top: 0,
								behavior: "smooth",
							});
						}}
						disabled={page == 1 ? true : false}
					>
						Prev
					</Button>
					<span>{page}/100</span>
					<Button
						className={"rounded bg-slate-800 px-2 py-1 text-slate-50"}
						onClick={() => {
							setPage(page + 1);
							window.scrollTo({
								top: 0,
								behavior: "smooth",
							});
						}}
						disabled={page == 100 ? true : false}
					>
						Next
					</Button>
				</div>
			</div>
		</section>
	);
}
