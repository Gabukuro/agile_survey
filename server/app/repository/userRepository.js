const userModel = require('../model/userModel');

class UserRepository {
    static async getAllUsers() {
        return await userModel.find({});
    }

    static async getUserById(id) {
        return await userModel.findById(id);
    }

    static async getUserByName(name) {
        return await userModel.findOne({ name: name });
    }

    static async createUser(user) {
        return await userModel.create(user);
    }

    static async updateUser(id, user) {
        return await userModel.findByIdAndUpdate(id, user);
    }

    static async deleteUser(id) {
        return await userModel.findByIdAndDelete(id);
    }
}

module.exports = UserRepository;