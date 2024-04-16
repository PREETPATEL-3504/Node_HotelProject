const express = require('express')
const router = express.Router();
const person = require('../Models/Person')
const { jwtAuthmiddelware, generateToken } = require('../jwt')

router.post('/signup', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new person(data);
        const response = await newPerson.save();
        console.log("data saved");

        const playload = {
            id: response.id,
            username: response.username
        }

        const token = generateToken(playload)
        console.log("Token", token);
        res.status(200).json({ response: response, token: token });

    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
})


//Login route
router.post('/login', async (req, res) => {

    try {
        const { username, password } = req.body;

        const user = await person.findOne({ username: username });

        if (!user || !(await user.comparepassword(password))) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const payload = {
            id: user.id,
            username: user.username
        };

        const token = await generateToken(payload); // Use await for asynchronous generation
        res.json({ token });

    } catch (error) {
        console.error("Login error:", error); // Log the actual error for debugging
        res.status(500).json({ error: "Login failed" }); // More generic error message
    }
})

router.get('/',jwtAuthmiddelware, async (req, res) => {
    try {
        const data = await person.find();
        console.log("data fetch");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }

})

router.get('/profile', jwtAuthmiddelware, async(req, res)=>{
    try {
        const  userData = req.user;
        console.log("User Data", userData)
        const userId = userData.id;
        const user = await person.findById(userId)
        res.status(200).json(user);

    } catch (error) {
        
    }
})

router.get('/:workType', async (req, res) => {
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


router.put('/:personId', async (req, res) => {
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

router.delete('/:personId', async (req, res) => {
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