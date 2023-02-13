// make a navigation nav bar
var currentPage = window.location.pathname;

const pageActive = document.querySelectorAll("nav a").forEach((link) => {
    if (link.href.includes(`${currentPage}`)) {
        link.classList.add("active");
    }
});
// console.log(pageActive);

//validation
const form_signUp = document.getElementById("form_signUp");
const nameInput = document.getElementById("name1");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const password1Input = document.getElementById("password1");
const password2Input = document.getElementById("password2");
const msg = document.querySelector(".msg");

const onSubmit_createUsers = async (e) => {
    e.preventDefault();

    if (
        nameInput.value === "" ||
        lastNameInput.value === "" ||
        emailInput.value === "" ||
        password1Input.value === "" ||
        password2Input.value === ""
    ) {
        msg.innerHTML = "please enter all fields";
        msg.classList.add("error");
        setTimeout(() => {
            msg.innerHTML = "";
            msg.classList.remove("error");
        }, 3000);
    } else if (password1Input.value != password2Input.value) {
        msg.innerHTML = "passwods dosent match";
        msg.classList.add("error");
    } else {
        const apiRes = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname: `${nameInput.value} ${lastNameInput.value}`,
                email: emailInput.value,
                password: password1Input.value,
            }),
        }).catch((error) => {
            console.log(error);
            alert("A server error occurred while trying to register user");
        });

        console.log(apiRes);

        nameInput.value = "";
        lastNameInput.value = "";
        emailInput.value = "";
        password1Input.value = "";
        password2Input.value = "";

        msg.innerHTML = "";
        msg.classList.remove("error");

        if (apiRes?.status !== 200) {
            console.log(apiRes);
            alert("A server error occurred while trying to register user");
        } else {
            window.location = "login.html";
            alert("Success! the user has been registered successfully");
        }
    }
};
if (form_signUp) {
    form_signUp.addEventListener("submit", onSubmit_createUsers);
}

const form_logIn = document.getElementById("form_logIn");
const email_logIn = document.getElementById("email_logIn");
const password_logIn = document.getElementById("password_logIn");
const msg_logIn = document.querySelector(".msg_logIn");

const onSubmit_logIn = async (e) => {
    e.preventDefault();
    if (email_logIn.value === "" || password_logIn.value === "") {
        msg_logIn.innerHTML = "please enter all fields";
        msg_logIn.classList.add("error");
        setTimeout(() => {
            msg_logIn.innerHTML = "";
            msg_logIn.classList.remove("error");
        }, 3000);
    } else {
        const apiRes = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email_logIn.value,
                password: password_logIn.value,
            }),
        }).catch((error) => {
            console.log(error);
            alert("A server error occurred while trying to login");
        });

        console.log(apiRes);

        email_logIn.value = "";
        password_logIn.value = "";

        msg_logIn.innerHTML = "";
        msg_logIn.classList.remove("error");

        if (apiRes?.status !== 200) {
            alert("Bad credentials! email or password are incorrect");
        } else {
            const res = await apiRes.json();
            sessionStorage.setItem("email", res.email);
            sessionStorage.setItem("token", res.token);
            window.location = "index.html";
        }
    }
};

if (form_logIn) {
    form_logIn.addEventListener("submit", onSubmit_logIn);
}

const form_main = document.getElementById("form_main");
const location_main = document.getElementById("location_main");
const time_main = document.getElementById("time_main");
const msg_main = document.querySelector(".msg_main");

const onSubmit_main = async (e) => {
    e.preventDefault();

    if (location_main.value === "" || time_main.value === "") {
        msg_main.innerHTML = "please enter all fields";
        msg_main.classList.add("error");
        setTimeout(() => {
            msg_main.innerHTML = "";
            msg_main.classList.remove("error");
        }, 3000);
    } else {
        const apiRes = await fetch(
            `http://localhost:3000/salons/search?address=${location_main.value}&time=${time_main.value}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        ).catch((error) => {
            console.log(error);
            alert("A server error occurred while trying to search");
        });

        console.log(apiRes);

        location_main.value = "";
        time_main.value = "";

        msg_main.innerHTML = "";
        msg_main.classList.remove("error");

        if (apiRes?.status !== 200) {
            alert("A server error occurred while trying to search");
        } else {
            const res = await apiRes.json();
            console.log(res);
            document.getElementById("search-title").style.display = "block";
            for (let i = 0; i < res.length; i++) {
                const d = res[i];
                let rating = "";
                for (let i = 0; i < d.rating; i++) {
                    rating +=
                        '<img src="/static/star.png" alt="" class="starImg">';
                }
                let openingHours = "";
                for (let i = 0; i < d.openingHours.length; i++) {
                    openingHours += `<input class="bookHour" type="radio" name="hour" value="${d.openingHours[i]}">${d.openingHours[i]}`;
                }

                document.getElementById("search-salons").innerHTML += `
                <div class="salon" id="${d._id}" data-name="${d.salonName}">
                    <img src="${d.logo}" alt="A saoln">
                    <div class="right_side">
                        <h2 class="salon__headline">${d.salonName}</h2>
                        <ul class="salon__list">
                            <li class="rating">Rating: ${rating}</li>
                            <li>Address: ${d.address}</li>
                        </ul>
                        <p>Opening Hours:</p>
                        <div class="hours">
                            ${openingHours}
                        </div>
                        <button class="bookbutton" onclick="bookOrder('${d._id}')">BOOK NOW</button>
                    </div>
                </div>
                `;
            }
        }
    }
};

if (form_main) {
    form_main.addEventListener("submit", onSubmit_main);
}

async function bookOrder(id) {
    const salonElem = document.getElementById(id);
    const selectedHour = salonElem.querySelector(
        'input[type="radio"][name="hour"]:checked'
    )?.value;
    if (!selectedHour) {
        alert("Please select hour first!");
        return;
    } else {
        let date = new Date();
        date.setHours(
            selectedHour.split(":")[0],
            selectedHour.split(":")[1],
            0
        );

        const apiRes = await fetch("http://localhost:3000/orders/insert", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userEmail: sessionStorage.getItem("email"),
                salonName: salonElem.getAttribute("data-name"),
                date: date.getTime(),
            }),
        }).catch((error) => {
            console.log(error);
            alert("A server error occurred while trying to register user");
        });

        if (apiRes?.status !== 200) {
            console.log(apiRes);
            alert("A server error occurred while trying to insert order");
        } else {
            window.location = "my-orders.html";
            alert("Success! the order has been created successfully");
        }
    }
}
