import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import autopopulate from 'mongoose-autopopulate';
import validatePassword from '../utils/validatePassword.js';

const userSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: {
            type: String,
            required: [true, 'A personal name is required.'],
            trim: true,
            validate: {
                validator: function (name) {
                    return name.trim().length > 0;
                },
                message: 'Name cannot be blank.'
            }
        },
        userName: {
            type: String,
            required: [true, 'A username is required.'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters.'],
            maxlength: [30, 'Username cannot exceed 30 characters.'],
            validate: {
                validator: function (name) {
                    return name.trim().length > 0;
                },
                message: 'Username cannot be blank.'
            }
        },
        password: {
            type: String,
            required: [true, 'A password is required.'],
            validate: {
                validator: function (password) {
                    return validatePassword(password);
                },
                message: 'Password is not valid.'
            }
        },
        userRole: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserRole',
            required: true,
            autopopulate: { select: 'id name' }
        },
        userGroup: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserGroup',
            required: true,
            autopopulate: { select: 'id name' }
        },
        createdAt: {
            type: Date,
            default: new Date()
        },
        updatedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    try {
        //Set the update timestamp
        this.updatedAt = new Date();

        //Hash the new password before saving to database
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.plugin(autopopulate);

const User = mongoose.model('User', userSchema);

export default User;