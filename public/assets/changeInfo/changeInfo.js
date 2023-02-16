const firstName = document.querySelector("#changeInfo_first_name")
const lastName = document.querySelector("#changeInfo_last_name")
const dob = document.querySelector("#changeInfo_date_of_birth")
const email = document.querySelector("#changeInfo_email")
const icon = document.querySelector("#changeInfo_icon")
const imgPreview = document.querySelector("#image_preview")


window.onload = async () =>{
    // getUserDetails()
}

async function getUserDetails(){
    let res = await fetch('/userInfo')
    let result = await res.json()
    console.log(result);
}

async function previewImage(source){

}