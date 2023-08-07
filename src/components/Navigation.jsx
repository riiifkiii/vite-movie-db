import { NavLink } from "react-router-dom";
import {
	BiHome,
	BiMoviePlay,
	BiChalkboard,
	BiPurchaseTag,
	BiRightArrowAlt,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import { getGenresFetch } from "../utility/fetching";
// import { LuLayoutDashboard } from "react-icons/lu";

export default function Navigation() {
	const [genres, setGenres] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getGenre = async () => {
			try {
				const genreMovies = await getGenresFetch("movie");
				const genreTvs = await getGenresFetch("tv");
				const sameGenre = genreTvs.genres;
				genreMovies.genres.map((genreMovie) => {
					if (
						!genreTvs.genres.some((genreTv) => genreMovie.id === genreTv.id)
					) {
						sameGenre.push(genreMovie);
					}
				});
				setGenres(sameGenre);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		getGenre();
	}, []);

	if (isLoading) return "Loading...";

	// console.log(genres);

	return (
		<nav className="fixed left-0 top-0 z-50 h-screen overflow-hidden border-r border-slate-200 bg-white p-3 lg:w-[300px]">
			<div
				className={
					"flex h-[60px] items-center justify-center gap-2 text-2xl font-bold"
				}
			>
				<h1>Movies Database</h1>
			</div>
			<ul className="flex flex-col gap-1">
				<li>
					<NavLink
						to={"/"}
						className={({ isActive }) =>
							(isActive ? "bg-slate-200" : "") + " flex items-center gap-2"
						}
					>
						<BiHome />
						<span>Home</span>
					</NavLink>
				</li>
				<li className="group">
					<NavLink
						to={"/movie"}
						className={({ isActive }) =>
							(isActive ? "bg-slate-200" : "") +
							" pointer-events-none flex items-center gap-2 px-1 py-2 hover:bg-slate-200"
						}
					>
						<BiMoviePlay />
						<span>Movies</span>
						<BiRightArrowAlt className="ml-auto transition-all duration-300 group-hover:rotate-90" />
					</NavLink>
					<ul className="ml-6 h-0 overflow-hidden transition-all duration-300 group-hover:h-[160px]">
						<li>
							<NavLink
								to={"/movie/trending"}
								className={({ isActive }) => (isActive ? "bg-slate-200" : "")}
							>
								Trending
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/movie/upcoming"}
								className={({ isActive }) => (isActive ? "bg-slate-200" : "")}
							>
								Upcoming
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/movie/popular"}
								className={({ isActive }) => (isActive ? "bg-slate-200" : "")}
							>
								Popular
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/movie/now-playing"}
								className={({ isActive }) => (isActive ? "bg-slate-200" : "")}
							>
								Now Playing
							</NavLink>
						</li>
					</ul>
				</li>
				<li className="group">
					<NavLink
						to={"/tv"}
						className={({ isActive }) =>
							(isActive ? "bg-slate-200" : "") +
							" pointer-events-none flex items-center gap-2 px-1 py-2 hover:bg-slate-200"
						}
					>
						<BiChalkboard />
						<span>TV Series</span>
						<BiRightArrowAlt className="ml-auto transition-all duration-300 group-hover:rotate-90" />
					</NavLink>
					<ul className="ml-6 h-0 overflow-hidden transition-all duration-300 group-hover:h-[120px]">
						<li>
							<NavLink
								to={"/tv/airing-today"}
								className={({ isActive }) => (isActive ? "bg-slate-200" : "")}
							>
								Airing Today
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/tv/on-the-air"}
								className={({ isActive }) => (isActive ? "bg-slate-200" : "")}
							>
								On The Air
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/tv/popular"}
								className={({ isActive }) => (isActive ? "bg-slate-200" : "")}
							>
								Popular
							</NavLink>
						</li>
						{/* <li>
							<NavLink
								to={"/tv/top-rated-today"}
								className={({ isActive }) => (isActive ? "bg-slate-200" : "")}
							>
								Top Rated Today
							</NavLink>
						</li> */}
					</ul>
				</li>
				<li className="group">
					<NavLink
						to={"/genre"}
						className={({ isActive }) =>
							(isActive ? "bg-slate-200" : "") +
							" pointer-events-none flex items-center gap-2 px-1 py-2 hover:bg-slate-200"
						}
					>
						<BiPurchaseTag />
						<span>Genres</span>
						<BiRightArrowAlt className="ml-auto transition-all duration-300 group-hover:rotate-90" />
					</NavLink>
					<ul className="custom-scrollbar ml-6 h-0 overflow-hidden transition-all duration-300 group-hover:h-[280px] group-hover:overflow-y-scroll">
						{genres
							.sort((a, b) => {
								if (a.name.toLowerCase() < b.name.toLowerCase()) {
									return -1;
								}
								if (a.name.toLowerCase() > b.name.toLowerCase()) {
									return 1;
								}
								return 0;
							})
							.map((genre) => {
								return (
									<li key={genre.id}>
										<NavLink
											to={`/genre/${genre.id}`}
											className={({ isActive }) =>
												isActive ? "bg-slate-200" : ""
											}
											state={{ name: genre.name }}
										>
											{genre.name}
										</NavLink>
									</li>
								);
							})}
					</ul>
				</li>
			</ul>
		</nav>
	);
}
