var editInvDate1 = document.getElementById("editexampleInput1")
var editInvDesc2 = document.getElementById("editexampleInput2")
var editInvTotal3 = document.getElementById("editexampleInput3")
// var editInvDebit4 = document.getElementById("editexampleInput4")
var editInvCredit5 = document.getElementById("editexampleInput5")
var editInvRemarks6 = document.getElementById("editexampleInput6")
// Get the content input and its child elements
const contentInput = document.getElementById("content-input");
const textInput = contentInput.querySelector("#remarks");
const imageInput = contentInput.querySelector("#image-input");

// Add an event listener to the radio buttons
const radioButtons = document.querySelectorAll('input[name="content-type"]');
radioButtons.forEach(radioButton => {
  radioButton.addEventListener("change", function() {
    if (this.value === "text") {
      textInput.style.display = "block";
      imageInput.style.display = "none";
    } else if (this.value === "image") {
      textInput.style.display = "none";
      imageInput.style.display = "block";
    }
  });
});

// var modalLabel = document.getElementById("exampleModalLabel")
var prodObj
var dats
var editId
var key
var passINp = document.getElementById("passInput")
var flag = 0
var busid
var busName
var totalCredit = 0
var totalDebit = 0
var totalRemaining = 0
var totalProfit = 0
var totalLoss = 0
var gTotal = 0
var refName
var tGrand = document.getElementById("grandTotal")
// var tDebit = document.getElementById("totalDebit")
var tCredit = document.getElementById("totalCredit")
var tRemain = document.getElementById("totalGAP")
var tProfit = document.getElementById("totalProfit")
var tLoss = document.getElementById("totalLoss")

var busName = localStorage.getItem("busName")
// var busName = "cars"
console.log(busName)
n = 1
var modalLabel = document.getElementById("headInvoice")
function retreive(){
    ret()
    detailsBody.innerHTML = ""
    // modalLabel.innerHTML = ""
    totalCredit = 0
    totalDebit = 0
    totalRemaining = 0
    totalProfit = 0
    totalLoss = 0
    gTotal = 0
    var refName =busName.split('\t')[1]
    // var refName =busName
    var modalLabelNode = document.createTextNode(refName + " Invoice Dashboard")
    modalLabel.appendChild(modalLabelNode)
    console.log(refName)
    firebase.database().ref('Invoice/' + refName).on("child_added",function(data){
        var detailsBody = document.getElementById("detailsBody")
        var data = data.val() 
        if(data.key != '00000'){
    
            var tr = document.createElement("tr")
            tr.setAttribute("id",data.key)
    var th = document.createElement("td")
    th.setAttribute("scope",'row')
    th.appendChild(document.createTextNode(n))
    tr.appendChild(th)
    var td1 = document.createElement("td")
    var td2 = document.createElement("td")
    // td2.setAttribute("onclick","showInvoice()")
    // var td3 = document.createElement("td")
    var td4 = document.createElement("td")
    var td5 = document.createElement("td")
    var td6 = document.createElement("td")
    var td7 = document.createElement("td")
    var td8 = document.createElement("td")
    var td9 = document.createElement("td")
    var td10 = document.createElement("td")
    // var td11 = document.createElement("td")

    
    if(data.remarks == '' && data.imageURL != '')       {
       console.log("Hello World")
       var openBtn = document.createElement("a")
       openBtn.setAttribute("href",data.imageURL)
       openBtn.setAttribute("target","_blank")
       openBtn.setAttribute("class","btn-primary btn")
       var openBtnNode = document.createTextNode("Open Image")
       openBtn.appendChild(openBtnNode)
       td9.appendChild(openBtn)
    }
    var editbtn = document.createElement("button")
    var editNode = document.createTextNode(" Edit ")
    editbtn.setAttribute("onclick","geteditmodal(this)")
    editbtn.appendChild(editNode)
    
    var delbtn = document.createElement("button")
    var delNode = document.createTextNode("Delete")
    delbtn.appendChild(delNode)

    editbtn.setAttribute("class","btn btn-success btn-md mx-2")
    delbtn.setAttribute("class","btn btn-danger btn-md mx-2")
    delbtn.setAttribute("onclick","delInvoice(this)")

    

    var inpDate = document.createTextNode(data.date)
    var inpDesc = document.createTextNode(data.description)
    // var inpDebit = document.createTextNode(data.debit)
    var inpCredit = document.createTextNode(data.credit)
    var inpTotal = document.createTextNode(data.total)
    var inpRemaining = document.createTextNode(data.remaining)
    var inpProfit = document.createTextNode(data.profit)
    var inpLoss = document.createTextNode(data.loss)
    var inpRemarks = document.createTextNode(data.remarks)
    gTotal += parseInt(data.total)
    // totalDebit += parseInt(data.debit)
    totalCredit += parseInt(data.credit)
    totalRemaining += parseInt(data.remaining)
    totalProfit += parseInt(data.profit)
    totalLoss += parseInt(data.loss)
    
    td1.appendChild(inpDate)
    td2.appendChild(inpDesc)
    // td3.appendChild(inpDebit)
    td4.appendChild(inpTotal)
    td5.appendChild(inpCredit)
    td6.appendChild(inpRemaining)
    td7.appendChild(inpProfit)
    td8.appendChild(inpLoss)
    td9.appendChild(inpRemarks)
    td10.appendChild(editbtn)
    td10.appendChild(delbtn)
    
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td4)
    // tr.appendChild(td3)
    tr.appendChild(td5)
    tr.appendChild(td6)
    tr.appendChild(td7)
    tr.appendChild(td8)
    tr.appendChild(td9)
    tr.appendChild(td10)
    // tr.appendChild(td7)
    
    detailsBody.appendChild(tr)
    n+=1
}
tGrand.innerText = gTotal
// tDebit.innerText = totalDebit
tCredit.innerText = totalCredit
tRemain.innerText = totalRemaining
tProfit.innerText = totalProfit
tLoss.innerText = totalLoss
// console.log(tDebit.innerHTML)
// console.log(tCredit.innerHTML)
// console.log(busName.split('\t')[1])

})
// }
}
function ret(){
    var refName =busName.split('\t')[1]
    firebase.database().ref('Invoice/' + refName).on("child_added",function(data){
    var data = data.val()
    keycount = data.key
    key1 = keycount[4]
    key2 = keycount[3]
    key3 = keycount[2]
    key4 = keycount[1]
    key5 = keycount[0]
    // n += 1
})
}
function delInvoice(e){
    console.log(e.parentNode.parentNode.id)
    var editInv = "Invoice/" + busName.split('\t')[1]
    console.log(editInv)
    
    firebase.database().ref(editInv).on("child_added",function(data){
        var data = data.val()
        console.log(data)
        if(data.key == e.parentNode.parentNode.id){
            // console.log(data.key)
            var confirm = prompt("Are you sure?" + '" \n' + 'Type "yes" for delete')
            if(confirm == null){
                confirm = 'No'
            }
            if(confirm.toLowerCase() == 'yes'){
                firebase.database().ref(editInv).child("Invoice"+e.parentNode.parentNode.id).remove()
                window.location.reload();
                console.log("delete")
            }
            else{
                console.log("passed")
            }
        }
    })
    
}

