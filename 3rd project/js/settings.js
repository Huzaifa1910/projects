const storage = firebase.storage();
const auth = firebase.auth();
const db = firebase.firestore();
var mails 

var disableInp = document.getElementById('disabledTextInput')
function retreivemails() {
	const user = auth.currentUser;

	if (user) {
	  const email = user.email;
	  mails = email
	  disableInp.setAttribute("placeholder", email);
	  console.log(email);
	} else {
	  console.log("No user is currently logged in.");
	  window.location.replace("../html/login.html")
	}
  }


setTimeout(retreivemails,1000)

function promptForCredentials() {
	// Prompt the user to enter their sign-in credentials
	const email = mails;
	const password = prompt(`Email: ${email} \n Enter your Password to delete the account:`)
	const credential = firebase.auth.EmailAuthProvider.credential(email, password);
	// Return the entered credentials as an object
	return credential;
  }
  


// Delete account and data
function deleteAccount(k) {
	// Get the currently logged-in user
	const user = auth.currentUser;
	// var s
	// TODO(you): prompt the user to re-provide their sign-in credentials
	// Prompt the user to confirm the account deletion
	const confirmed = confirm('Are you sure you want to delete your account? This action is irreversible.');
	if (confirmed) {
	// TODO(you): prompt the user to re-provide their sign-in credentials
	const credential = promptForCredentials();
	
	user.reauthenticateWithCredential(credential).then(() => {
		// console.log(user.reauthenticateWithCredential(credential))
		console.log("authenticated")
		// s = 1
		// User re-authenticated.
		user.delete()
		.then(() => {
			// Account deleted successfully
			console.log('Account deleted successfully');
			k = true
			// window.location.href = '../html/login.html'
			// Redirect to a different page or perform any other necessary actions
		})
		.catch((error) => {
			// An error occurred while deleting the account
			console.error('Error deleting account:', error);
			k = false
		});
		return(k)
		
	}).catch((error) => {
		// console.log(user.reauthenticateWithCredential(credential))
		// An error occurred
		// ...
		// s = 0
		console.log(error)
		// return false
	});
	  // Delete the user account
	}
  }




  async function deleteFilesCollection(userId) {
  try {
	const user = auth.currentUser;

	// console.log("hello")
	// return
    const collectionRef = db.collection("users").doc(userId).collection("files");

    // Retrieve all documents in the collection
    const querySnapshot = await collectionRef.get();

    // Delete each document within the collection
	console.log(user.uid)
    const deletionPromises = querySnapshot.docs.map((doc) => doc.ref.delete());
    await Promise.all(deletionPromises);
	await db.collection("users").doc(user.uid).delete();
    console.log("Files collection deleted.");
  } catch (error) {
    console.error("Error deleting files collection:", error);
    throw error;
  }
}

  
// Function to delete the bucket for a user
async function deleteBucketForUser(bucketName) {
	try {
		const bucketRef = storage.ref().child(bucketName);
		
		// List all files within the folder
		const files = await bucketRef.listAll();
		// Delete each file within the folder
		await Promise.all(files.items.map((fileRef) => fileRef.delete()));
		
		// Delete the folder itself
		//   await bucketRef.delete();
		bucketRef.delete()
		
		console.log(`Bucket ${bucketName} deleted.`);
	} catch (error) {
		console.error("Error deleting bucket:", error);
		throw error;
	}
}

  
  
  // Example usage
// const userId = "123456"; // Replace with the user ID or the bucket name
const deleteButton = document.querySelector("#delete-button");
deleteButton.addEventListener("click", function() {
var del
deleteAccount(del)
// console.log(del)
// console.log("Working deleting")
const userId = auth.currentUser.uid;
const bucketName = `user-${userId}`;
deleteFilesCollection(userId);
deleteBucketForUser(bucketName);
// Additional logic or actions after the bucket deletion
// setTimeout(window.location.href = '../html/login.html',10000)
});
