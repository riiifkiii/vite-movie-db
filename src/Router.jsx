import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navigation from "./components/Navigation";
import TopBar from "./components/TopBar";
import MoviePages from "./pages/movie/MoviePages";
import AiringToday from "./pages/tv/AiringToday";
import Detail from "./pages/movie/Detail";

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
					<Route path=":id" element={<Detail />} />
				</Route>
				<Route path="/tv">
					<Route index element={<AiringToday />} />
					<Route path="airing-today" element={<AiringToday />} />
					<Route path="popular" element={<AiringToday />} />
					<Route path="on-the-air" element={<AiringToday />} />
					<Route path="top-rated-today" element={<AiringToday />} />
				</Route>
				<Route path="/genre">
					<Route path=":id" element={<MoviePages />} />
				</Route>
			</Routes>
		</>
	);
}
