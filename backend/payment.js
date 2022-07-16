const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var transactionDB = firebase.database().ref("Transactions");

//upload img
document.getElementById("transaction-form").addEventListener("submit", submitTransaction);

function submitTransaction(e){
    e.preventDefault();

    var transac_mode = chosen_transac();
    var cust_name = getElementVal("cust_name");
    var location = getElementVal("location");
    var contact_num = getElementVal("contact-number");
    var date = getElementVal("date");
    var car = document.querySelector("#car").textContent;

    const storage = firebase.storage();
    const storageRef = storage.ref();

    var file = document.querySelector('#img_id').files[0];
    var name = file.name;

    var metadata = {
        contentType: file.type
    }

    var uploadTask = storageRef.child(name).put(file, metadata);

    uploadTask.then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => { 
        if(transac_mode == ""){
            return alert('Choose a transaction');
        }
        else if(transac_mode == "meetup" && (name == "" || location == "" || contact_num == "" || date == "")){
            return alert('Complete the required fields');
        }
        else if(transac_mode == "onsite" && (name == "" || contact_num == "" || date == "")){
            return alert('Complete the required fields');
        }
        else{
            saveTransac(transac_mode, car, cust_name, location, contact_num, date, url);
            alert('Transaction Submitted!');
            document.getElementById("transaction-form").reset();
        }
    })
    
}

const saveTransac = (transac_mode, car, cust_name, location, contact_num, date, url) => {
    var newTransacForm = transactionDB.push();

    newTransacForm.set({
        mode : transac_mode,
        car: car,
        customer_name : cust_name,
        location : location,
        contact_num : contact_num,
        preferred_date : date,
        image: url
    })
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}

function chosen_transac(){
    let mode = document.forms[0];
    let txt = "";
    let i;

    for (i=0; i < mode.length; i++){
        if (mode[i].checked){
            txt = txt + mode[i].value;
        }
    }
    return txt;
}

