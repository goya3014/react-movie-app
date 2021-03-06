import React, {useState, useEffect} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import {Row} from 'antd';
function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        //처음 로드시 endpoint를 넣어 데이터 가져오기
       fetchMovies(endpoint)
    }, [])

    //fetchMovies를 공통 함수로 만들기
    const fetchMovies = (endpoint) => {
         //fetch 함수를 통해 endpoint를 넣어 인기있는 영화 가져오기
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([...Movies, ...response.results])
            //MainMovieImage에 가장 잘나가는 영화인 첫번째 영화를 넣어주기
            setMainMovieImage(response.results[0])
            setCurrentPage(response.page)
        })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)
    }

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
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                           <GridCards
                                LandingPage
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null }
                                      movieId={movie.id}
                                      movieName={movie.original_title} 
                           />     
                        </React.Fragment>
                    ))}
                    
                </Row>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
