import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import AddMovie from './Movies/AddMovie';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const { push } = useHistory();


  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

const deleteMovie = (id) => {
  // console.log(id);
  setMovieList(movieList.filter(movie => movie.id !== id))
  push('/');
}

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateMovieList = (newInfo) => {
    const tempArray = movieList.filter(movie => movie.id !== newInfo.id)
    tempArray.unshift(newInfo)
    setMovieList(tempArray);
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} deleteMovie={deleteMovie} />
      </Route>

      <Route path='/add-movie'>
        <AddMovie setMovieList={setMovieList} />
      </Route>


      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovie={deleteMovie}/>
      </Route>

      <Route path='/update-movie/:id' render={
        props => {
          return( <UpdateMovie {...props} updateMovieList={updateMovieList}  />)
        }
      }
      />
    </>
  );
};

export default App;
