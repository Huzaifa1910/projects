var valList = []
firebase.initializeApp(firebaseConfig);

// var email = document.getElementById('email')
// var pass = document.getElementById('pass')

const auth = firebase.auth();
function checkUser(){


const user = auth.currentUser;

console.log(user)
if (user) {
  // console.log("No user is currently signed in.");
  window.location.href = './upload.html'
}
}
setTimeout(checkUser,1000)
const db = firebase.firestore();

// function SignUp(){
//     try{
//         if(null == localStorage.getItem('users')){
//             console.log("No Users")
//         }
//         else{
//             valList = localStorage.getItem('users')
//         }
        
//     }
//     catch{
//         console.log("No Users")
//     }
//     var valDict = {}
//     for(var i =0; i < valList.length; i++){
//     if(email.value == valList[i].email){
//         alert("Email already Exist")
//         return
//     }
//     }
//     if(pass.value == '' || email.value == ''){
//         alert("Please fill all the fields")
//         return
//     }
//     var s = email.value 
//     console.log(s.length)
//     let count = 0
//     let emailFlag = 0
//     for(var k =0;k<s.length;k++){
//         console.log(s[count])
//         if(s[count] == '@'){
//             valDict['email'] = email.value.toLowerCase()
//             valDict['pass'] = pass.value
//             valList.push(valDict)
//             alert("SignUp Successfully")
//             window.location.assign('../html/upload.html')
//             // localStorage.setItem('users',valList)
//             // console.log(localStorage.getItem('users'))
//             emailFlag = 1
//         }
//         // break
//         count++
//     }
//     if(emailFlag == 0){
//         alert("Please Provide Valid Email Address!")
//     }
    
// }


// function login(){
//     // try{
//     //     if(null == localStorage.getItem('users')){
//     //         console.log("No Users")
//     //     }
//     //     else{
//     //         valList = localStorage.getItem('users')
//     //     }
        
//     // }
//     // catch{
//     //     console.log("No Users")
//     // }
// //     // console.log(valList.length)
// //     for(var i =0; i<valList.length; i++){
// //         email =email.value
// //     if(email.toLowerCase() == valList[i]['email'] && pass.value == valList[i].pass){
// //         window.location.assign('../html/upload.html')
// //     }
// //     else{
// //         alert("Wrong Email Password")
// //     }
// // }
// window.location.assign('../html/upload.html')
// }



//   const storage = firebase.storage();

  // Signup Functionality
  
//   function signup() {
//     const signupForm = document.querySelector("#signup-form");
//     const email = signupForm["email"].value;
//     const password = signupForm["password"].value;
  
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         const userData = {
//           email: user.email,
//           // Other user properties
//         };
    
//         // Store the user data in Firestore
//         db.collection("users").doc(user.uid).set(userData)
//           .then(() => {
//             console.log("User data stored in Firestore");
//           })
//           .catch((error) => {
//             console.error("Error storing user data in Firestore:", error);
//           });
    
//         console.log("User registered successfully");
//         // Additional logic or redirection after signup
//       })
//       .catch((error) => {
//         console.error("Signup error:", error);
//       });
//   }
  
//   // Call the signup function onClick
  // const signupButton = document.querySelector("#signup-button");
  // signupButton.addEventListener("click", signup);
  

  // Initialize Firebase - Include this code in firebase-config.js
// ...

// Login form submit event
// Initialize Firebase - Include this code in firebase-config.js
// ...

function sendPasswordReset() {
  const email = prompt("Enter Your Email for Reset Link:");

  // [START auth_send_password_reset]
  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("Email sent succesfully")
      window.location.reload()
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
  // [END auth_send_password_reset]
}



// Function to handle user login
function login() {
  const loginForm = document.querySelector("#loginForm");

  const email = loginForm["email"].value;
  const password = loginForm["pass"].value;
  // var email = document.getElementById("email").value
  // var password = document.getElementById("pass").value
  // Sign in with email and password
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User login successful
      const user = userCredential.user;
      const uid = user.uid;
      console.log("User ID:", uid);
      console.log("User logged in:", userCredential.user);

      // Redirect to pdf.html
      window.location.href = "upload.html";
    })
    .catch((error) => {
      // User login failed
      console.error("Login error:", error);
      alert("Login failed. Please check your email and password.");
    });
}

// Login form submit event
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get user input values
  // const email = document.getElementById("email").value;
  // const password = document.getElementById("pass").value;

  // Call the login function
  login();
});
