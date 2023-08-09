import pt from "prop-types";
import { BiSolidStar } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Poster({ data, className, type = true }) {
	return (
		<Link
			to={`/${data.media_type}/${data.id}`}
			className={"relative " + className}
			title={data.title}
		>
			<picture>
				<img
					src={
						data.poster_path
							? `http://image.tmdb.org/t/p/w342${data.poster_path}`
							: `http://image.dummyjson.com/200x300?text=404`
					}
					alt={data.title}
					className="h-full w-full object-cover"
				/>
			</picture>
			<span className="absolute -top-1 right-1 flex flex-col items-center justify-center bg-red-600 px-2 py-3 text-sm text-slate-50">
				<BiSolidStar />
				{String(data.vote_average).substring(0, 3)}
			</span>
			{type ? (
				<span className="absolute bottom-1 left-1 bg-red-600 px-2 py-1 text-xs capitalize text-slate-50">
					{data.media_type}
				</span>
			) : (
				""
			)}
		</Link>
	);
}

Poster.propTypes = {
	data: pt.object,
	className: pt.string,
	type: pt.bool,
};
