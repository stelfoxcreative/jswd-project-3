// get the first field in the form and set it to be focussed
let nameField = document.getElementById('name');
nameField.focus();

// The Job Role Section
let otherOption = document.querySelector('#title');
let otherTitle = document.querySelector('#other-title');
// see the textarea to display none;
otherTitle.style.display = "none";

// add an event listener with to track change events on the select dropdown
// if the other option is selected then set the textarea to display
// whenever another dropdown is selected then change the textarea back to display none
otherOption.addEventListener("change", () => {
  if(otherOption.value == "other") {
    otherTitle.style.display = "block";
  } else {
    otherTitle.style.display = "none";
  }
});

// get the color dropdown and set its default value to display none
let colorsSection = document.querySelector('#colors-js-puns');
colorsSection.style.display = "none";

let themeSelector = document.querySelector('#design');
let punsJS = document.querySelectorAll('.js-puns');
let loveJS = document.querySelectorAll('.js-love');

// Set them all to display none by default using the forEach loop
punsJS.forEach(punItem => {
  punItem.style.display = "none";
});
loveJS.forEach(item => {
  item.style.display = "none";
});

// When the theme selector changes
// make all of the items in the selected option visible
// hide those not selected
// Possible to refactor this as well? imagine if we had 10 options...?
themeSelector.addEventListener("change", () => {
  if(themeSelector.value == "js puns") {
    colorsSection.style.display = "block";
    punsJS[0].selected = "true";
    punsJS.forEach(punItem => {
      punItem.style.display = "block";
    });
    loveJS.forEach(item => {
      item.style.display = "none";
    });
  } else if(themeSelector.value == "heart js") {
    loveJS[0].selected = "true";
    colorsSection.style.display = "block";
    loveJS.forEach(item => {
      item.style.display = "block";
    });
    punsJS.forEach(punItem => {
      punItem.style.display = "none";
    });
  } else {
    colorsSection.style.display = "none";
  }
});

// Register for Activities section
let activitiesSessions = document.querySelectorAll('.activities input');
let morningSessions = document.querySelectorAll('.morning');
let afternoonSessions = document.querySelectorAll('.afternoon');
let wednesdaySessions = document.querySelectorAll('.wednesday');
let allSessions = document.querySelectorAll('.all');

let activities = document.querySelector('.activities');
let price = document.createElement('div');

let checked = false;
let cost = 0;
let total = 0;

// Add event listener to every checkbox item
// Update checked to new value
// for each checkbox selected call the session() function and pass is values
activitiesSessions.forEach(item => {
  item.addEventListener("click", (e) => {
    let checked = item.checked;
    if (item.className == "wednesday") {
      session(e, item, wednesdaySessions, checked, 100, false);
    } else if (item.className == "morning") {
      session(e, item, morningSessions, checked, 100);
    } else if (item.className == "afternoon") {
      session(e, item, afternoonSessions, checked, 100);
    } else if (item.className == "all") {
      session(e, item, allSessions, checked, 200);
    };
  })
});

// take the values passed in
// disbable other items in the group that were not checked
// update the total price using the trackPrice function
var session = function (e, item, time, checked, workshopCost, disableGroup) {
  if (checked) {
    trackPrice(workshopCost);
    time.forEach(item => {
      if (item != e.target && disableGroup != false) {
        item.disabled = true;
        item.checked = false;
      }
    });
  } else if (!checked) {
    trackPrice(total - workshopCost);
    time.forEach(item => {
      item.disabled = false;
    });
  }
}

// updates the total price and passes this into the DOM using a template literal
function trackPrice(total) {
  cost += total;
  price.innerHTML = `Total: $${cost}`;
  activities.appendChild(price);
}

// Check how many activities have been selected
// Set the count to a global variable and reset it each time the function is called
// It may have been a lot simpler here to just check the totalPrice
// If the price is 0, then nothing is selected...
// Still interesting learning ^_^
let count = 0;
let activitiesCheck = () => {
  count = 0;
  activitiesSessions.forEach(item => {
    if (item.checked == true) {
      count++
    }
  });
  return count;
};

let allInput = document.querySelector('.all');
let activitiesError = () => {
  if (activitiesCheck()) {
    if (allInput.previousSibling != null) {
      allInput.previousSibling.remove();
      return true;
    } else {
      return true;
    }
  } else if (!activitiesCheck()) {
    if (allInput.previousSibling == null) {
      allInput.insertAdjacentHTML('beforebegin', `<p class="error--text_red">Please select at least one activity</p>`);
      return false;
    } else {
      return false;
    }
  }
}


// Payment Selection Section
let paymentSelector = document.querySelector('#payment');
let cardSection = document.querySelector('#credit-card');
let payPal = document.querySelector('#PayPal');
let bitcoin = document.querySelector('#Bitcoin');

// Hide the card section
cardSection.style.display = "none";
payPal.style.display = "none";
bitcoin.style.display = "none";

