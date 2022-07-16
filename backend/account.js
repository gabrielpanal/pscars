const firebaseConfig = {
    apiKey: "AIzaSyDzstwmX3Y-3Gv92EsTyHcJRcVOSoBv6Co",
    authDomain: "pscars-df4a5.firebaseapp.com",
    databaseURL: "https://pscars-df4a5-default-rtdb.firebaseio.com",
    projectId: "pscars-df4a5",
    storageBucket: "pscars-df4a5.appspot.com",
    messagingSenderId: "659550077144",
    appId: "1:659550077144:web:32b5e20d01f2c37002d7ad"
  };

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var transactionDB = firebase.database().ref("transaction");

function register(e){
    e.preventDefault();

    var username = getElementVal("usernam_input");
    var email = getElementVal("email_input");
    var password = getElementVal("password");

    if(transac_mode == null){
        alert('Choose a transaction')
    }

    saveTransac(transac_mode, name, location, contact_num, date);
    alert('Transaction Submitted!');
    document.getElementById("transaction-form").reset();
}

const saveTransac = (transac_mode, location, contact_num, date) => {
    var newTransacForm = transactionDB.push();

    newTransacForm.set({
        mode : transac_mode,
        location : location,
        contact_num : contact_num,
        date : date
    })
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}