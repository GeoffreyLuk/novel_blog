// console.log("Hello world")
const loginForm = document.querySelector("#login_form")
const signUpForm = document.querySelector("#signup_form")


window.onload = async () => {
    Notiflix.Report.init({plainText: false,
    })
    login()
    signup()
}

function login() {
    loginForm.addEventListener('submit', async (event) => {
        Notiflix.Notify.info('Logging in...');
        event.preventDefault()
        let form = event.target
        let formData = {
            email: form.email.value,
            password: form.password.value
        }
        console.log(formData)
        let res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        let result = await res.json()
        if (res.ok) {
            console.log(res)
            Notiflix.Notify.success(`Success: ${result.message}`);
            window.location.href = "/?message=Login+successful"
        } else {
            Notiflix.Notify.failure(`Error: ${result.message}`);
        }
    })
}

function signup() {
    signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault()
        let correctData = checkData()
        if (correctData === "yes") {
            Notiflix.Notify.info('Signing up...');
            let form = event.target
            let formData = new FormData(form)

            let res = await fetch('/signup', {
                method: "POST",
                body: formData
            })

            let result = await res.json()
            if (res.ok) {
                console.log(res)
                Notiflix.Notify.success(`Success: ${result.message}`);
                window.location.href = "/?message=Successful+signup"
            } else {
                Notiflix.Notify.failure(`Error: ${result.message}`);
            }
            console.log("successful submit")
        } else {
            let message = ''
            correctData.forEach((elem) => {
                message += `${elem}`
                message += '<br/>'
            })
            console.log(message)
            Notiflix.Report.failure(
                'Signup Failure',
                message,
                'Okay',
            );
        }
    })
}





function checkData() {
    let errors = []
    // if (document.querySelector("#").value = ""){
    //     errors.push("")
    // }
    if (!document.querySelector("#signup_first_name").value) {
        errors.push("- Please provide your first name")
    }

    if (!document.querySelector("#signup_last_name").value) {
        errors.push("- Please provide your last name")
    }

    if (!document.querySelector("#signup_email").value) {
        errors.push("- Please provide your last name")
    }

    if (document.querySelector("#signup_email").type != "email") {
        errors.push("- Email must be in a valid email format")
    }
    console.log(errors)
    if (errors.length > 0) {
        return errors
    } else { return "yes" }
}