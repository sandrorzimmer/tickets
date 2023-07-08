import mongoose from 'mongoose';

const prioritySchema = new mongoose.Schema(
    {
        id: { type: String },
        name: {
            type: String,
            required: [true, 'A priority name is required.'],
            unique: true,
            trim: true,
            validate: {
                validator: function (name) {
                    return name.trim().length > 0;
                },
                message: 'Priority cannot be blank.'
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

prioritySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Priority = mongoose.model('Priority', prioritySchema);

export default Priority;