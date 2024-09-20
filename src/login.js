console.log("login loaded");

/* Global vars */

let username = document.querySelector("#username");
let email = document.querySelector("#email");
let pw2 = document.querySelector("#pw2");
let pw1 = document.querySelector("#pw1");
let theForm = document.querySelector("form");
let searchSpinner = document.querySelector(".username img");
let usernameError = document.querySelector(".username-error");
let emailError = document.querySelector(".email-error");
let pw1Error = document.querySelector(".pw1-error");
let pw2Error = document.querySelector(".pw2-error");
let active = [];

/* Event Listeners */
theForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchUsername(username.value);
    checkEmail(email.value);
    checkPw1(pw1.value);
    checkPw2(pw2.value, pw1.value);
    let errors = document.querySelectorAll(".error");
    if(errors.length == 0) {
        alert("success, form submitted!");
    } else {
        alert("ERROR, form failed!");
    }
});

username.addEventListener("focusout", () => {
    console.log("username focus out event");
    searchUsername(username.value);
});
email.addEventListener("focusout", () => {
    console.log("email focus out event");
    checkEmail(email.value);
});
pw1.addEventListener("focusout", () => {
    console.log("pw1 focus out event");
    checkPw1(pw1.value);
});
pw2.addEventListener("focusout", () => {
    console.log("pw2 focus out event");
    checkPw2(pw2.value, pw1.value);
});

username.addEventListener("keyup", () => {
    active.push(true);
    console.log(active);
    setTimeout(()=> {
        active.pop();
        if(active.length == 0) {
            console.log("start search");
            searchUsername(username.value);
        }
    }, 1500);

});


/* Script Functions */

function checkEmail(val) {
    if(val.includes("@") != true) {
        emailError.classList.add("error");
    } else {
        emailError.classList.remove("error");
    }
}

function checkPw1(val) {
    if(val.length < 5 || val.length > 20) {
        pw1Error.classList.add("error");
    } else {
        pw1Error.classList.remove("error");
    }
}

function checkUsername(val) {
    if(val.length < 5 || val.length > 20) {
        usernameError.classList.add("error");
    } else {
        usernameError.classList.remove("error");
    }
}

function checkPw2(val1, val2) {
    if(val1 != val2) {
        pw2Error.classList.add("error");
    } else {
        pw2Error.classList.remove("error");
    }
}

function searchUsername(val) {
    console.log(val);
    searchSpinner.classList.add("show");
    let url = "https://dummyjson.com/users";
    let xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.send();
    xhr.onload = function() {
        if(this.status == 200) {
            let results = JSON.parse(this.response);
            console.log(results);
            searchSpinner.classList.remove("show");
            let existingUsernames = results.users.map((item) => {
                return item.firstName.toLowerCase();
            });
            console.log(existingUsernames);
            if(existingUsernames.includes(val.toLowerCase())) {
                console.log("this username is taken!");
                usernameError.classList.add("show");
                usernameError.textContent = "This username is taken!";
                username.classList.add('border');
                username.classList.add('border-danger');
                username.classList.remove('border-success');
            } else {
                console.log("this username is FREE!");
                usernameError.classList.remove("show");
                username.classList.add('border');
                username.classList.add('border-success');
                username.classList.remove('border-danger');
                checkUsername(val);
            }
        }
    }
}
