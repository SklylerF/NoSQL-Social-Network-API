const { User, Thought } = require('../models')

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
    //  get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({
                path: "thoughts",
                select: "-__v"
            })
            .populate({
                path: "friends",
                select: "-__v"
            })
            // excluding version key from response
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "no user found!" })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },
    updateUser(rea, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        then((deleteUser) =>
            !deleteUser
                ? res.status(404).json({ message: 'No user with this id' })
                : res.status(200).json({ message: "user has been deleted" })
        )
            .catch((err) => res.status(500).json(err))

    }
}