const express = require('express')
const router = express.Router();
const person = require('../Models/Person')


router.post('/person', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new person(data);
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
})

router.get('/person', async (req, res) => {
    try {
        const data = await people.find();
        console.log("data fetch");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }

})

router.get('/person/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == "chef" || workType == "waiter" || workType == "manager") {
            const data = await person.find({ work: workType });
            console.log("data fetch");
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
})


router.put('/person/:personId', async (req, res) => {
    try {
        const personId = req.params.personId;
        const updatepersonData = req.body;

        const response = await person.findByIdAndUpdate(personId, updatepersonData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            res.status(404).json({ error: 'person not found' });
        }

        console.log('data updated')
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
})

router.delete('/person/:personId', async (req, res) => {
    try {
        const personId = req.params.personId;
        const response = await person.findByIdAndDelete(personId)
        if (!response) {
            res.status(404).json({ error: 'person not found' });
        }
        console.log('data deleted')
        res.status(200).json("data deletes successfully");
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
})

module.exports = router;

//Hello Changes