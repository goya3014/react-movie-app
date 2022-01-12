import React from 'react';

function MainImage(props) {
    //컴포넌트에서 값이 잘 안넘어올 경우 아래와 같이 확인하면 됨.
     //console.log('props:', props)
    return (
        <div style={{backgroundImage: `url('${props.image}')`,
                    height: '500px',
                    backgroundSize: '100%, cover',
                    backgroudPosition: 'center, center',
                    width: '100%',
                    position: 'relative'}}>
            <div>
                <div style={{position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem'}}>
                    <h2 style={{color: 'white'}}>{props.title}</h2>
                    <p style={{color: 'white', fontSize: '1rem'}}>{props.text}</p>
                </div>
            </div>
        </div>
    )
}

export default MainImage