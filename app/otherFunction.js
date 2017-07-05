function fnSignUp() {
    document.getElementById("signUp").style.display = "block";
    document.getElementById("signUpNone").onclick = function() {
        document.getElementById("signUp").style.display = "none";
    }
}

function fnSignIn() {
    document.getElementById("signIn").style.display = "block";
    document.getElementById("signInNone").onclick = function() {
        document.getElementById("signIn").style.display = "none";
    }
}


var xhr = new XMLHttpRequest();
console.log(xhr);
xhr.open('get', './data.txt', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        var val = xhr.responseText;
        console.log(val);
    }
}
xhr.send(null);


// export.fnSignUp = function() {
//     document.getElementById("signUp").style.display = "block";
//     document.getElementById("signUpNone").onclick = function() {
//         document.getElementById("signUp").style.display = "none";
//     }
// }
//
// export.fnSignIn = function() {
//     document.getElementById("signIn").style.display = "block";
//     document.getElementById("signInNone").onclick = function() {
//         document.getElementById("signIn").style.display = "none";
//     }
// }
