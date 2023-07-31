const key = import.meta.env.VITE_API_KEY;

export const getTrendingFetch = async (type, time) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getUpcomingFetch = async () => {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
	);
	const responseJson = await response.json();
	responseJson.results.map((media) => {
		media.media_type = "movie";
	});
	return responseJson;
};

export const getNowPlayingFetch = async () => {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getGenresFetch = async (type) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/genre/${type}/list?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getDetailFetch = async (type, id) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/${type}/${id}?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getCreditsFetch = async (type, id) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getImagesFetch = async (type, id) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/${type}/${id}/images?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getRecommendationsFetch = async (type, id) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getReviewsFetch = async (type, id) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getSimilarFetch = async (type, id) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getVideosFetch = async (type, id) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson.results.filter(
		(item) => item.type === "Teaser" || item.type === "Trailer",
	);
};

export const getPopularFetch = async (type) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/${type}/popular?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getLatestFetch = async (type) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/${type}/latest?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getSeasonDetailFetch = async (seriesId, seasonNumber) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getSeasonCreditsFetch = async (seriesId, seasonNumber) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/credits?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getSeasonImagesFetch = async (seriesId, seasonNumber) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/images?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getSeasonVideosFetch = async (seriesId, seasonNumber) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/videos?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getEpisodeDetailFetch = async (
	seriesId,
	seasonNumber,
	episodeNumber,
) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getEpisodeCreditsFetch = async (
	seriesId,
	seasonNumber,
	episodeNumber,
) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/credits?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getEpisodeImagesFetch = async (
	seriesId,
	seasonNumber,
	episodeNumber,
) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/images?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getEpisodeVideosFetch = async (
	seriesId,
	seasonNumber,
	episodeNumber,
) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/videos?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getTopRatedFetch = async (type) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/${type}/top_rated?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getOnTheAirFetch = async () => {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const getAiringTodayFetch = async () => {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/airing_today?api_key=${key}`,
	);
	const responseJson = await response.json();
	responseJson.results.map((item) => {
		item.title = item.name;
		item.media_type = "tv";
	});
	return responseJson;
};
