import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovieValues = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateMovie = props => {
    const [ movieValues, setMovieValues ] = useState(initialMovieValues);
    const { push } = useHistory();
    const { id } = useParams();

    useEffect(() => {
        console.log('useEFFECT')
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res);
                setMovieValues(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const changeHandler = (ev) => {
        setMovieValues({
            ...movieValues,
            [ev.target.name]: ev.target.value,
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movieValues)
            .then(res => {
                props.updateMovieList(res.data);
                push(`/`);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <h2>Update Film</h2>
            <form onSubmit={handleSubmit} >
                <input 
                    type='text'
                    name='title'
                    placeholder='film name'
                    onChange={changeHandler}
                    value={movieValues.title}
                />
                <div />
                <input 
                    type='text'
                    name='director'
                    placeholder='director'
                    onChange={changeHandler}
                    value={movieValues.director}
                />
                <div />
                <input 
                    type='text'
                    name='metascore'
                    placeholder='score'
                    onChange={changeHandler}
                    value={movieValues.metascore}
                />
                <div />
                <button>Submit</button>

            </form>
        </div>
    )









}

export default UpdateMovie;
