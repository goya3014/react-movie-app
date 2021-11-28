import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import {Row} from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        //console.log(props.match)
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            //console.log(response)
            setMovie(response)
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            //console.log('responseForCrew', response)
            setCasts(response.cast)
        })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {/* Header */}
            <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                            title={Movie.original_title}
                            text={Movie.overview}
            />
            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    {/* 로그인 페이지에서 로그인에 성공할 경우 userId를 localStorage에 저장했음. 저장한 userId를 가져오기. F12/application/localStorage */}
                   <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>
                {/* Movie Info */}
                <MovieInfo
                    movie={Movie}
                />
                <br/>
                {/* Actors Grid */}
                <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={toggleActorView}> Toggle Actor View</button>
                </div>
                {/* ActorToggle을 클릭 했을 때만 보여주기 */}
                {ActorToggle &&
                  <Row gutter={[16, 16]}>
                  {Casts && Casts.map((cast, index) => (
                      <React.Fragment key={index}>
                         <GridCards image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null }
                                    actorName={cast.name} 
                         />     
                      </React.Fragment>
                  ))}
                  
              </Row>
                }
            </div>
        </div>
    )
}

export default MovieDetail
