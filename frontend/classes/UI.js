// import node modules
const { format } = require('timeago.js');

// import services
const CarService = require('../services/car.service');

// initializations
const carService = new CarService();

// ui class
class UI {

    async renderCars() {
        let cars = await carService.getCars();
        let carsCotainer = document.getElementById('cars-container');
        carsCotainer.innerHTML = "";
        for (let car of cars) {
            let div = document.createElement('div');
            div.className = "";
            div.innerHTML = `
                <div class="card mb-2">
                    <div class="row">
                        <div class="col-md-7">
                            <img src="${car.foto}" alt="${car.modelo}" class="img-fluid p-2" />
                        </div>
                        <div class="col-md-5">
                            <div class="card-block p-2">
                                <div class="form-group"><input type="text" name="marca" value="${car.marca}" class="disabled editable form-control" disabled /></div>
                                <div class="form-group"><input type="text" name="modelo" value="${car.modelo}" class="disabled editable form-control" disabled /></div>
                                <div class="form-group"><input type="text" name="matricula" value="${car.matricula}" class="disabled editable form-control" disabled /></div>
                                <div class="d-flex justify-content-center"><a _id="${car._id}" class="btn btn-warning edit mx-2"><i class="fas fa-pencil-alt"></i></a>
                                <a _id="${car._id}" class="btn btn-danger delete mx-2"><i class="far fa-trash-alt"></i></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span>${format(car.createdAt)}</span>
                    </div>
                </div>`

            carsCotainer.appendChild(div);
        }
    }

    async createCar(coche) {
        let response = await carService.postCar(coche);
        this.clearForm();
        this.renderCars();
        this.messageRender(response.message, 'success', 4000);
    }

    async modifyCar(id, coche) {
        let response = await carService.updateCar(id, coche);
        this.renderCars();
    }

    async removeCar(id) {
        let response = await carService.deleteCar(id);
        this.renderCars();
        this.messageRender(response.message, 'danger', 4000)
    }

    clearForm() {
        document.getElementById('car-form').reset();
        document.querySelector('.custom-file-label').innerHTML = "Elegir imagen..."
    }

    messageRender(message, colorMessage, messageTime) {
        let div = document.createElement('div');
        div.className = (`alert alert-${colorMessage} message`);
        div.appendChild(document.createTextNode(message));

        let container = document.querySelector('.col-md-5');
        let form = document.querySelector('#car-form');

        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.message').remove();
        }, messageTime);
    }
}

module.exports = UI;