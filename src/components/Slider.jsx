import { Splide, SplideSlide } from "@splidejs/react-splide";
import pt from "prop-types";
import "@splidejs/react-splide/css";
// import "@splidejs/react-splide/css/skyblue";
// import '@splidejs/react-splide/css/sea-green';
import "@splidejs/react-splide/css/core";
import { BiSolidCalendar, BiSolidStar } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Slider({
	data,
	limit,
	className,
	// autoplay,
	rewind = true,
	arrows,
	pagination,
	card = true,
	pauseOnHover = true,
}) {
	return (
		<Splide
			aria-label="My Favorite Images"
			options={{
				rewind: rewind,
				autoplay: true,
				pauseOnHover: pauseOnHover,
				pauseOnFocus: true,
				arrows: arrows,
				pagination: pagination,
				height: 500,
			}}
		>
			{data.slice(0, limit).map((item, index) => (
				<SplideSlide key={index} className="relative">
					<img
						src={
							item.backdrop_path || item.file_path
								? `http://image.tmdb.org/t/p/w1280${
										item.backdrop_path ? item.backdrop_path : item.file_path
								  }`
								: "http://image.dummyjson.com/1000x500/?text=Not+Found"
						}
						alt={data.title}
						className={className}
					/>
					{card ? (
						<Link
							to={`/${item.media_type}/${item.id}`}
							className="absolute bottom-2 left-2 flex h-[190px] w-[450px] items-start gap-2 border border-slate-200 bg-white p-2 transition-all duration-300 hover:-translate-y-1"
						>
							<div className="h-full w-[160px]">
								<picture>
									<img
										src={`http://image.tmdb.org/t/p/w500${item.poster_path}`}
										alt={item.title}
										className="h-full w-full object-cover"
									/>
								</picture>
							</div>
							<div className="w-full">
								<div className=" w-full border-b border-slate-300 pb-2">
									<h1 className="text-lg font-bold">{item.title}</h1>
									<div className="flex items-center gap-2">
										<span className="flex items-center gap-1 text-xs font-light text-slate-500">
											<BiSolidCalendar />
											{String(item.release_date).substring(0, 4)}
										</span>
										<span className="flex items-center gap-1 text-xs font-light text-slate-500">
											<BiSolidStar />
											{String(item.vote_average).substring(0, 3)}
										</span>
									</div>
								</div>
								<div className="py-2">
									<p className="text-justify text-xs">
										{item.overview.length > 250
											? String(item.overview).substring(0, 250) + "..."
											: item.overview}
									</p>
								</div>
							</div>
						</Link>
					) : (
						""
					)}
				</SplideSlide>
			))}
		</Splide>
	);
}

Slider.propTypes = {
	data: pt.any,
	limit: pt.number,
	className: pt.string,
	autoplay: pt.bool,
	arrows: pt.bool,
	pagination: pt.bool,
	card: pt.bool,
	pauseOnHover: pt.bool,
	rewind: pt.bool,
};
