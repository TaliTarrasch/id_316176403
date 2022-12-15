
// make a navigation nav bar
var currentPage = window.location.pathname;

const pageActive = document.querySelectorAll("nav a").forEach(link => {
    if (link.href.includes(`${currentPage}`)) {
        link.classList.add("active");
    }
});
// console.log(pageActive);




//validation
const form_signUp = document.getElementById('form_signUp');
const nameInput = document.getElementById('name1');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const password1Input = document.getElementById('password1');
const password2Input = document.getElementById('password2');
const msg = document.querySelector('.msg');
const userList = document.querySelector('.users');

const onSubmit_createUsers = (e) => {
    e.preventDefault()

    if (nameInput.value === '' || lastNameInput.value === '' || emailInput.value === '' ||
        password1Input.value === '' || password2Input.value === '') {
        msg.innerHTML = 'please enter all fields';
        msg.classList.add('error');
        setTimeout(() => {
            msg.innerHTML = '';
            msg.classList.remove('error');
        }, 3000)
    }
    else if (password1Input.value != password2Input.value) {
        msg.innerHTML = 'passwods dosent match';
        msg.classList.add('error');
    }


    else {
        console.log('success')
        const li_createUsers = document.createElement('li');
        li_createUsers.innerHTML = `${nameInput.value}: ${lastNameInput.value}: ${emailInput.value}: ${password1Input}: ${password2Input} `
        userList.appendChild(li_createUsers);

        nameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';
        password1Input.value = '';
        password2Input.value = '';

        msg.innerHTML = '';
        msg.classList.remove('error');

    }

}
if (form_signUp) {
    form_signUp.addEventListener('submit', onSubmit_createUsers)
}


const form_logIn = document.getElementById('form_logIn');
const email_logIn = document.getElementById('email_logIn');
const password_logIn = document.getElementById('password_logIn');
const msg_logIn = document.querySelector('.msg_logIn')

const onSubmit_logIn = (e) => {
    e.preventDefault();
    if (email_logIn.value === '' || password_logIn.value === '') {
        msg_logIn.innerHTML = 'please enter all fields';
        msg_logIn.classList.add('error');
        setTimeout(() => {
            msg_logIn.innerHTML = '';
            msg_logIn.classList.remove('error');
        }, 3000)

    }
    else{

        email_logIn.value = '';
        password_logIn.value = '';

        msg_logIn.innerHTML = '';
        msg_logIn.classList.remove('error');

    }

}

if (form_logIn){
form_logIn.addEventListener('submit', onSubmit_logIn)
}


const form_main = document.getElementById('form_main');
const location_main = document.getElementById('location_main');
const date_main = document.getElementById('date_main');
const time_main = document.getElementById('time_main');
const msg_main = document.querySelector('.msg_main');

const onSubmit_main = (e) => {
    e.preventDefault();


    if( location_main.value === '' || date_main.value === '' || time_main.value === '' ){
        msg_main.innerHTML = 'please enter all fields';
        msg_main.classList.add('error');
        setTimeout(() => {
            msg_main.innerHTML = '';
            msg_main.classList.remove('error');
        }, 3000)

    }
    
    else{
        location_main.value = '';
        date_main.value = '';
        time_main.value = '';

        msg_main.innerHTML = '';
        msg_main.classList.remove('error');
    }
}


if (form_main){
    form_main.addEventListener('submit', onSubmit_main)
    }
    
