const { v4: uuidV4 } = require('uuid');

class Band {
    constructor( name = 'no-name', votes = 0) {
        this.id = uuidV4(); // uuid para id único
        this.name = name;
        this.votes = votes;
        console.log(this.name, this.votes);
    }
}

module.exports = Band;