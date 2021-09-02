function editNav() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

//----------------------------------------------------------------------------------------------------------
// DOM Elements
const modalbg = document.querySelector(".bground");
const registrationForm = document.getElementById("registrationForm");
const confirmationForm = document.getElementById("confirmationForm");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeConfirmation = document.querySelector("#confirmationBtn");
const closeBtn = document.querySelector(".close");

// FORM Elements
const form = document.getElementById('reserve');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthdayInput = document.getElementById('birthdate');
const today = new Date();
const birthdate = new Date(birthdayInput.value);
const quantity = document.getElementById('quantity');
const locationRadios = document.getElementsByName('location');
const terms = document.getElementById('checkbox1');

//REGEX CONSTANTS
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const numberRegex = /^[0-9]*$/;

//----------------------------------------------------------------------------------------------------------
                                                        /*  FUNCTIONS  */

//SHOW MODAL
function launchModal() {
    modalbg.style.display = "block";
}
//HIDE MODAL
function closeModal() {
    modalbg.style.display = "none";
    formData.forEach(el => el.setAttribute('data-error-visible', 'false'))
}

//SHOW FORM AND HIDE CONFIRMATION MESSAGE
function showRegistration() {
    registrationForm.style.display = "block" ;
    confirmationForm.style.display = "none" ;
}

//SHOW CONFIRMATION MESSAGE AND HIDE FORM
function showConfirmation() {
    confirmationForm.style.display = "block" ;
    registrationForm.style.display = "none" ;
}
// CLOSE MODAL => RESET FORM, SHOW FORM, HIDE CONFIRMATION MESSAGE AND HIDE MODAL
function closeMessage() {
    form.reset();
    showRegistration();
    closeModal();
}

//----------------------------------------------------------------------------------------------------------
                                                /*    USE FUNCTIONS    */

// Launch Modal when clicking on "Suscribe"
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close Modal when clicking on X
closeBtn.addEventListener("click", closeMessage);


//----------------------------------------------------------------------------------------------------------
                                                /*    SUBMIT FORM    */
function submitForm() {
    event.preventDefault();

    //Set data-error-visible to false everytime the form is submitted
   /* for (let i = 0; i < formData.length; i++) {
        formData[i].setAttribute('data-error-visible', 'false')
    }*/
    formData.forEach(el => el.setAttribute('data-error-visible', 'false'));

    //Create variable "isValid" : value = 0 if there is at least 1 error, value = 1 if there is no error
    let isValid;

    //Check if there are errors
    function checkValidity() {

                         /*    ForEach input, check if the conditions are respected  */

        //Value.length must be > 2
        if (firstName.value.length < 2) {
            firstName.parentElement.setAttribute('data-error', 'Ce champ doit contenir au moins 2 caractères');
            firstName.parentElement.setAttribute('data-error-visible', 'true');
            isValid = 0;
        }
        if (lastName.value.length < 2) {
            lastName.parentElement.setAttribute('data-error', 'Ce champ doit contenir au moins 2 caractères');
            lastName.parentElement.setAttribute('data-error-visible', 'true');
            isValid = 0;
        }
        // Check if email is not null and if it's actually an email address
        if (email.value.length < 1 || emailRegex.test(email.value) === false) {
            email.parentElement.setAttribute('data-error', 'Cette adresse mail n\'est pas valide');
            email.parentElement.setAttribute('data-error-visible', 'true');
            isValid = 0;
        }

        //Compare birthdate with today's date
        if (birthdate > today) {
            birthdayInput.parentElement.setAttribute('data-error', 'Il n\'est pas possible de donner une date dans le futur');
            birthdayInput.parentElement.setAttribute('data-error-visible', 'true');
            isValid = 0;
        }

        //Check if birthdate is given
        if (birthdayInput.value.length < 1) {
            birthdayInput.parentElement.setAttribute('data-error', 'Veuillez renseigner votre date de naissance');
            birthdayInput.parentElement.setAttribute('data-error-visible', 'true');
            isValid = 0;
        }

        //Check if quantity is given
        if (quantity.value.length < 1) {
            quantity.parentElement.setAttribute('data-error', 'Veuillez renseigner un nombre de tournois');
            quantity.parentElement.setAttribute('data-error-visible', 'true');
            isValid = 0;
        }

        //Check if quantity is a number and if it's > or === to 0
        if (numberRegex.test(quantity.value) === false || quantity.value < 0) {
            quantity.parentElement.setAttribute('data-error', 'Veuillez renseigner une valeur numérique supérieure ou égale à 0');
            quantity.parentElement.setAttribute('data-error-visible', 'true');
            isValid = 0;
        }


        //Check if a city is checked
        let isChecked = false;
        //If one radio box is checked => isChecked === true
        for (let i = 0; i < locationRadios.length; i++) {
            if(locationRadios[i].checked) {
                isChecked = true;
            }
        }
        if (isChecked === false) {
            locationRadios[0].parentElement.setAttribute('data-error', 'Veuillez sélectionner une ville');
            locationRadios[0].parentElement.setAttribute('data-error-visible', 'true');
            isValid = 0;
        }
        //Check if "terms of use" checkbox is checked
        if (!terms.checked) {
            terms.parentElement.setAttribute('data-error', 'Vous devez accepter les conditions d\'utilisation pour valider votre inscription');
            terms.parentElement.setAttribute('data-error-visible', 'true');
            isValid = 0;
        }
        else {
            isValid = 1;
        }
        return isValid;
    }

    //Launch Checking function
    checkValidity();

    //If no error : Close Form and Show Confirmation message
    if (isValid === 1) {
        showConfirmation()
    }
    else {
        return false;
    }
}

//----------------------------------------------------------------------------------------------------------
                                                /* CLOSE MODAL AFTER VALIDATION */

//Close Modal and reset form when clicking on "Close" button
 closeConfirmation.addEventListener("click", closeMessage);
