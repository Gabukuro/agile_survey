const express = require("express")
const TeamRepository = require("../repository/teamRepository")

const router = express.Router();

router.get('/leader/:leaderId', async(req, res) => {
    try {
        const teams = await TeamRepository.getTeamByLeader(req.query.leader);
        return res.status(200).send({data: teams, message: "Teams retrieved successfully"});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

router.post('/', async(req, res) => {
    try {
        const teamData = {
            name: req.body.name,
            code: Math.random().toString(32).slice(7).toUpperCase(),
            leader: req.body.userId,
        }

        const team = await TeamRepository.createTeam(teamData);
        return res.status(200).send({data: team, message: "Team created successfully"});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

module.exports = router;