import React, { useEffect} from 'react'
import Axios from 'axios'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime


    useEffect(() => {
        // 누가 어떤 영화를 좋아했는 지에 대한 정보를 담아 mongoDB에 보내줌
        let variables = {
            userFrom,
            movieId
        }

        // axios post 주소는 임의로 정할 수 있음
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                //console.log(response.data)
                if(response.data.success){

                }else {
                    alert('숫자 정보를 가져오는 데 실패했습니다.')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                //console.log(response.data)
                if(response.data.success){

                }else {
                    alert('정보를 가져오는 데 실패했습니다.')
                }
            })

    }, [])




    return (
        <div>
             <button>Favorite</button>
        </div>
    )
}

export default Favorite
