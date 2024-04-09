const express = require('express')
const router = express.Router();
const menu = require('../Models/Menu')


router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newMenu = new menu(data);
        const response = await newMenu.save();
        console.log("data saved");
        res.status(200).json(response);
    } catch (error) {
       
        res.status(500).json({ error: "Internal Server error" });
    }
})


router.get('/', async (req, res) => {
    try {
        const data = await menu.find();
        console.log("data fetch");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }

})

module.exports = router;