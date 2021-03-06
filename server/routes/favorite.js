const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
    //1. mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({"movieId": req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
   //2. 프론트 단에 숫자 정보를 다시 보내주기
            console.log('favoriteNumber', info.length)
        res.status(200).json({success: true, favoriteNumber: info.length})
        })

})

router.post('/favorited', (req, res) => {
    //1. 내가 이 영화를 Favorite 리스트에 넣었는지 DB에서 가져오기
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            
            let result = false;

            if(info.length !== 0){
                result = true;
            }

        res.status(200).json({success: true, favorited: result})
        })

})

module.exports = router;
