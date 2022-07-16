function enter(){
    a = document.getElementById("username").value;
    b = document.getElementById("password").value;
    if(a = 'pscars-admin' && b == '112233'){
        alert('Welcome Admin!')
        window.location = "admin.html";
    }
    else{
        alert('Incorrect Credentials')
        return false;
    }
}