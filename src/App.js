import{ useEffect, useState} from 'react';

import MovieCard from './MovieCard';

import './App.css'
import SearchIcon from './search.svg'

// d4432b53

const API_URL = 'http://www.omdbapi.com?apikey=d4432b53'

const movie1 = {
  "Title": "Shrek Retold",
  "Year": "2018",
  "imdbID": "tt9334162",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BZDY3ZDFjZWYtNDhmNC00OGVjLWIxZDYtNzlmYTAyYjMwNTcyXkEyXkFqcGdeQXVyNTk5NzczMDE@._V1_SX300.jpg"
}

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm ] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }

  const searchEnterKey = (e) => {
    if (e.key === 'Enter') {
        searchMovies(searchTerm)
    }
} 
  useEffect(() => {
    searchMovies('Marvel')
  }, []);

  return (
    <div className='app'>
      <h1>MovieLand</h1>


      <div className='search'>
        <input 
        placeholder='Search for movies'
        value={searchTerm}
        onChange = {(e) => setSearchTerm(e.target.value)}
        onKeyDown={searchEnterKey}
        />

        <img 
        src={SearchIcon}
        alt='search'
        onClick={() => searchMovies(searchTerm)}


        />
      </div>

      {movies?.length > 0 ? (
          <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
    
        </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
      )}
    </div>
  );
}

export default App