function geteditmodal(e){
    editId =   e.parentNode.parentNode.id
    
    editInvDate1.value = ''
    editInvDesc2.value = ''
    editInvTotal3.value = ''
    // editInvDebit4.value = ''
    editInvCredit5.value = ''
    editInvRemarks6.value = ''
    $("#exampleModal").modal("hide")
    $("#editInvModal").modal("show")
    console.log(e.parentNode.parentNode.children[1].firstChild.textContent)
    editInvDate1.value = e.parentNode.parentNode.children[1].firstChild.textContent
    editInvDesc2.value = e.parentNode.parentNode.children[2].firstChild.textContent
    editInvTotal3.value = e.parentNode.parentNode.children[3].firstChild.textContent
    // editInvDebit4.value = e.parentNode.parentNode.children[4].firstChild.textContent
    editInvCredit5.value = e.parentNode.parentNode.children[4].firstChild.textContent
    editInvRemarks6.value = e.parentNode.parentNode.children[8].firstChild.textContent
}
function editInv(){
    var usersObj = {}
    // editId
    var editInv = "Invoice/" + busName.split('\t')[1]
    console.log(editInv)
    firebase.database().ref(editInv).on("child_added",function(data){
        var data = data.val()
        if(data.key == editId ){
            usersObj['date'] = editInvDate1.value
            // usersObj['debit'] = editInvDebit4.value
            usersObj['credit'] = editInvCredit5.value
            usersObj['description'] = editInvDesc2.value
            usersObj['key'] = data.key
            usersObj['remaining'] = ((parseInt(editInvTotal3.value)) - parseInt(editInvCredit5.value))
            if(((parseInt(editInvTotal3.value)) - parseInt(editInvCredit5.value)) > 0){
                usersObj['profit'] = ((parseInt(editInvTotal3.value)) - parseInt(editInvCredit5.value))
                usersObj['loss'] = 0
            }
            else if(((parseInt(editInvTotal3.value)) - parseInt(editInvCredit5.value))  < 0){
                usersObj['loss'] = ((parseInt(editInvTotal3.value)) - parseInt(editInvCredit5.value))
                usersObj['profit'] = 0
            }
            else{
                usersObj['profit'] = 0
                usersObj['loss'] = 0
            }
            usersObj['remarks'] = editInvRemarks6.value
            usersObj['total'] = editInvTotal3.value
            console.log(data)
            console.log(usersObj)
        }
})
firebase.database().ref(editInv).child("Invoice"+editId).set(usersObj)
    alert("Data Updated Succesfully!")
   window.location.reload()
}
function onClick(e){
    busName = e.innerText
    busid = e.id
    console.log(busid,busName)
}

