const express = require("express");
const AnswerRepository = require("../repository/answerRepository");
const TeamRepository = require("../repository/teamRepository");

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const answerData = {
            answer: req.body.answer,
            user: req.body.userId,
            team: req.body.teamId,
            justify: req.body.justify,
        }

        const answer = await AnswerRepository.createAnswer(answerData);
        return res.status(200).send({data: answer, message: "Answered successfully"});
    } catch(error) {
        return res.status(500).send({message: error.message});
    }
});

router.get('/:teamId', async(req, res) => {
    try {
        const answers = await AnswerRepository.getAnswersByTeamId(req.params.teamId);
        let team = await TeamRepository.getTeamById(req.params.teamId);

        return res.status(200).send({data: {team, answers}, message: "Answers retrieved successfully"});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
})

module.exports = router;