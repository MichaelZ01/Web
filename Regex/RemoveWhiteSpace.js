let string = "       Hello World!       "


// Alternative to String.protoype.trim() method
console.log("Trim:"+ string.trim());

function RemoveWhiteSpace() {

    let regex = /^\s+|\s+$/g;
    let result = string.replace(regex, "");

    console.log("RemoveWhiteSpace:" + result);
}

RemoveWhiteSpace();

