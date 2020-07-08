class CarService {

    constructor() {
        this.URI = '/api/cars';
    }

    async getCars() {
        let response = await fetch(this.URI);
        let coches = await response.json();
        return coches;
    }

    async postCar(coche) {
        let response = await fetch(this.URI, {
            method: 'post',
            body: coche
        });
        let data = response.json();
        return data;
    }

    async updateCar(id, coche) {
        let response = await fetch(`${this.URI}/${id}`, {
            method: 'put',
            body: coche
        })
        let data = response.json();
        return data;
    }

    async deleteCar(id) {
        let response = await fetch(`${this.URI}/${id}`, {
            method: 'delete'
        });
        let data = response.json();
        return data;
    }
}

module.exports = CarService