retreive()

function showInvoice(){
    console.log("chaala")
    $("#invoicesModal").modal("show")
}


function addDetails(){
    key = "Invoice"
    key1++
    if(key1 > 9){
        key1 = 0
        key2++
    }else if(key2 > 9){
        key2 = 0
        key3++
    }else if(key3 > 9){
        key3 = 0
        key4++
    }else if(key4 > 9){
        key4 = 0
        key5++
    }
    var keycount =key5 +"" + key4 +""+key3+""+key2+""+key1
    var keyid = key+keycount.toString()

    var detailsObj = {}
    var inpDate = document.getElementById('date');
    var inpDesc = document.getElementById('description');
    // var inpDebit = document.getElementById('debit');
    var inpCredit = document.getElementById('credit');
    var inpTotal = document.getElementById('total');
    var inpRemarks = document.getElementById('remarks');
    // var userId = localStorage.getItem("loger")
    // console.log(imageInput.value)

    
    // var inpDate = document.getElementById("exampleInput1")
    // var inpDesc = document.getElementById("exampleInput2")
    // var inpDebit = document.getElementById("exampleInput4")
    // var inpTotal = document.getElementById("exampleInput3")
    // var inpRemarks = document.getElementById("exampleInput5")

    if(inpDate.value == '' || inpDesc.value == '' || inpTotal.value == '' || inpCredit.value == ''){
        alert("Please fill all the fields!")
        return
    }
    // var tr = document.createElement("tr")
    // var th = document.createElement("td")
    // th.setAttribute("scope",'row')
    // th.appendChild(document.createTextNode(n))
    // tr.appendChild(th)
    // var td1 = document.createElement("td")
    // var td2 = document.createElement("td")
    // var td3 = document.createElement("td")
    // var td4 = document.createElement("td")
    detailsObj['date'] = inpDate.value
    detailsObj['description'] = inpDesc.value
    // detailsObj['debit'] = inpDebit.value
    detailsObj['credit'] = inpCredit.value
    detailsObj['total'] = inpTotal.value
    if((parseFloat(inpTotal.value)) - parseFloat(inpCredit.value) > 0){
        detailsObj['profit'] = (parseFloat(inpTotal.value)) - parseFloat(inpCredit.value)
        detailsObj['loss'] = 0
    }
    else if((parseFloat(inpTotal.value)) - parseFloat(inpCredit.value)  < 0){
        detailsObj['loss'] = (parseFloat(inpTotal.value)) - parseFloat(inpCredit.value)
        detailsObj['profit'] = 0
    }
    else{
        detailsObj['profit'] = 0
        detailsObj['loss'] = 0
    }
    detailsObj['remaining'] = (parseFloat(inpTotal.value)) - parseFloat(inpCredit.value)
    detailsObj['remarks'] = inpRemarks.value
    detailsObj['key'] = keycount
    
    // inpDateText = document.createTextNode(inpDate)
    // inpDescText = document.createTextNode(inpDesc)
    // inpDebitText = document.createTextNode(inpDebit)
    // inpCreditText = document.createTextNode(inpCredit)
    
    
    // td1.appendChild(inpDateText)
    // td2.appendChild(inpDescText)
    // td3.appendChild(inpDebitText)
    // td4.appendChild(inpCreditText)
    
    // tr.appendChild(td1)
    // tr.appendChild(td2)
    // tr.appendChild(td3)
    // tr.appendChild(td4)
    // detailsBody.appendChild(tr)

    console.log(detailsObj)
    const imageInput = contentInput.querySelector('input[name="image-input"]');
  
    // Get the selected image file
    const file = imageInput.files[0];
  
    if (file) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child('images/' + file.name);
  
      // Upload the image file to Firebase storage
      const uploadTask = imageRef.put(file);
  
      uploadTask.on(
        'state_changed',
        function(snapshot) {
          // Progress tracking
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload progress: ' + progress + '%');
        },
        function(error) {
          // Error handling
          console.error('Upload error:', error);
        },
        function() {
          // Upload success
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            // console.log('File available at', downloadURL);
  
            // You can store the downloadURL in your database or use it as needed
            
            // Add the download URL to the detailsObj
            detailsObj['imageURL'] = downloadURL;
  
            // Continue with the rest of the code for adding details to the database
            firebase.database().ref(detail).child(busName.split('\t')[1]).child(keyid).set(detailsObj);
            // update();
          });
        }
      );
    }
    imageInput.value = ''
    inpDate.value  = ''
    inpDesc.value  = ''
    // inpDebit.value = ''
    inpCredit.value = ''
    inpTotal.value  = ''
    inpRemarks.value  = ''
    var detail = key
    // n = n+1
    console.log("hogaaya")
    // Get the file input element
    firebase.database().ref(detail).child(busName.split('\t')[1]).child(keyid).set(detailsObj)
    // update()
}
