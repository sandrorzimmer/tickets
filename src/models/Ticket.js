import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const ticketSchema = new mongoose.Schema(
    {
        id: { type: String },
        title: {
            type: String,
            required: [true, 'A ticket title is required.'],
            trim: true,
            validate: {
                validator: function (name) {
                    return name.trim().length > 0;
                },
                message: 'Title cannot be blank.'
            }
        },
        description: { type: String },
        solution: { type: String },
        ticketType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TicketType',
            required: [true, 'A ticket type is required.'],
            auttopopulate: { select: 'id name' }
        },
        priority: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Priority',
            required: [true, 'A ticket priority is required.'],
            autopopulate: { select: 'id name' }
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client',
            required: [true, 'A client is required.'],
            autopopulate: { select: 'id name' }
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'A ticket author is required.'],
            autopopulate: { select: 'id name userName' }
        },
        responsible: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'An ticket responsible is required.'],
            autopopulate: { select: 'id name userName' }
        },
        assignedAt: {
            type: Date,
            default: null
        },
        completedAt: {
            type: Date,
            default: null
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

ticketSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

ticketSchema.plugin(autopopulate);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;