const { Schema, model } = require('mongoose');
const emailValidation = require('../utils/emailValidation');

// schema to create user model 
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [emailValidation, "Enter a valid email."]
        },
        // thoughts _id value refereses the thought model
        thoughts: [
            {
                type: Schema.types.objectId,
                ref: 'Thought'
            }],
        // friends _id value refereses the User model
        friends: [
            {
                type: Schema.types.objectId,
                ref: 'User'
            }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

// retrives the length of the user's friends array.
userSchema
    .virtuals('friendCount')
    .get(() => this.friends.length);

// initialize user model
const User = model('User', userSchema);

module.export = User;