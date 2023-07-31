import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navigation from "./components/Navigation";
import TopBar from "./components/TopBar";
import Trending from "./pages/movie/Trending";
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
					<Route path="trending" element={<Trending />} />
					<Route path="upcoming" element={<Trending />} />
					<Route path="popular" element={<Trending />} />
					<Route path="now-playing" element={<Trending />} />
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
					<Route path=":id" element={<Trending />} />
				</Route>
			</Routes>
		</>
	);
}
