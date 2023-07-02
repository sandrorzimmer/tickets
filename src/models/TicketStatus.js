import mongoose from 'mongoose';

const ticketStatusSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: {
            type: String,
            required: [true, 'A ticket status name is required.'],
            validate: {
                validator: function (name) {
                    return name.trim().length > 0;
                },
                message: 'Ticket status cannot be blank.'
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

ticketStatusSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const TicketStatus = mongoose.model('TicketStatus', ticketStatusSchema);

export default TicketStatus;