var Files = [];
    var FileReaders = [];
    var ImageLinksArray = [];

    const imgdiv = document.getElementById('imagesDiv');
    const selBtn = document.getElementById('selimgbtn');
    const addBtn = document.getElementById('addprodbtn');
    const proglab = document.getElementById('loadlab');

    const name = document.getElementById('nameinp');
    const category = document.getElementById('catinp');
    const description = document.getElementById('desarea');
    const price = document.getElementById('priceinp');

    const external_color = document.getElementById('external_color');
    const internal_color = document.getElementById('internal_color');
    const mileage = document.getElementById('mileage');
    const engine = document.getElementById('engine');
    const fuel = document.getElementById('fuel');
    const transmission = document.getElementById('transmission');
    
    function OpenFileDialog(){
        let inp = document.createElement('input');
        inp.type = 'file';
        inp.multiple = 'multiple';

        inp.onchange = (e) =>{
            AssignImgsToFilesArray(e.target.files);
            CreateImgTags();
        }

        inp.click();
    }

    function AssignImgsToFilesArray(thefiles){
        let num = Files.length + thefiles.length;
        let looplim = (num<=4) ? thefiles.length : (4-files.length);

        for(let i = 0; i < looplim; i++){
            Files.push(thefiles[i]);
        }

        if(num>4) {
            alert('maximum 4 images are allowed');}
    }

    function CreateImgTags(){
        imgdiv.innerHTML='';

        for (let i = 0; i < Files.length; i++){
            FileReaders[i] = new FileReader();

            FileReaders[i].onload = function(){
                var img = document.createElement('img');
                img.id = 'imgNo' + i;
                img.classList.add('imgs');
                img.src=FileReaders[i].result;
                imgdiv.append(img);
            }

            FileReaders[i].readAsDataURL(Files[i]);
        }

    
    }


    function getShortTitle(){
        let namey = name.value.substring(0,50);
        return namey.replace(/[^a-zA-Z0-9]/g,"");
    }

    function IsAllImagesUploaded(){
        return ImageLinksArray.length == Files.length;
    }

    function RestoreBack(){
        selBtn.disabled = false;
        addBtn.disabled = false;
    }

    selBtn.addEventListener('click', OpenFileDialog);
    addBtn.addEventListener('click', UploadAllImages);

    function UploadAllImages(){
        
        if(Files.length == 0){
            alert('Add images of the car');
            return;
        }
        else{
            selBtn.disabled = true;
            addBtn.disabled = true;

            ImageLinksArray = [];

            for (let i=0; i< Files.length; i++){
                UploadAnImage(Files[i], i);
            }
        }
    }

    function UploadAnImage(imgToUpload, imgNo){
        const metadata = {
            contentType: imgToUpload.type
        }

        const storage = getStorage();

        const ImageAddress = "TheImages/"+ getShortTitle() + "/img#"+ (imgNo+1);

        const storageRef = sRef(storage, ImageAddress);
        
        const UploadTask = uploadBytesResumable(storageRef, imgToUpload, metadata);

        UploadTask.on('state_changed', (snapshot) =>{},
        
        (error)=>{
            alert("error: image upload failed");
        },

        ()=>{
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                ImageLinksArray.push(downloadURL);
                if(IsAllImagesUploaded()){
                    UploadAProduct();

                    let inputs = document.querySelectorAll('input');
                    let description = document.querySelectorAll('textarea');

                    inputs.forEach(input => input.value = '');
                    description.forEach(desc => desc.value = '');

                    var elem = document.querySelector('.imgs');
                    var child = elem.lastChild;
                    while (child) {
                        elem.removeChild(child);
                        child = elem.lastChild;
                    }

                }
            });
        }
        );
        
    }

        
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";

    const firebaseConfig = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } 
        from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";
    
    import { getDatabase, ref, set, child, get } 
        from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
    const realdb = getDatabase();


    function UploadAProduct(){
        set(ref(realdb, "Products/" + getShortTitle()),{
            ProductTitle : name.value,
            Category: category.value,
            Description: description.value,
            // Stock: stock.value,
            Price: price.value,
            ExternalColor: external_color.value,
            InternalColor: internal_color.value,
            Mileage: mileage.value,
            Engine: engine.value,
            Fuel: fuel.value,
            Transmission: transmission.value,
            LinksOfImagesArray: ImageLinksArray
        });
        alert("Upload successful!");
        RestoreBack();
    }
