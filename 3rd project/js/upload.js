const fileUploadBox = document.getElementById("file-upload-box");
const fileTable = document.getElementById("file-table");
const fileInput = document.getElementById("file-input");
var filesArray = [];
var urlls = []

// function handleFileUpload(event) {
// 	event.preventDefault();
// 	const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;

// 	for (let i = 0; i < files.length; i++) {
// 		const file = files[i];
// 		const fileRow = document.createElement("tr");
// 		fileRow.setAttribute('class','marginTable')
// 		const fileNameCell = document.createElement("td");
// 		const fileSizeCell = document.createElement("td");
// 		const fileActionCell = document.createElement("td");
// 		const fileName = document.createTextNode(file.name);
// 		const fileSize = document.createTextNode(getFileSizeString(file.size));
// 		const fileLink = document.createElement("button");
// 		const fileLinkText = document.createTextNode("Open");
// 		var c = fileInput.value
// 		fileLink.setAttribute('class','openBtn')
// 		// localStorage.setItem('filepath', c.split("\\")[2])
// 		// console.log(file.size)
// 		// fileLink.href = URL.createObjectURL(file);
// 		// fileLink.target = "_blank";
// 		fileLink.setAttribute('onclick','openFile(this)')
// 		fileLink.appendChild(fileLinkText);
		
// 		fileNameCell.appendChild(fileName);
// 		fileSizeCell.appendChild(fileSize);
// 		fileActionCell.appendChild(fileLink);
		
// 		fileRow.appendChild(fileNameCell);
// 		fileRow.appendChild(fileSizeCell);
// 		fileRow.appendChild(fileActionCell);
		
// 		fileTable.getElementsByTagName("tbody")[0].appendChild(fileRow);
// 	}
// }

function downloadPDF(e){
	// console.log(e.parentNode.parentNode.parentNode.parentNode.children[2].firstChild.value)
	let accessLInk = e.parentNode.parentNode.parentNode.parentNode.children[2].firstChild.value
	window.open(accessLInk,'_blank')
	// const downloadLink = document.createElement('a');
	// downloadLink.href = accessLInk;
	// downloadLink.download = 'filename.ext';
	// downloadLink.style.display = 'none';
	// document.body.appendChild(downloadLink);
	// downloadLink.click();
	// document.body.removeChild(downloadLink);
}

function openFile(e){
	// var path = e.value
	// console.log(e.parentNode.parentNode.firstChild.innerText)
	console.log(e.value)
	localStorage.setItem('filepath',e.value)
	window.open("../html/pdf.html",'_blank')
	// window.location.assign("../html/pdf.html")
}
function getFileSizeString(size) {
	const units = ["B", "KB", "MB", "GB", "TB"];
	let i = 0;
	while (size >= 1024 && i < units.length - 1) {
		size /= 1024;
		i++;
	}
	return size.toFixed(2) + " " + units[i];
}

fileUploadBox.addEventListener("dragover", function(event) {
	event.preventDefault();
	fileUploadBox.classList.add("dragover");
});

fileUploadBox.addEventListener("dragleave", function(event) {
	event.preventDefault();
	fileUploadBox.classList.remove("dragover");
});

// fileUploadBox.addEventListener("drop", handleFileUpload);

// fileInput.addEventListener("change", handleFileUpload);






// const firebaseConfig = {
	// 	// Your Firebase configuration
	//   };
  
	//   firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const auth = firebase.auth();
const db = firebase.firestore();
var userId

db.collection('users').doc(userId).collection('files').onSnapshot((snapshot) => {
	snapshot.docChanges().forEach((change) => {
	  if (change.type === 'added') {
		// Document added
		const fileData = change.doc.data();
		console.log('New file:', fileData);
		// Perform necessary actions with the file data
	  }
	  if (change.type === 'modified') {
		// Document modified
		const fileData = change.doc.data();
		console.log('Modified file:', fileData);
		// Perform necessary actions with the updated file data
	  }
	  if (change.type === 'removed') {
		// Document removed
		const fileId = change.doc.id;
		console.log('File removed:', fileId);
		// Perform necessary actions with the removed file
	  }
	});
  });
  

