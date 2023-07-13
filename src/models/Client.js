import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: {
            type: String,
            required: [true, 'A client name is required.'],
            unique: true,
            trim: true,
            validate: {
                validator: function (name) {
                    return name.trim().length > 0;
                },
                message: 'Client cannot be blank.'
            }
        },
        city: {
            type: String,
            required: [true, 'A city is required.'],
            trim: true,
            validate: {
                validator: function (city) {
                    return city.trim().length > 0;
                },
                message: 'City cannot be blank.'
            }
        },
        state: {
            type: String,
            required: [true, 'A state is required.'],
            trim: true,
            validate: {
                validator: function (state) {
                    return state.trim().length > 0;
                },
                message: 'State cannot be blank.'
            }
        },
        companyNumber: {
            type: String,
            required: [true, 'A CNPJ, CPF or equivalent number is required.'],
            unique: true,
            trim: true,
            validate: {
                validator: function (companyNumber) {
                    return companyNumber.trim().length > 0;
                },
                message: 'Company number cannot be blank.'
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

clientSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Client = mongoose.model('Client', clientSchema);

export default Client;