function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close modal event
close.addEventListener("click", closeModal);

// close modal form
function closeModal() {
    modalbg.style.display = "none";
}

/*const form = document.getElementById('form');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');

document.addEventListener("DOMContentLoaded", function () {
    let elements = document.getElementsByTagName("INPUT");
    for (let i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function (e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity("This field cannot be left blank");
            }
        };
        elements[i].oninput = function (e) {
            e.target.setCustomValidity("");
        };
    }
})*/

function submitForm() {
    event.preventDefault();
    const form = document.getElementById('form');
    const formData = document.getElementById('formData');
    const firstName = document.getElementById('first');
    const lastName = document.getElementById('last');
    const email = document.getElementById('email');
    const birthdayInput = document.getElementById('birthdate');
    const quantity = document.getElementById('quantity');

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let numberRegex = /^[0-9]*$/;

    if (firstName.value.length < 2 || lastName.value.length < 2) {
        firstName.setAttribute('data-error', 'Ce champ doit contenir au moins 2 caractères');
        alert("nop");
        return false;
    }
    if (email.value === "" || emailRegex.test(email.value) === false) {
        alert("Cette adresse mail n'est pas valide");
        return false;
    }

    //Compare with today's date
    let dateOfToday = new Date();
    let month = dateOfToday.getMonth();
    let day = dateOfToday.getDate();
    let year = dateOfToday.getFullYear();

    console.log(birthdayInput.value)
    let today = new Date(year, month, day);
    let birthdate = new Date(birthdayInput.value);
    if (birthdate > today) {
        alert("A moins d'être un voyageur du temps, vous avez dû vous tromper de date");
        return false;
    }
    if (birthdayInput.value === "") {
        alert("Veuillez renseigner votre date de naissance");
        return false;
    }
    if (quantity.value === "") {
        alert("Vous devez rentrer une valeur");
        return false;
    }

    if (numberRegex.test(quantity.value) === false) {
        alert("Ceci doit être une valeur numérique !");
        return false;
    }

}

