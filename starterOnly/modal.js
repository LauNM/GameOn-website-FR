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
const modalBody = document.querySelector(".modal-body");
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

//REGEX CONSTANTS
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const numberRegex = /^[0-9]*$/;

function submitForm() {

    event.preventDefault();
    const form = document.getElementById('reserve');
    const firstName = document.getElementById('first');
    const lastName = document.getElementById('last');
    const email = document.getElementById('email');
    const birthdayInput = document.getElementById('birthdate');
    const today = new Date();
    const birthdate = new Date(birthdayInput.value);
    const quantity = document.getElementById('quantity');
    const locationCheckboxes = document.querySelectorAll('input[name="location"]');
    const checkedOne = Array.prototype.slice.call(locationCheckboxes).some(x => x.checked);
    const utilisationConditions = document.getElementById('checkbox1');

    //Set data-error-visible to false everytime the form is submitted
    for (let i = 0; i < formData.length; i++) {
        formData[i].setAttribute('data-error-visible', 'false')
    }

    let messageValidity;
    function checkValidity() {

        //ForEach input, check if the conditions are respected
        if (firstName.value.length < 2) {
            firstName.parentElement.setAttribute('data-error', 'Ce champ doit contenir au moins 2 caractères');
            firstName.parentElement.setAttribute('data-error-visible', 'true');
            messageValidity = 'error';
        }
        if (lastName.value.length < 2) {
            lastName.parentElement.setAttribute('data-error', 'Ce champ doit contenir au moins 2 caractères');
            lastName.parentElement.setAttribute('data-error-visible', 'true');
            messageValidity = 'error';
        }
        // Check if email is not null and if it's actually an email address
        if (email.value.length < 1 || emailRegex.test(email.value) === false) {
            email.parentElement.setAttribute('data-error', 'Cette adresse mail n\'est pas valide');
            email.parentElement.setAttribute('data-error-visible', 'true');
            messageValidity = 'error';
        }

        //Compare birthdate with today's date

        if (birthdate > today) {
            birthdayInput.parentElement.setAttribute('data-error', 'Il n\'est pas possible de donner une date dans le futur');
            birthdayInput.parentElement.setAttribute('data-error-visible', 'true');
            messageValidity = 'error';
        }
        if (birthdayInput.value.length < 1) {
            birthdayInput.parentElement.setAttribute('data-error', 'Veuillez renseigner votre date de naissance');
            birthdayInput.parentElement.setAttribute('data-error-visible', 'true');
            messageValidity = 'error';
        }
        if (quantity.value.length < 1) {
            quantity.parentElement.setAttribute('data-error', 'Veuillez renseigner un nombre de tournois');
            quantity.parentElement.setAttribute('data-error-visible', 'true');
            messageValidity = 'error';
        }

        //Check if the value is a number and if it's > or === to 0
        if (numberRegex.test(quantity.value) === false || quantity.value < 0) {
            quantity.parentElement.setAttribute('data-error', 'Veuillez renseigner une valeur numérique supérieure ou égale à 0');
            quantity.parentElement.setAttribute('data-error-visible', 'true');
            messageValidity = 'error';
        }


        //Check if at least 1 city is checked
        if (checkedOne === false) {
            locationCheckboxes[0].parentElement.setAttribute('data-error', 'Veuillez sélectionner au moins une ville');
            locationCheckboxes[0].parentElement.setAttribute('data-error-visible', 'true');
            messageValidity = 'error';
        }

        //Check if the checkbox is checked
        if (utilisationConditions.checked === false) {
            utilisationConditions.parentElement.setAttribute('data-error', 'Vous devez accepter les conditions d\'utilisation pour valider votre inscription');
            utilisationConditions.parentElement.setAttribute('data-error-visible', 'true');
            messageValidity = 'error';
        }

        else {
            messageValidity = 'formValid';
        }
        return messageValidity;
    }
    checkValidity();
    if (messageValidity === 'formValid') {
        form.reset();
        form.style.display="none";
        modalBody.innerHTML="Merci ! Votre réservation a été reçue.";
        let btnClose = document.createElement("button");
        btnClose.innerHTML = "Fermer";
        btnClose.className = "button btn-submit";
        btnClose.setAttribute("onClick", "closeModal()");
        modalBody.appendChild(btnClose);
    }
    else {
        return false;
    }
}

