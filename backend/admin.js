function enter(){
    a = document.getElementById("username").value;
    b = document.getElementById("password").value;
    if(a = '' && b == ''){
        alert('Welcome Admin!')
        window.location = "admin.html";
    }
    else{
        alert('Incorrect Credentials')
        return false;
    }
}