// Hide and show elements depending on selection
paymentSelector.addEventListener("change", (e) => {
  if (paymentSelector.value == "paypal") {
    cardSection.style.display = "none";
    payPal.style.display = "block";
    bitcoin.style.display = "none";
  } else if (paymentSelector.value == "bitcoin") {
    cardSection.style.display = "none";
    payPal.style.display = "none";
    bitcoin.style.display = "block";
  } else if (paymentSelector.value == "credit card") {
    cardSection.style.display = "block";
    payPal.style.display = "none";
    bitcoin.style.display = "none";
  } else {
    cardSection.style.display = "none";
    payPal.style.display = "none";
    bitcoin.style.display = "none";
  }
});

// Check the Name Field validates
let nameCheck = () => {
  if (nameField.value == "" && nameField.className != "error") {
    nameField.className = "error";
    nameField.insertAdjacentHTML('beforebegin', `<p class="error--text_red">Please enter your name</p>`);
    return false;
  } else if (nameField.value != "" && nameField.className == "error") {
    nameField.className = "";
    nameField.previousSibling.remove();
    return true;
  } else {
    return true;
  }
}

// Check the Email Field validates
let emailField = document.querySelector('#mail');
const emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

let emailCheck = () => {
  if(emailFilter.test(emailField.value) != true && emailField.className != "error") {
    emailField.className = "error";
    emailField.insertAdjacentHTML('beforebegin', `<p class="error--text_red">Please enter your email address</p>`);
    return false;
  } else if (emailFilter.test(emailField.value) == true && emailField.className == "error") {
    emailField.className = "";
    emailField.previousSibling.remove();
    return true;
  } else if (emailFilter.test(emailField.value) == true) {
    return true;
  } else {
    return false;
  }
}

// The card filter sections are all very similar
// Get elements and test them against a regular expression
// Maybe possible to refactor and pass in the element to a check function
// Then use the THIS keyword to update as required...
let cardField = document.querySelector('#cc-num');
const cardFilter = /^\d{13,16}$/;

let cardNumberCheck = () => {
  if (cardFilter.test(cardField.value)) {
     if(cardField.className == "error" && cardField.previousSibling != null){
      cardField.className = "";
      cardField.previousSibling.remove();
      return true;
    } else {
      return true;
    }
  } else if (cardFilter.test(cardField.value) != true) {
    if (cardField.className != "error") {
      cardField.className = "error";
      cardField.insertAdjacentHTML('beforebegin', `<p class="error--text_red">Please enter a valid Card Number</p>`);
      return false;
    } else {
      return false;
    }
  }
}

let zipField = document.querySelector('#zip');
const zipFilter = /^\d{5}$/;

let zipCheck = () => {
  if (zipFilter.test(zipField.value)) {
     if(zipField.className == "error" && zipField.previousSibling != null){
      zipField.className = "";
      zipField.previousSibling.remove();
      return true;
    } else {
      return true;
    }
  } else if (zipFilter.test(zipField.value) != true) {
    if (zipField.className != "error") {
      zipField.className = "error";
      zipField.insertAdjacentHTML('beforebegin', `<p class="error--text_red">Please enter a valid Zip Code</p>`);
      return false;
    } else {
      return false;
    }
  }
}

let cvvField = document.querySelector('#cvv');
const cvvFilter = /^\d{3}$/;
let cvvCheck = () => {
  if (cvvFilter.test(cvvField.value)) {
     if(cvvField.className == "error" && cvvField.previousSibling != null){
      cvvField.className = "";
      cvvField.previousSibling.remove();
      return true;
    } else {
      return true;
    }
  } else if (cvvFilter.test(cvvField.value) != true) {
    if (cvvField.className != "error") {
      cvvField.className = "error";
      cvvField.insertAdjacentHTML('beforebegin', `<p class="error--text_red">Please enter a valid CVV</p>`);
      return false;
    } else {
      return false;
    }
  }
}

// The main card check function, the 3 functions are called initally to provide all errors at once rather than one at a time
// Again might be able to refactor this so several functions do not run and make it more efficient
let cardCheck = () => {
  cardNumberCheck();
  zipCheck();
  cvvCheck();
  if (paymentSelector.value != "credit card") {
    return true;
  } else if (!cardNumberCheck() || !zipCheck() || !cvvCheck()) {
    return false;
  } else {
    return true;
  }
}


// Form Submit Section
let submitButton = document.querySelector('.submitButton');
let form = document.querySelector('.main-form');

// Add event listener to form submit
// Again, run all functions to show all errors at once
// If there are errors preventDefault
// If not let it submit as normal
form.addEventListener("submit", (e) => {
  nameCheck();
  emailCheck();
  activitiesError();
  cardCheck();
  if ( !emailCheck() || !nameCheck() || !activitiesError() || !cardCheck()) {
    e.preventDefault();
  } else if (emailCheck() && nameCheck() && activitiesError() && cardCheck()) {
    form.submit();
  }
});
