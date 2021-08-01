import React, {useState, useEffect} from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        //fetch 함수를 통해 endpoint를 넣어 인기있는 영화 가져오기
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([response.results])
            //MainMovieImage에 가장 잘나가는 영화인 첫번째 영화를 넣어주기
            setMainMovieImage(response.results[0])
            console.log(response.results)
        })

    }, [])

    return (
        <div style={{ width: '100%', margin: '0' }}>
                {/* Main Image */}
                {MainMovieImage &&
                <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                            title={MainMovieImage.original_title}
                            text={MainMovieImage.overview}
                />
                }
            <div style={{ width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />
                {/* Movie Grid Cards */}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
