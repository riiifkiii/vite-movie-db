import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getCreditsPerson,
	getDetailFetch,
	getImagesFetch,
} from "../../utility/fetching";
import Button from "../../components/Button";
import Poster from "../../components/Poster";

export default function DetailPerson() {
	const { id } = useParams();
	const [data, setData] = useState([]);
	const [images, setImages] = useState([]);
	const [creditMovie, setCreditMovie] = useState([]);
	const [creditTv, setCreditTv] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await getDetailFetch("person", id);
				const dataImages = await getImagesFetch("person", id);
				const dataCreditMovie = await getCreditsPerson("movie", id);
				const dataCreditTv = await getCreditsPerson("tv", id);
				setImages(dataImages);
				setData(data);
				setCreditMovie(dataCreditMovie);
				setCreditTv(dataCreditTv);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getData();
	}, [id]);

	if (isLoading) return "Loading...";

	document.title = data.name;

	console.log(data, images, creditMovie, creditTv);

	return (
		<section>
			<div className="flex items-start gap-2 p-2">
				<div className="w-[20%] border border-slate-200 bg-white p-2">
					<picture>
						<img
							src={`http://image.tmdb.org/t/p/w342${data.profile_path}`}
							alt={data.name}
							className="h-full w-full object-cover"
						/>
					</picture>
				</div>
				<div className="w-[80%]">
					{/* detail */}
					<div className="border border-slate-200 bg-white p-2">
						<div className="mb-2 text-lg font-bold">
							<h1>Profile Detail</h1>
						</div>
						<table>
							<tbody>
								<tr>
									<td>Name</td>
									<td>{data.name}</td>
								</tr>
								<tr>
									<td>Birthday</td>
									<td>{data.birthday}</td>
								</tr>
								{data.deathday ? (
									<tr>
										<td>Deathday</td>
										<td>{data.deathday}</td>
									</tr>
								) : (
									""
								)}
								<tr>
									<td>Place of Birth</td>
									<td>{data.place_of_birth}</td>
								</tr>
								<tr>
									<td>Homepage</td>
									<td>
										{data.homepage ? (
											<Button
												to={data.homepage}
												target={"_blank"}
												rel={"noopener noreferrer"}
											>
												{data.name}
											</Button>
										) : (
											"-"
										)}
									</td>
								</tr>
								<tr>
									<td>Biography</td>
									<td>{data.biography}</td>
								</tr>
							</tbody>
						</table>
					</div>
					{/* detail */}
					{/* tv */}
					<div className="mt-2 border border-slate-200 bg-white p-2">
						<div className="mb-2 text-lg font-bold">
							<h1>TV Show by {data.name}</h1>
						</div>
						<div className="custom-scrollbar overflow-x-scroll pb-2">
							<div className={`flex w-fit items-center gap-2`}>
								{creditTv.cast.map((item) => {
									return (
										<Poster
											data={item}
											key={item.id}
											className={"aspect-[2/3] h-[250px]"}
											type={false}
										/>
									);
								})}
							</div>
						</div>
					</div>
					{/* tv */}
					{/* movie */}
					<div className="mt-2 border border-slate-200 bg-white p-2">
						<div className="mb-2 text-lg font-bold">
							<h1>Movie by {data.name}</h1>
						</div>
						<div className="custom-scrollbar overflow-x-scroll pb-2">
							<div className={`flex w-fit items-center gap-2`}>
								{creditMovie.cast.map((item) => {
									return (
										<Poster
											data={item}
											key={item.id}
											className={"aspect-[2/3] h-[250px]"}
											type={false}
										/>
									);
								})}
							</div>
						</div>
					</div>
					{/* movie */}
				</div>
			</div>
		</section>
	);
}
