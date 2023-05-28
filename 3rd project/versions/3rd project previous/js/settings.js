const storage = firebase.storage();
const auth = firebase.auth();
const db = firebase.firestore();

var disableInp = document.getElementById('disabledTextInput')
function retreivemails(){
    const userId = auth.currentUser.uid;
	const filesCollectionRef = db.collection("users");
    // const filesCollectionRef = db.collection("users");
    filesCollectionRef.get()
    // console.log(filesCollectionRef.get())?
    .then((querySnapshot) => {
        // var filesArray = [];
		querySnapshot.forEach((doc) => {
            // Get the data from each document
			const fileData = doc.data();
            disableInp.setAttribute("placeholder",fileData['email'])
            console.log(fileData['email']);
		});
		
		// Do something with the files array
		// console.log(filesArray);
	})
	.catch((error) => {
		console.error("Error retrieving files:", error);
	});	
}



setTimeout(retreivemails,1000)