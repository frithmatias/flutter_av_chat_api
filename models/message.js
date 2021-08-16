const { Schema, model } = require('mongoose');

const MessageSchema = Schema({
    idFrom: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'El idFrom es necesario'] },
    idTo: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'El idTo es necesario'] },
    // tmMessage: { type: Date, default: new Date(), required: [true, 'El tmMessage es necesario'] }, // Mongoose ya tiene la opcion timestamps
    txMessage: { type: String, required: true },
}, {
    timestamps: true
})

MessageSchema.method('toJSON', function(){
    const { __v, _id, ...objeto } = this.toObject();
    return objeto;
})

module.exports = model('Message', MessageSchema);