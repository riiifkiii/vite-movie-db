import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navigation from "./components/Navigation";

export default function Router() {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</>
	);
}
