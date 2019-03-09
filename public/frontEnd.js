/************************************************
Basics
************************************************/
function setFocus(theID) {
    document.getElementById(theID).focus();
}
        
function setVisible(ID) {
    var element = document.getElementById(ID);
    element.style.visibility = "visible";
}

function setHidden(ID) {
    var element = document.getElementById(ID);
    element.style.visibility = "hidden";
}

function reseterrors() {
    var array = document.getElementsByClassName("error");
    var i = 0;
    for (; i < array.length; i++) {
        array[i].style.visibility = "hidden";
    }
}

/************************************************
Specific types of fields
************************************************/
function validateNumber(text, texterror) {
    var data = document.getElementById(text).value;
     
    if (data.length == 0 || isNaN(data)) {
        setVisible(texterror);
        return false;
    }
    else setHidden(texterror);
    return true;
}