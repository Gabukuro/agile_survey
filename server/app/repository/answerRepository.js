const answerModel = require('../model/answerModel');

class AnswerRepository {

    static async getAllAnswers() {
        return await answerModel.find({});
    }

    static async createAnswer(answerData) {
        return await answerModel.create(answerData);
    }

    static async getAnswersByTeamId(teamId) {
        return await answerModel.find({team: teamId});
    }
}

module.exports = AnswerRepository;