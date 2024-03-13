const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
        // validator: 
    },
    username: {
        type: String
    },
    school_name: {
        type: String,
        required: true
    },
    school_logo_url: {
        type: String,
        default: "https://png.pngtree.com/png-clipart/20220616/original/pngtree-education-logo-design-with-combination-of-pencil-book-and-leaf-icon-png-image_8090926.png"
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
});

UserSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;