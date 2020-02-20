var removing = false;
var noteImage = new Image(96,93);
noteImage.src = 'noteDrag.png';

var matrixItems = document.getElementsByClassName("matrix-item");


function addItem(){
    info = document.getElementById("info").value;
    category = document.getElementById("category").value;
    
    var custom_id = "matrix-item-" + (Math.random().toString(36).substr(2, 9)).toString();
    
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
    if((ev.target.id == "topLeftContainer") || (ev.target.id == "topRightContainer") || (ev.target.id == "bottomLeftContainer") || (ev.target.id == "bottomRightContainer")){
        ev.target.appendChild(document.getElementById(data));
    }
    
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