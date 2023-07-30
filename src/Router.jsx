import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navigation from "./components/Navigation";
import TopBar from "./components/TopBar";

export default function Router() {
	return (
		<>
			<Navigation />
			<TopBar />
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</>
	);
}
