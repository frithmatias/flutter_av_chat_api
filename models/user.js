const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    txName: { type: String, required: [true, 'El txName es necesario'] },
    txEmail: { type: String, unique: true, required: [true, 'El txEmail es necesario'] },
    txPassword: { type: String, required: [true, 'El txPassword es necesario'] },
    blOnline: { type: Boolean, default: false },
})

UserSchema.method('toJSON', function(){
    const { __v, _id, txPassword, ...objeto } = this.toObject();
    objeto.txUid = _id;
    return objeto;
})

module.exports = model('User', UserSchema);