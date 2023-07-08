import mongoose from 'mongoose';

const userGroupSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: {
            type: String,
            required: [true, 'A group name is required.'],
            unique: true,
            trim: true,
            validate: {
                validator: function (name) {
                    return name.trim().length > 0;
                },
                message: 'Group cannot be blank.'
            }
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

userGroupSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const UserGroup = mongoose.model('UserGroup', userGroupSchema);

export default UserGroup;