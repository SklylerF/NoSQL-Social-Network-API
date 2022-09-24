const { Thought } = require("../models")

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            Thought.find()
                .then((Thought) => {
                    res.json(Thought)
                })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getOneThought(req, res) {
        try {
            Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .then((Thought) => {
                    if (!Thought) {
                        res.status(400).json({ message: 'there is no thought with that id' })

                        return;
                    }

                    res.json(Thought)
                })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create thought
    async createThought(req, res) {
        try {


            Thought.create(req.body)
                .then((thought) => {
                    const user = user.findOneAndUpdate(
                        { _id: req.params.userId },
                        { $push: { thoughts: thought._id } },
                        { new: true }
                    )

                    if (!user) {
                        res.status(400).json({ message: "there is no user with this id" })

                        return;
                    }

                    res.status(200).json(Thought)
                })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
                .then((thought) => {
                    if (!Thought) {
                        res.status(400).json({ message: "there is not a thought with that id" })

                        return;
                    }
                    res.status(200).json(thought)
                })
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // delete thought
    async deleteThought(req, res) {
        try {
            Thought.findOneAndDelete({ _id: req.params.thoughtId })
                .then((Thought) => {
                    if (!Thought) {
                        res.status(400).json({ message: "there is no thought with this id" })

                        return;
                    }
                })
        } catch (err) {
            res.status(500).json(err)
        }
    }
}