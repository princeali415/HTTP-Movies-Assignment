import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'


const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

export default function UpdateMovie(props) {

    const {id} = useParams();
    const {push} = useHistory();
    const [updatedMovie, setUpdatedMovie] = useState(initialState);

    useEffect(()=> {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setUpdatedMovie(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const changeHandler = e => {
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
        .then(res => {
            props.setMovieList(
                props.movieList.map(movie =>{
                    if(movie.id === updatedMovie.id){
                        return res.data
                    } else {
                        return movie
                    }
                })
            )
            push(`/`)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        
            <form onSubmit={handleSubmit}>
                <input name='title' type='text' value={updatedMovie.title} onChange={changeHandler} />
                <input name='director' type='text' value={updatedMovie.director} onChange={changeHandler} />
                <input name='metascore' type='text' value={updatedMovie.metascore} onChange={changeHandler} />
                <button>Save Changes</button>
            </form>
            
        
    )
}
