var removing = false;
var noteImage = new Image(96,93);
noteImage.src = 'noteDrag.png';
var ref;


var matrixItems = document.getElementsByClassName("matrix-item");


document.addEventListener('DOMContentLoaded', function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        
        ref = firebase.database().ref().child(uid);
        var loginHeader = document.getElementById("loginHeader");
        loginHeader.innerHTML = displayName.substring(0, displayName.indexOf(' ')) + "'s Matrix";
        populateMatrix();
      } else {
        // User is signed out.
        window.location.href = "login.html";
      }
    });
}, false);




function addItem(){
    info = document.getElementById("info").value;
    category = document.getElementById("category").value;
    
    addItemToDatabase(info, category);
    clearMatrix();
    populateMatrix(category);
}

function deleteItem(item_id){
    if(removing == true) {
        console.log(item_id + ' deleted');
        removeElement(item_id);
    }
}

function remove(){
    removeBtn = document.getElementById("remove-button");

    switch(removeBtn.style.borderStyle) {
        case "":
            removing = true;
            removeBtn.style.borderStyle = "inset";
            break;
        case "none":
            removing = true;
            removeBtn.style.borderStyle = "inset";
            break;
        case "inset":
            removing = false;
            removeBtn.style.borderStyle = "none";
            break;
    }
}

function removeElement(id) {
    var doNowRef = ref.child("Do Now");
    doNowRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
           if(id == item.custom_id){
               doNowRef.child(childSnapshot.key).remove();
               clearMatrix("Do Now");
                populateMatrix();
            }
        });
    });
    
    var scheduleRef = ref.child("Schedule");
    scheduleRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
           if(id == item.custom_id){
               scheduleRef.child(childSnapshot.key).remove();
               clearMatrix("Schedule");
                populateMatrix();
            }
        });
    });
    
    var delegateRef = ref.child("Delegate");
    delegateRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
           if(id == item.custom_id){
               delegateRef.child(childSnapshot.key).remove();
               clearMatrix("Delegate");
                populateMatrix();
            }
        });
    });
    
    var eliminateRef = ref.child("Eliminate");
    eliminateRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
           if(id == item.custom_id){
               eliminateRef.child(childSnapshot.key).remove();
               clearMatrix("Eliminate");
                populateMatrix();
            }
        });
    });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setDragImage(noteImage, 0,0);
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
    var item = document.getElementById(data);
    
    if(ev.target.id == "topLeftContainer"){
        removeElement(data);
        addItemToDatabase(item.innerHTML, "Do Now");
    }
    
    if(ev.target.id == "topRightContainer"){
        removeElement(data);
        addItemToDatabase(item.innerHTML, "Schedule");
    }
    
    if(ev.target.id == "bottomLeftContainer"){
        removeElement(data);
        addItemToDatabase(item.innerHTML, "Delegate");
    }
    
    if(ev.target.id == "bottomRightContainer"){
        removeElement(data);
        addItemToDatabase(item.innerHTML, "Eliminate");
    }
    
    populateMatrix();
}

function populateMatrix(){
    clearMatrix("Do Now");
    clearMatrix("Schedule");
    clearMatrix("Delegate");
    clearMatrix("Eliminate");
    var doNowRef = ref.child("Do Now");
    doNowRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
            addItemToHTML(item.item, "Do Now", item.custom_id);
        });
    });
    
    var scheduleRef = ref.child("Schedule");
    scheduleRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
            addItemToHTML(item.item, "Schedule", item.custom_id);
        });
    });
    
    var delegateRef = ref.child("Delegate");
    delegateRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
            addItemToHTML(item.item, "Delegate", item.custom_id);
        });
    });
    
    var eliminateRef = ref.child("Eliminate");
    eliminateRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
            addItemToHTML(item.item, "Eliminate", item.custom_id);
        });
    });
}

function addItemToHTML(info, category, custom_id){
    var item_html = "<span class='badge badge-light matrix-item' draggable='true'  ondragstart='drag(event)'" + "id=" + "'" + custom_id + "' onclick='deleteItem(this.id)'>" + info + "</span>";
    
    if(category == "Do Now"){
        document.getElementById("topLeftContainer").innerHTML += item_html;
    }
    
    if(category == "Schedule"){
        document.getElementById("topRightContainer").innerHTML += item_html;
    }
    
    if(category == "Delegate"){
        document.getElementById("bottomLeftContainer").innerHTML += item_html;
    }
    
    if(category == "Eliminate"){
        document.getElementById("bottomRightContainer").innerHTML += item_html;
    }
}

function clearMatrix(category){
    if(category == "Do Now"){
        document.getElementById("topLeftContainer").innerHTML = "";
    }
    
    if(category == "Schedule"){
        document.getElementById("topRightContainer").innerHTML = "";
    }
    
    if(category == "Delegate"){
        document.getElementById("bottomLeftContainer").innerHTML = "";
    }
    
    if(category == "Eliminate"){
        document.getElementById("bottomRightContainer").innerHTML = "";
    }
}

function addItemToDatabase(info, category){
    var custom_id = "matrix-item-" + (Math.random().toString(36).substr(2, 9)).toString();
    
    var newItem = ref.child(category).push();
    
    newItem.set({
        item: info,
        custom_id: custom_id
    });
}

function logout(){
    firebase.auth().signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened
      });
}



function styleModal(quadrant){
    var header = document.getElementsByClassName("modal-header")[0];
    
    var body = document.getElementsByClassName("modal-body")[0];
    
    var footer = document.getElementsByClassName("modal-footer")[0];
    
    if(quadrant == "Do Now"){
        header.style.backgroundColor = "#94cf60";
        body.style.backgroundColor = "#b0dc89";
        footer.style.backgroundColor = "#94cf60";
    }
    
    if(quadrant == "Schedule"){
        header.style.backgroundColor = "#3199b8";
        body.style.backgroundColor = "#4ab0cf";
        footer.style.backgroundColor = "#3199b8";
    }
    
    if(quadrant == "Delegate"){
        header.style.backgroundColor = "#ebaa50";
        body.style.backgroundColor = "#efbd76";
        footer.style.backgroundColor = "#ebaa50";
    }
    
    if(quadrant == "Eliminate"){
        header.style.backgroundColor = "#b03146";
        body.style.backgroundColor = "#cd4c61";
        footer.style.backgroundColor = "#b03146";
    }
}