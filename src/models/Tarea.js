const { Schema, model } = require('mongoose');

const {Etask} = require('../enum/status');
const TareaSchema = Schema({

    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    estado: {
        type: Number,
        default: Etask.pendiente,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

TareaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Tarea', TareaSchema);