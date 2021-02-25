import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const MovieCard = props => {
  const { id, title, director, metascore, stars} = props.movie;
  const { push } = useHistory();
  const [movieList, setMovieList] = useState([]);

  const handleUpdateClick = () => {
    console.log('YO YO');
    push(`/update-movie/${id}`)
  }


  const handleDeleteClick = () => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        props.deleteMovie(id);
      })
      .catch(err => {
        console.log(err.message)
      })
  }
console.log("moviecard props:");
console.log(props);
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <button onClick={handleUpdateClick}>Update</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default MovieCard;
