const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    tx_name: { type: String, required: [true, 'El tx_name es necesario'] },
    tx_email: { type: String, unique: true, required: [true, 'El tx_email es necesario'] },
    tx_password: { type: String, required: [true, 'El tx_password es necesario'] },
    bl_online: { type: Boolean, default: false },
})

UserSchema.method('toJSON', function(){
    const { __v, _id, tx_password, ...objeto } = this.toObject();
    objeto.uid = _id;
    return objeto;
})

module.exports = model('User', UserSchema);