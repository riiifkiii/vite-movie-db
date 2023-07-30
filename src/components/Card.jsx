import pt from "prop-types";
import { BiSolidStar } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Card({ data, className }) {
	return (
		<Link
			to={`${data.media_type}/${data.id}`}
			id="card"
			className={
				`group relative min-w-[300px] overflow-hidden border border-slate-200 ` +
				className
			}
		>
			<span className="absolute -right-9 top-2 flex rotate-45 items-center justify-center gap-1 bg-red-600 px-10 py-1 text-xs font-bold text-white">
				<BiSolidStar />
				{data.vote_average}
			</span>
			<div>
				<picture>
					<img
						src={`http://image.tmdb.org/t/p/w780${data.backdrop_path}`}
						alt={data.title}
						className="h-full w-full object-cover"
					/>
				</picture>
			</div>
			<div
				className="absolute bottom-1 left-1 h-10 max-w-[250px] overflow-hidden bg-white p-1 leading-3 transition-all duration-300 group-hover:-translate-y-1"
				title={data.title}
			>
				<h1 className="whitespace-nowrap text-xs font-bold">
					{data.title.length > 30
						? String(data.title).substring(0, 30) + "..."
						: data.title}
				</h1>
				<span className="text-[8px] font-light">
					{String(data.release_date).substring(0, 4)}
				</span>
			</div>
		</Link>
	);
}

Card.propTypes = {
	className: pt.string,
	data: pt.object,
};
