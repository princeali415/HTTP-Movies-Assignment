import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

export default function AddMovie(props) {
    const [newMovie, setNewMovie] = useState(initialState);
    const {push} = useHistory();

    const handleChange = (e) => {
        setNewMovie({
            ...newMovie,
            id: props.movieList.length + 1,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies', newMovie)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        push('/')
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='title' type='text' value={newMovie.title} onChange={handleChange} />
                <input name='director' type='text' value={newMovie.director} onChange={handleChange} />
                <input name='metascore' type='text' value={newMovie.metascore} onChange={handleChange} />
                <button>Save Changes</button>
            </form>
        </div>
    )
}