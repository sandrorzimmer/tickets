import mongoose from 'mongoose';

const ticketTypeSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: {
            type: String,
            required: [true, 'A ticket type name is required.'],
            unique: true,
            trim: true,
            validate: {
                validator: function (name) {
                    return name.trim().length > 0;
                },
                message: 'Ticket type cannot be blank.'
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

ticketTypeSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const TicketType = mongoose.model('TicketType', ticketTypeSchema);

export default TicketType;