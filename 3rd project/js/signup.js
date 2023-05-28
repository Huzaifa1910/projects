var valList = []
firebase.initializeApp(firebaseConfig);

var email = document.getElementById('email')
var pass = document.getElementById('pass')

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


  // firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
// const auth = firebase.auth();
const db = firebase.firestore();

// Function to create a bucket for a user
async function createBucketForUser(userId) {
  try {
    const bucketName = `user-${userId}`;
    await storage.ref().child(bucketName).put(null);
    console.log(`Bucket ${bucketName} created for user ${userId}.`);
    return bucketName;
  } catch (error) {
    console.error("Error creating bucket:", error);
    throw error;
  }
}

// Signup functionality
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = signupForm["email"].value;
  const password = signupForm["password"].value;

  try {
    // Create user with email and password
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Store user data in Firestore
    const userData = {
      email: email,
      pageCount: 0,
      id: user.uid,
      // Other user properties
    };
    await db.collection("users").doc(user.uid).set(userData);

    // Create bucket for the user
    const userBucketName = await createBucketForUser(user.uid);

    alert("User registered successfully");
    window.location.href = "./login.html"
    // console.log("User bucket name:", userBucketName);

    // Additional logic or redirection after signup
  } catch (error) {
    alert(`Signup error: ${error}`);
  }
});
