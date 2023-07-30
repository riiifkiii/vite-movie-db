import pt from "prop-types";
import { BiSolidStar } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Card({ data, className }) {
	return (
		<Link
			to={`${data.media_type}/${data.id}`}
			id="card"
			className={
				`group relative aspect-video w-[360px] min-w-[300px] border border-slate-200 ` +
				className
			}
		>
			<span className="absolute -top-2 right-2 z-40 flex flex-col items-center justify-center gap-1 bg-red-600 px-2 py-3 text-xs font-bold text-white">
				<BiSolidStar />
				{data.vote_average}
			</span>
			<div>
				<picture>
					<img
						src={
							data.backdrop_path
								? `http://image.tmdb.org/t/p/w780${data.backdrop_path}`
								: "https://image.dummyjson.com/360x203?type=webp"
						}
						alt={data.title}
						className="h-full w-full object-cover"
					/>
				</picture>
			</div>
			<div
				className="absolute bottom-1 left-1  max-w-[250px] overflow-hidden bg-white p-1 leading-3 transition-all duration-300 group-hover:-translate-y-1"
				title={data.title}
			>
				<h1 className="whitespace-nowrap text-xs font-bold">
					{data.title.length > 30
						? String(data.title).substring(0, 30) + "..."
						: data.title}
				</h1>
				{data.release_date ? (
					<span className="text-[8px] font-light">
						{String(data.release_date).substring(0, 4)}
					</span>
				) : (
					""
				)}
			</div>
		</Link>
	);
}

Card.propTypes = {
	className: pt.string,
	data: pt.object,
};
