/* eslint-disable react/no-unknown-property */
import { BiLogoGithub, BiLogoInstagram, BiLogoLinkedin } from "react-icons/bi";
import Button from "./Button";
import { getSearch } from "../utility/fetching";
import { useState } from "react";

export default function TopBar() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const search = async (query) => {
		try {
			const data = await getSearch(query);
			setData(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}

		document.querySelector("input").value.length == 0
			? setIsLoading(true)
			: setIsLoading(false);
	};

	// console.log(data);

	return (
		<div
			id="top-bar"
			className=" fixed left-[300px] top-0 z-50 flex h-[70px] w-[calc(100vw-300px)] items-center justify-between border-b border-slate-200 bg-white px-5"
		>
			<div className="relative">
				<input
					type="search"
					name="search"
					id="search"
					placeholder="Find your movies, tv or person!"
					className="h-10 w-[800px] border border-slate-200 p-2"
					onKeyDown={() => {
						search(document.querySelector("input").value);
					}}
					onClick={() => {
						document.querySelector("input").value.length > 0
							? search(document.querySelector("input").value)
							: "";
					}}
				/>
				{isLoading ? (
					""
				) : (
					<div className="custom-scrollbar absolute left-0 top-14 z-50 h-[300px] w-full overflow-y-scroll border border-slate-200 bg-white p-2 shadow-lg">
						<ul className="flex flex-col gap-1">
							{data.results.map((item, index) => {
								return (
									<li key={index}>
										<Button
											to={`/${item.media_type}/${item.id}`}
											onClick={() => setIsLoading(true)}
											className={
												"flex items-center gap-2 border border-slate-200 transition-all duration-300 hover:shadow-md"
											}
										>
											<div className="">
												<picture>
													<img
														src={
															item.poster_path || item.profile_path
																? `http://image.tmdb.org/t/p/w185${
																		item.poster_path
																			? item.poster_path
																			: item.profile_path
																  }`
																: `http://image.dummyjson.com/50x70?text=404`
														}
														alt={item.title ? item.title : item.name}
														className="w-[50px] object-cover"
													/>
												</picture>
											</div>
											<div className="">
												<h3 className="font-bold">
													{item.title ? item.title : item.name}
												</h3>
												<i className="text-xs font-light capitalize">
													{item.media_type}
												</i>
											</div>
										</Button>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>
			<div className="flex items-center gap-2" id="social-media">
				<Button
					to={"https://www.instagram.com/riiifkiii"}
					rel={`noopener noreferrer`}
					target={"blank"}
				>
					<BiLogoInstagram />
				</Button>
				<Button
					to={"https://linkedin.com/in/riiifkiii"}
					rel={`noopener noreferrer`}
					target={"blank"}
				>
					<BiLogoLinkedin />
				</Button>
				<Button
					to={"https://www.github.com/riiifkiii"}
					rel={`noopener noreferrer`}
					target={"blank"}
				>
					<BiLogoGithub />
				</Button>
			</div>
		</div>
	);
}
