var MenuList = document.getElementById("MenuList");
var LoginForm = document.getElementById("LoginForm");
var RegisterForm = document.getElementById("RegisterForm");
var indicator = document.getElementById("indicator");
            
MenuList.style.maxHeight = "0px";

function toggleMenu(){
    if(MenuList.style.maxHeight == "0px"){
        MenuList.style.maxHeight = "200px";
    }
    else{
        MenuList.style.maxHeight = "0px";
    }
}
          
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let btnBack = document.querySelector(".back-btn");
btnBack.addEventListener('click', () => {
    window.history.back();
});


/*
const firebaseConfig = {
    apiKey: "AIzaSyDzstwmX3Y-3Gv92EsTyHcJRcVOSoBv6Co",
    authDomain: "pscars-df4a5.firebaseapp.com",
    databaseURL: "https://pscars-df4a5-default-rtdb.firebaseio.com",
    projectId: "pscars-df4a5",
    storageBucket: "pscars-df4a5.appspot.com",
    messagingSenderId: "659550077144",
    appId: "1:659550077144:web:32b5e20d01f2c37002d7ad"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

function registerUser(){
    username = document.getElementById('username_input').value
    email = document.getElementById('email_input').value
    password = document.getElementById('password_input').value

    alert(username);
    
    /*if(validateUsername(username) == false){
        alert("Valid username:\n- must only contain alphanumeric\n- must be atleast 5 characters\n- must not have spaces");
        return;
    }
    if(validateEmail(email) == false){
        alert("Invalid Email!");
        return;
    }
    if(validatePassword(password) == false){
        alert("Password must be at least 6 characters.");
        return;
    }
    if(validateField(username) == false || validateField(email) == false || validateField(password) == false){
        alert("Fill up all the fields!");
        return;
    }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = db.ref()

    // Create User data
    var user_data = {
      email : email,
      username : username,
      password : password,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}
// Validate Functions
function validateEmail(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      return true
    } 
    else {
      return false
    }
}
  
function validatePassword(password) {
    if (password < 6) {
      return false
    } 
    else {
      return true
    }
}
  
function validateUsername(username) {
    expression = /^[a-zA-Z0-9]{5,}$/
    if (expression.test(username) == true) {
        return true
    } 
    else {
        return false
    }
}

function validateField(field){
    if (field == null) {
        return false
    }
    
    if (field.length <= 0) {
        return false
    } 
    else {
        return true
    }
}*/
