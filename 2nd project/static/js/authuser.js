if(localStorage.getItem("loginflag") == true){
    // window.location.replace("https://dadabhainoorejee.web.app/products.html");
    window.location.replace("./dashboard.html");
}   
var email = document.getElementById("email")
var pass = document.getElementById("pass")
    var key = "users"
    var key1 = 0
    var key2 = 0
    var key3 = 0
    var key4 = 0
    var key5 = 0
    var keycount =key5 +"" + key4 +""+key3+""+key2+""+key1
    // firebase.database().ref("admin").on("child_added",function(data){
    //     var data = data.val()
    //     // keycount = data.key
    //     // key1 = keycount[4]
    //     // key2 = keycount[3]
    //     // key3 = keycount[2]
    //     // key4 = keycount[1]
    //     // key5 = keycount[0]
    // })
    var logins
    function login(){
        var emails = email.value
        var passs = pass.value

    
    logins = 0
    // if(email.value == '' || pass.value == ''){
    //     alert("Please fill the required fields!")
    //     return
    // }
    firebase.database().ref("admin").on("child_added",function(data){
        var data = data.val()
        if(emails == 'admin' &&  passs == data.pass){
            logins = 1
            localStorage.setItem("loginflag", true);
            localStorage.setItem("loginUser", 'admin');
            window.location.replace("./admindashboard.html");

        }
        if(emails == data.name &&  passs == data.pass && data.name != 'admin'){
            localStorage.setItem("loginflag", true);
            logins = 1
            window.location.replace("./dashboard.html");
            // window.location.replace("https://dadabhainoorejee.web.app/products.html");
        }
        
    })
    email.value = ''
    pass.value = ''
    setTimeout(logError,2000)
    
}
function logError(){
    if(logins == 0){
            alert("Wrong User Information!")
    }
    
}
// function createusr() {
//     var email = document.getElementById("inputEmail")
//     var pass = document.getElementById("inputPassword")

   
//     key1++
//     if(key1 > 9){
//         key1 = 0
//         key2++
//     }else if(key2 > 9){
//         key2 = 0
//         key3++
//     }else if(key3 > 9){
//         key3 = 0
//         key4++
//     }else if(key4 > 9){
//         key4 = 0
//         key5++
//     }
//     var keycount =key5 +"" + key4 +""+key3+""+key2+""+key1
//     var keyid = key+keycount.toString()

//     var prodObj = {}

//     prodObj["email"] = email.value
//     prodObj["pass"] = pass.value
//     prodObj["key"] = keycount

//     email.value = ""
//     pass.value = ""

//     firebase.database().ref("users").child(keyid).set(prodObj)
//     alert("User Created!")
// }
// // function logout(){
// //     localStorage.setItem("loginflag",false)
// //     window.location.replace("file:///F:/musab/index.html");
// // }