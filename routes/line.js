const express = require("express");
const router = express.Router();
const LineModel = require("../models/lineModel");

router.get('/getLine/:id', (req, res) => {

    LineModel.findOne({ id: req.params.id }).then(idExist => {
        if(idExist){
            LineModel.find({id: req.params.id})
            .then(post => {
                res.send(post);
            })
        } else {
            res.json({error: 'ID doesn\'t Exist'})
        }
    })
    
})

module.exports = router;