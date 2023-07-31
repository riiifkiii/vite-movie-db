import { useParams } from "react-router-dom";

export default function AiringToday() {
	const id = useParams();
	console.log(id);

	return (
		<section>
			<h1>Airing Today</h1>
		</section>
	);
}
