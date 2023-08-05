import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navigation from "./components/Navigation";
import TopBar from "./components/TopBar";
import MoviePages from "./pages/movie/MoviePages";
import TvPages from "./pages/tv/TvPages";
import DetailMovie from "./pages/movie/DetailMovie";
import DetailTv from "./pages/tv/DetailTv";
import DetailSeason from "./pages/tv/DetailSeason";

export default function Router() {
	return (
		<>
			<Navigation />
			<TopBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/movie">
					<Route path="trending" element={<MoviePages />} />
					<Route path="upcoming" element={<MoviePages />} />
					<Route path="popular" element={<MoviePages />} />
					<Route path="now-playing" element={<MoviePages />} />
					<Route path=":id" element={<DetailMovie />} />
				</Route>
				<Route path="/tv">
					<Route index element={<TvPages />} />
					<Route path="airing-today" element={<TvPages />} />
					<Route path="popular" element={<TvPages />} />
					<Route path="on-the-air" element={<TvPages />} />
					{/* <Route path="top-rated-today" element={<TvPages />} /> */}
					<Route path=":id">
						<Route index element={<DetailTv />} />
						<Route path="season/:seasonId" element={<DetailSeason />} />
					</Route>
				</Route>
				<Route path="/genre">
					<Route path=":id" element={<MoviePages />} />
				</Route>
			</Routes>
		</>
	);
}