function retreiveFiles(){
	userId = auth.currentUser.uid;
	console.log(userId)
	const filesCollectionRef = db.collection("users").doc(userId).collection("files");

	// Retrieve all documents from the files collection
	filesCollectionRef.get()
	.then((querySnapshot) => {
		// var filesArray = [];
		querySnapshot.forEach((doc) => {
			// Get the data from each document
			const fileData = doc.data();
			// Add the file data to the array
			filesArray.push(fileData);
		});
		
		// Do something with the files array
		console.log(filesArray);
	})
	.catch((error) => {
		console.error("Error retrieving files:", error);
	});
}
// File upload functionality
// const fileInput = document.querySelector("#file-input");
fileInput.addEventListener("change", async (e) => {	
	const user = auth.currentUser;
	console.log(user)
  if (!user) {
    console.log("No user is currently signed in.");
	window.location.href = './login.html'
    return;
}
const userId = user.uid;
const userBucketName = `user-${userId}`;
// db.collection('users').doc(userId).collection('files').doc().onSnapshot((snapshot) => {
// 	// Handle the data change
// 	const data = snapshot.data();
// 	console.log(data)
// 	// Update your UI or perform any necessary actions
//   });
for(let k =0 ; k<e.target.files.length ; k++){
  const file = e.target.files[k];
  const fileName = file.name;
  const fileSize = getFileSizeString(file.size);
  console.log(userId)
  try {
    // Create a reference to the user's bucket
    const userBucketRef = storage.ref().child(userBucketName);

    // Upload the file to the user's bucket
    const fileRef = userBucketRef.child(fileName);
    await fileRef.put(file);

    console.log("File uploaded successfully");

    // Get the download URL of the uploaded file
    const downloadURL = await fileRef.getDownloadURL();
	var reader = new FileReader();
	reader.onload = function (e) {
	  var arrayBuffer = e.target.result;
	  var pageCount;
	
	  pdfjsLib.getDocument({ data: arrayBuffer }).promise.then(function (pdf) {
		pageCount = pdf.numPages;
		console.log('Page Count:', pageCount);
		localStorage.setItem("pageCount",pageCount)
		// Continue with further actions using the pageCount value
		setTimeout(10000)
		// ...
	  });
	};
	reader.readAsArrayBuffer(file);
    // Save the file metadata to Firestore
	var dataId = await db.collection("users").doc(userId).collection("files").doc()
    const fileData = {
      name: fileName,
	  size: fileSize,
      url: downloadURL,
	  pages: localStorage.getItem("pageCount"),
	  id: dataId.id,
		// Additional file metadata if needed
    };
	await db.collection("users").doc(userId).collection("files").doc(dataId.id).set(fileData)
	// dataId.doc(`folder0${dataId}`).set(fileData);
	// console.log(fileData)
    // await db.collection("users").doc(user.uid).set(userData);
    // await db.collection("users").doc(userId).set(fileData);

	console.log(fileData['url'])

    console.log("File metadata saved to Firestore");
	e.preventDefault();

	const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

	// for (let i = 0; i < files.length; i++) {
		const filea = files[k];
		const fileRow = document.createElement("tr");
		fileRow.setAttribute('class','marginTable')
		const fileNameCell = document.createElement("td");
		const fileSizeCell = document.createElement("td");
		const fileActionCell = document.createElement("td");
		const fileName1 = document.createTextNode(filea.name);
		const fileSize1 = document.createTextNode(getFileSizeString(filea.size));
		const fileLink = document.createElement("button");
		const fileLinkText = document.createTextNode("Open");
	
// Create the main container div
const dropdownContainer = document.createElement('div');
dropdownContainer.classList.add('dropdown');

// Create the dropdown button
const dropdownButton = document.createElement('button');
dropdownButton.classList.add('btn', 'dropdown-toggle');
dropdownButton.type = 'button';
dropdownButton.id = 'dropdownMenuButton';
dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
dropdownButton.setAttribute('aria-expanded', 'false');

// Create the three-dots icon
const threeDotsIcon = document.createElement('i');
threeDotsIcon.classList.add('bi', 'bi-three-dots');

// Append the icon to the button
dropdownButton.appendChild(threeDotsIcon);

// Create the dropdown menu
const dropdownMenu = document.createElement('ul');
dropdownMenu.classList.add('dropdown-menu');
dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuButton');

// Create the "Download" option
const downloadOption = document.createElement('li');
const downloadLink = document.createElement('a');
downloadLink.classList.add('dropdown-item');
downloadLink.href = '#';
downloadLink.setAttribute("onclick","downloadPDF(this)")
downloadLink.textContent = 'Download';
downloadOption.appendChild(downloadLink);

// Create the "delete" option
const deleteOption = document.createElement('li');
const deleteLink = document.createElement('a');
deleteLink.setAttribute("id",fileData['id'])
deleteLink.classList.add('dropdown-item');
deleteLink.href = '#';
deleteLink.textContent = 'Delete';
deleteOption.appendChild(deleteLink);

// Append options to the dropdown menu
dropdownMenu.appendChild(downloadOption);
dropdownMenu.appendChild(deleteOption);

// Append the button and dropdown menu to the container div
dropdownContainer.appendChild(dropdownButton);
dropdownContainer.appendChild(dropdownMenu);



		var c = fileInput.value
		fileLink.setAttribute('class','openBtn')
		fileLink.setAttribute('value',fileData['url'])
		// localStorage.setItem('filepath', c.split("\\")[2])
		// console.log(file.size)
		// fileLink.href = URL.createObjectURL(file);
		// fileLink.target = "_blank";
		fileLink.setAttribute('onclick','openFile(this)')
		fileLink.appendChild(fileLinkText);
		
		fileNameCell.appendChild(fileName1);
		fileSizeCell.appendChild(fileSize1);
		fileActionCell.appendChild(fileLink);
		
		fileRow.appendChild(fileNameCell);
		fileRow.appendChild(fileSizeCell);
		fileRow.appendChild(fileActionCell);
		fileRow.appendChild(dropdownContainer);
		
		
		fileTable.getElementsByTagName("tbody")[0].appendChild(fileRow);
	
	
} catch (error) {
	console.error("File upload error:", error);
}
}
});
function deletepdf(e){
	var idpdf = e.id
	// userId = auth.currentUser.uid;
	var file = e.parentNode.parentNode.parentNode.parentNode
	var fileName = file.firstChild.textContent
	console.log(fileName)
	const docRef = db.collection("users").doc(userId).collection("files").doc(idpdf);
	const confirmed = confirm('Are you sure you want to delete this document? This action is irreversible.');
	if(confirmed){
	docRef.delete()
	  .then(() => {
		console.log('Document successfully deleted.');
	})
	.catch((error) => {
		console.error('Error deleting document:', error);
	});
	const storageRef = storage.ref();
	console.log(storageRef)
	const fileRef = storageRef.child(`user-${userId}/${fileName}`);
	
	fileRef.delete()
	.then(() => {
		console.log('File successfully deleted from storage.');
		file.remove()
		})
		.catch((error) => {
			console.error('Error deleting file from storage:', error);
		});
		// console.log(s)
	}
}

