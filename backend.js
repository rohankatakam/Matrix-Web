var removing = false;
var noteImage = new Image(96,93);
noteImage.src = 'noteDrag.png';

var matrixItems = document.getElementsByClassName("matrix-item");


function addItem(){
    info = document.getElementById("info").value;
    category = document.getElementById("category").value;
    
    var custom_id = "matrix-item-" + (Math.random().toString(36).substr(2, 9)).toString();
    
    if(category == "Do Now"){
        document.getElementById("topLeftContainer").innerHTML += 
            "<div class='matrix-item' draggable='true'  ondragstart='drag(event)'" + "id=" + "'" + custom_id + "' onclick='deleteItem(this.id)'>" + info + "</div>";
    }
    
    if(category == "Schedule"){
        document.getElementById("topRightContainer").innerHTML += 
            "<div class='matrix-item' draggable='true'  ondragstart='drag(event)'" + "id=" + "'" + custom_id + "' onclick='deleteItem(this.id)'>" + info + "</div>";
    }
    
    if(category == "Delegate"){
        document.getElementById("bottomLeftContainer").innerHTML += 
            "<div class='matrix-item' draggable='true'  ondragstart='drag(event)'" + "id=" + "'" + custom_id + "' onclick='deleteItem(this.id)'>" + info + "</div>";
    }
    
    if(category == "Eliminate"){
        document.getElementById("bottomRightContainer").innerHTML += 
            "<div class='matrix-item' draggable='true'  ondragstart='drag(event)'" + "id=" + "'" + custom_id + "' onclick='deleteItem(this.id)'>" + info + "</div>";
    }
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
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
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
  ev.target.appendChild(document.getElementById(data));
    
}