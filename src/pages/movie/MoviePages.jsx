/* eslint-disable no-case-declarations */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
	getNowPlayingFetch,
	getPopularFetch,
	getTrendingFetch,
	getUpcomingFetch,
} from "../../utility/fetching";
import Slider from "../../components/Slider";
import Poster from "../../components/Poster";
import Button from "../../components/Button";

export default function MoviePages() {
	const { pathname } = useLocation();
	const pages = pathname.split("/").slice(2).join("");
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const getData = async () => {
			try {
				switch (pages) {
					case "trending":
						const dataTrending = await getTrendingFetch("movie", "day", page);
						setData(dataTrending);
						document.title = "Treinding Movies";
						break;
					case "now-playing":
						const dataNowPlaying = await getNowPlayingFetch(page);
						setData(dataNowPlaying);
						document.title = "Now Playing Movies";
						break;
					case "popular":
						const dataPopular = await getPopularFetch("movie", page);
						setData(dataPopular);
						document.title = "Popular Movies";
						break;
					default:
						const dataUpcoming = await getUpcomingFetch(page);
						setData(dataUpcoming);
						document.title = "Upcoming Movies";
						break;
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		getData();
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [pages, page]);

	useEffect(() => {
		setPage(1);
	}, [pages]);

	if (isLoading) return "Loading";

	console.log(data);

	return (
		<section>
			<Slider data={data.results} limit={1} rewind={false} />
			<div className="m-2 bg-white p-2">
				<div className="grid grid-cols-5 justify-center gap-2">
					{data.results.slice(1, 20).map((item) => {
						return <Poster key={item.id} data={item} />;
					})}
				</div>
				<div className="mt-5 flex items-center justify-center gap-3">
					<Button
						className={
							"rounded bg-slate-800 px-3 py-1 text-slate-50 disabled:bg-slate-500"
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
					<span>
						{data.page}/{data.total_pages > 100 ? "100" : data.total_pages}
					</span>
					<Button
						className={
							"rounded bg-slate-800 px-3 py-1 text-slate-50 disabled:bg-slate-500"
						}
						onClick={() => {
							setPage(page + 1);
							window.scrollTo({
								top: 0,
								behavior: "smooth",
							});
						}}
						disabled={
							page == (data.total_pages > 100 ? 100 : data.total_pages)
								? true
								: false
						}
					>
						Next
					</Button>
				</div>
			</div>
		</section>
	);
}
