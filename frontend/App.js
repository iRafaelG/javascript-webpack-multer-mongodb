// import css
require('./styles/main.css')

// import js
require('./helpers/helper')

// import classes
const UI = require('./classes/UI');

// initializations
const ui = new UI();

// variables
let editing = false;
let editable = false;

// app
document.addEventListener('DOMContentLoaded', function (e) {
    ui.renderCars();
});

document.getElementById('car-form')
    .addEventListener('submit', function (e) {
        e.preventDefault();

        let marca = document.getElementById('marca').value;
        let modelo = document.getElementById('modelo').value;
        let matricula = document.getElementById('matricula').value;
        let foto = document.getElementById('foto').files;

        let formData = new FormData();
        formData.append('marca', marca);
        formData.append('modelo', modelo);
        formData.append('matricula', matricula);
        formData.append('image', foto[0]);

        ui.createCar(formData);
    });

document.getElementById('cars-container')
    .addEventListener('click', function (e) {

        if (e.target.classList.contains('delete')) {
            ui.removeCar(e.target.getAttribute('_id'));
        }

        if (e.target.classList.contains('edit')) {

            let inputsEditables = document.querySelectorAll('.editable');
            let editButton = document.querySelector('.edit');

            if (editing && editable) {
                let formDataEdited = new FormData();
                for (let input of inputsEditables) {
                    formDataEdited.append(input.name, input.value);
                }
                ui.modifyCar(e.target.getAttribute('_id'), formDataEdited);
            }

            editing = !editing;
            editButton.classList.toggle('btn-warning');
            editButton.classList.toggle('btn-success');

            for (let input of inputsEditables) {
                if (editing) {
                    input.addEventListener('change', () => {
                        editable = true;
                    });
                }
                input.classList.toggle('disabled');
                input.toggleAttribute('disabled');
            }
        }
    });