// To load files in a format
function toLoad(){
	console.log(filesArray)
	for (let i = 0; i < filesArray.length; i++) {
		const file = filesArray[i]['url'];
		const fileRow = document.createElement("tr");
		fileRow.setAttribute('class','marginTable')
		const fileNameCell = document.createElement("td");
		const fileSizeCell = document.createElement("td");
		const fileActionCell = document.createElement("td");
		const fileName = document.createTextNode(filesArray[i]['name']);
		const fileSize = document.createTextNode(filesArray[i]['size']);
		const fileLink = document.createElement("button");
		const fileLinkText = document.createTextNode("Open");
		// Create the main container div
		const dropdownContainer = document.createElement('div');
		dropdownContainer.classList.add('dropdown');

		// Create the dropdown button
		const dropdownButton = document.createElement('button');
		dropdownButton.classList.add('btn', 'dropdown-toggle');
		dropdownButton.type = 'button';
		dropdownButton.id = 'dropdownMenuButton';
		dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
		dropdownButton.setAttribute('aria-expanded', 'false');

		// Create the three-dots icon
		const threeDotsIcon = document.createElement('i');
		threeDotsIcon.classList.add('bi', 'bi-three-dots');

		// Append the icon to the button
		dropdownButton.appendChild(threeDotsIcon);

		// Create the dropdown menu
		const dropdownMenu = document.createElement('ul');
		dropdownMenu.classList.add('dropdown-menu');
		dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuButton');

		// Create the "Download" option
		const downloadOption = document.createElement('li');
		const downloadLink = document.createElement('a');
		downloadLink.classList.add('dropdown-item');
		downloadLink.href = '#';
		downloadLink.setAttribute("onclick","downloadPDF(this)")
		downloadLink.textContent = 'Download';
		downloadOption.appendChild(downloadLink);

		// Create the "delete" option
		const deleteOption = document.createElement('li');
		const deleteLink = document.createElement('a');
		deleteLink.setAttribute("id",filesArray[i]['id'])
		deleteLink.setAttribute("onclick","deletepdf(this)")
		deleteLink.classList.add('dropdown-item');
		deleteLink.href = '#';
		deleteLink.textContent = 'Delete';
		deleteOption.appendChild(deleteLink);

		// Append options to the dropdown menu
		dropdownMenu.appendChild(downloadOption);
		dropdownMenu.appendChild(deleteOption);

		// Append the button and dropdown menu to the container div
		dropdownContainer.appendChild(dropdownButton);
		dropdownContainer.appendChild(dropdownMenu);

// Append the container div to the document body or another target element
// document.body.appendChild(dropdownContainer);

		// var c = fileInput.value
		fileLink.setAttribute('class','openBtn')
		fileLink.setAttribute('value',file)
		// localStorage.setItem('filepath', c.split("\\")[2])
		// console.log(file.size)
		// fileLink.href = URL.createObjectURL(file);
		// fileLink.target = "_blank";
		fileLink.setAttribute('onclick','openFile(this)')
		fileLink.appendChild(fileLinkText);
		
		fileNameCell.appendChild(fileName);
		fileSizeCell.appendChild(fileSize);
		fileActionCell.appendChild(fileLink);
		
		fileRow.appendChild(fileNameCell);
		fileRow.appendChild(fileSizeCell);
		fileRow.appendChild(fileActionCell);
		fileRow.appendChild(dropdownContainer);
		
		fileTable.getElementsByTagName("tbody")[0].appendChild(fileRow);
	}
}


setTimeout(retreiveFiles,2000)
setTimeout(toLoad,4000)


