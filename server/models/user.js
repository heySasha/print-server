const mongoose = require('mongoose');
const { isEmail, isMobilePhone } = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            isAsync: true,
            validator: isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    mobilePhone: {
        type: String,
        validate: {
            isAsync: true,
            validator: str => /^(\+?38)?\d{10}$/.test(str),
            message: '{VALUE} is not a valid mobile phone'
        }
    },
    facebookId: String,
    registerAt: {
        type: Number,
        default: new Date().getTime()
    }
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'name', 'email', 'mobilePhone']);
};

UserSchema.statics.findByCredentials = function ({ email, password }) {
    const  User = this;

    return User.findOne({ email }).then(user => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        });
    })
};

UserSchema.pre('save', function (next) {
    const user = this;

    console.log(user);

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };