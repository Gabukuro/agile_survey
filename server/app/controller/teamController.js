const express = require("express")
const TeamRepository = require("../repository/teamRepository")

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const team = await TeamRepository.createTeam(req.body);
        return res.status(200).send({data: team, message: "Team created successfully"});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

module.exports = router;