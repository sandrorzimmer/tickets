import mongoose from 'mongoose';

const userRoleSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: {
            type: String,
            required: [true, 'A user role name is required.'],
            unique: true,
            trim: true,
            validate: {
                validator: function (name) {
                    return name.trim().length > 0;
                },
                message: 'User role cannot be blank.'
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

userRoleSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const UserRole = mongoose.model('UserRole', userRoleSchema);

export default UserRole;