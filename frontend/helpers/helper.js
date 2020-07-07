// after uploading file, set its name into input element

let label;

document.querySelector('.custom-file-input')
    .addEventListener('change', function (e) {
        let filename = e.target.value.split('\\').pop();
        label = e.target.nextElementSibling;
        label.innerHTML = filename;
    });