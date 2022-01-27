const teamModel = require('../model/teamModel');

class TeamRepository {
    static async getAllTeams() {
        return await teamModel.find({});
    }

    static async getTeamById(id) {
        return await teamModel.findById(id);
    }

    static async getTeamByCode(code) {
        return await teamModel.findOne({ code: code });
    }

    static async getTeamByName(name) {
        return await teamModel.findOne({ name: name });
    }

    static async createTeam(team) {
        return await teamModel.create(team);
    }

    static async updateTeam(id, team) {
        return await teamModel.findByIdAndUpdate(id, team);
    }

    static async deleteTeam(id) {
        return await teamModel.findByIdAndDelete(id);
    }
}

module.exports = TeamRepository;