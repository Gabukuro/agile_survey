const express = require("express");
const UserRepository = require("../repository/userRepository");
const TeamRepository = require("../repository/teamRepository");

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const users = await UserRepository.getAllUsers();
        return res.status(200).send({data: users, message: "Users retrieved successfully"});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

router.get('/find', async(req, res) => {
    try {
        const userData = {
            email: req.query.email,
            name: req.query.name,
            role: req.query.role,
        };

        const user = await UserRepository.getUserByUserData(userData);

        if (!user) {
            return res.status(404).send({message: "User not found"});
        }

        return res.status(200).send({data: user, message: "User retrieved successfully"});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

router.post('/', async(req, res) => {
    try {
        let userData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        }
        const user = await UserRepository.createUser(userData);
        res.status(200).send({data: user, message: "User created successfully"});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.post('/assoc', async(req, res) => {
    try {
        let user = await UserRepository.getUserById(req.body.userId);
        let team = await TeamRepository.getTeamByCode(req.body.teamCode);
        let userData = {
            name: user.name,
            role: user.role,
            team: team._id
        };
        const userUpdated = await UserRepository.updateUser(req.body.userId, userData);
        res.status(200).send({data: {user: userUpdated, team}, message: "User associated successfully"});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

module.exports = router;