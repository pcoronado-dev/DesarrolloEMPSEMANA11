// Adapter pattern: converts the raw backend shape into the model the UI uses.
// Components never read raw fields (movie_title, rating_10...), only the adapted ones.
export function adaptMovie(raw) {
  const rating = Number(raw.rating_10) || 0;
  const hours = Math.floor(raw.duration_min / 60);
  const minutes = raw.duration_min % 60;

  return {
    id: raw.movie_id,
    title: raw.movie_title,
    year: raw.release_year,
    genres: raw.genre ? raw.genre.split('|') : [],
    rating,
    hasRating: rating > 0,
    durationLabel: `${hours} h ${String(minutes).padStart(2, '0')} min`,
    posterHue: (raw.movie_id * 47) % 360
  };
}

export function adaptMovies(rawList) {
  return rawList.map(adaptMovie);
}
