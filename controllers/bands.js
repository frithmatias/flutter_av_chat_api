const Band = require('../models/band.js');
class Bands {
    constructor(){
        this.bands = [];
    }

    addBand(txBand){ // new Band() es parecido a un tipado pero en realidad está de mas.
        const band = new Band(txBand, 1);
        this.bands.push(band);
    }

    getBands() {
        return this.bands;
    }

    deleteBand(id = '') {
        this.bands = this.bands.filter(band => band.id != id);
    }

    voteBand(id) {
        console.log('votado', this.bands);
        this.bands = this.bands.map( band => {
            if ( band.id === id ) {
                band.votes++;
                return band;
            } else {
                return band;
            }
        })
    }
}

module.exports = Bands;