import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props ) {
  const [movie, setMovie] = useState(null);
  const {id} = useParams();
  const {push} = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const updateMovie = () => {
    push(`/update-movie/${movie.id}`)
  }

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        props.setMovieList(props.movieList.filter(movie => {
          return movie.id !== id
        }))
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    
    push(`/`)
    window.location.reload(false);
  }



  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button className="update-button" onClick={updateMovie}>
        Update
      </button>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
