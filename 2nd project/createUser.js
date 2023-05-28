if(localStorage.getItem("loginUser") != 'admin'){
    window.location.replace("./dashboard.html");
}

var businessname = document.getElementById("editNameInput")
var businesspass = document.getElementById("editPassInput")
var businessdesc = document.getElementById("editDescInput")
var updtId 
var passObjs = {}
var passCount = 1
let toggId = 0
var key = "Users"
var key1 = 0
var key2 = 0
var key3 = 0
var key4 = 0
var key5 = 0
var keycount =key5 +"" + key4 +""+key3+""+key2+""+key1

var businessId = 0

const date = new Date()

var detailsBody1 = document.getElementById("detailsBody1")
n = 1
c = 1
function show_form(){
    $("#crtUserModal").modal("show")
}
firebase.database().ref(key).on("child_added",function(data){
    var data = data.val()
    keycount = data.id
    key1 = keycount[4]
    key2 = keycount[3]
    key3 = keycount[2]
    key4 = keycount[1]
    key5 = keycount[0]
    businessId = data.businessid
    toggId ++
    // var detailsObj = {}
    // var inpName = document.getElementById("nameInput").value
    // var inpPass = document.getElementById("passInput").value
    // var inpDate = os
    var bId = "business" + keycount.toString()
    var tr = document.createElement("tr")
    tr.setAttribute("id",bId)
    var th = document.createElement("td")
    th.setAttribute("scope",'row')
    th.appendChild(document.createTextNode(c))
    tr.appendChild(th)
    // var td1 = document.createElement("td")
    var td2 = document.createElement("td")
    td2.setAttribute("onclick","adminBusinessData(this)")
    var td3 = document.createElement("td")
    td3.setAttribute("class","password-value")
    td3.setAttribute("id","password-value" + toggId)
    var td4 = document.createElement("td")
    var td5 = document.createElement("td")
    // detailsObj['date'] = date.getMonth()+ 1 + '/' + date.getDate() + '/' + date.getFullYear()
    // detailsObj['name'] = inpName
    // detailsObj['pass'] = inpPass
    // detailsObj['id'] = keycount
    // detailsObj['businessid'] = businessId + 1
    // detailsObj['totalCredit'] = data.totalCredit
    // detailsObj['totalDebit'] = data.totalDebit
    
    inpNameText = document.createTextNode(data.name)
    inpDescText = document.createTextNode(data.desc)
    inpPassText = document.createTextNode('*********')

    passObjs["password-value"+passCount] = data.pass

    // console.log(passObjs)
    // inpPassText = document.createTextNode(data.pass)
    // var zero = '0'
    passCount++
    // var zeroNode = document.createTextNode(data.totalCredit)
    var delBtn = document.createElement("button")
    delBtn.setAttribute("onclick","delBusiness(this)")
    var delNode = document.createTextNode("Delete")
    delBtn.appendChild(delNode)
    var editBtn = document.createElement("button")
    editBtn.setAttribute("onclick","getIdUpd(this)")
    var editNode = document.createTextNode("Edit")
    editBtn.appendChild(editNode)
    
    editBtn.setAttribute("class","btn btn-success btn-md mx-2")
    delBtn.setAttribute("class","btn btn-danger btn-md mx-2")

    var toggles = document.createElement("span")
    toggles.setAttribute("class","custom-control custom-switch")

    // "customSwitch" + toggId

    var toggInp = document.createElement("input")
    toggInp.setAttribute("class","custom-control-input .show-password-toggle")
    toggInp.setAttribute("type","checkbox")
    // toggInp.setAttribute("role","switch")
    toggInp.setAttribute("onclick","showHidePass(this)")
    toggInp.setAttribute("id","customSwitch" + toggId)

    toggles.appendChild(toggInp)

    var toggLabel = document.createElement("label")
    toggLabel.setAttribute("class","custom-control-label")
    // toggLabel.setAttribute("onclick","showHidePass()")
    toggLabel.setAttribute("for","customSwitch" + toggId)
    // toggInp.setAttribute("role","switch")
    // toggLabel.setAttribute("id","customSwitch1")

    toggles.appendChild(toggLabel)

    td2.appendChild(inpNameText)
    td3.appendChild(inpPassText)
    td3.appendChild(toggles)
    td4.appendChild(editBtn)
    td4.appendChild(delBtn)
    td5.appendChild(inpDescText)
    // td1.appendChild(zeroNode)
    
    tr.appendChild(td2)
    tr.appendChild(td5)
    // tr.appendChild(td1)
    tr.appendChild(td3)
    tr.appendChild(td4)
    detailsBody1.appendChild(tr)
    c += 1
})
function createUser(){
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
    var inpName = document.getElementById("nameInput")
    var inpDesc = document.getElementById("descriptionInput")
    var inpPass = document.getElementById("passInput")
    if(inpName.value == '' || inpPass.value == ''){
        alert("Please fill all the fields!")
        return
    }
    // var inpDate = os
    var bId = "business" + businessId.toString()
    var tr = document.createElement("tr")
    tr.setAttribute("id",bId)
    var th = document.createElement("td")
    th.setAttribute("scope",'row')
    th.appendChild(document.createTextNode(n))
    tr.appendChild(th)
    var td1 = document.createElement("td")
    var td2 = document.createElement("td")
    var td3 = document.createElement("td")
    var td4 = document.createElement("td")
    detailsObj['date'] = date.getMonth()+ 1 + '/' + date.getDate() + '/' + date.getFullYear()
    detailsObj['name'] = inpName.value
    detailsObj['desc'] = inpDesc.value
    detailsObj['pass'] = inpPass.value
    detailsObj['id'] = keycount
    detailsObj['businessid'] = businessId + 1
    detailsObj['totalCredit'] = 0
    detailsObj['totalDebit'] = 0
    
    // inpNameText = document.createTextNode(inpName)
    // inpPassText = document.createTextNode(inpPass)
    // var zero = '0'
    
    // var zeroNode = document.createTextNode(zero)
    // var zeroNode2 = document.createTextNode(zero)

    // td1.appendChild(zeroNode)
    // td2.appendChild(inpNameText)
    // td3.appendChild(inpPassText)
    // td4.appendChild(zeroNode2)
    
    // tr.appendChild(td2)
    // tr.appendChild(td1)
    // tr.appendChild(td4)
    // tr.appendChild(td3)
    // detailsBody1.appendChild(tr)

    var detail = key
    n = n+1

    dummyObj = {
        'key':'00000'
    }
    firebase.database().ref(detail).child(keyid).set(detailsObj)
    // firebase.database().ref('Users').child(keyid).set(detailsObj)
    firebase.database().ref('Invoice').child(inpName.value).child('Invoice00000').set(dummyObj)
    inpName.value = ''
    inpPass.value = ''
    businessId++
}
function showModal(){
    $("#passModal").modal("show")
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

    // var inpDate = document.getElementById("exampleInput1")
    // var inpDesc = document.getElementById("exampleInput2")
    // var inpDebit = document.getElementById("exampleInput4")
    // var inpTotal = document.getElementById("exampleInput3")
    // var inpRemarks = document.getElementById("exampleInput5")

    if(inpDate.value == '' || inpDesc.value == '' || inpDebit.value == '' || inpTotal.value == '' || inpCredit.value == ''){
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
    detailsObj['debit'] = inpDebit.value
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

    inpDate.value  = ''
    inpDesc.value  = ''
    inpDebit.value = ''
    inpCredit.value = ''
    inpTotal.value  = ''
    inpRemarks.value  = ''
    var detail = key
    // n = n+1

    firebase.database().ref(detail).child(busName.split('\t')[1]).child(keyid).set(detailsObj)
    // update()
}
function showHidePass(e){
    var input = document.getElementById(e.parentNode.parentNode.id);
    var passId = e.parentNode.parentNode.id
    // console.log(e.parentNode.parentNode.id)
    if(input.firstChild.textContent[0] == '*'){
        // console.log(e.id)
        var checkbox = $("#"+e.id);
    
    // Get the input field element
    
    // Get the checkbox element
    
    // Store the original value of the input field
    var originalValue = input.firstChild.textContent;
}
// console.log(originalValue)
// console.log("269")
// console.log(passObjs[passId])
// Add a change event listener to the checkbox
try{
    checkbox.change(function() {
        // console.log("269")
        // Check if the checkbox is checked
        if (checkbox.is(':checked')) {
        //   console.log("270")
          // Hide the value of the input field by setting it to an empty string
          input.firstChild.textContent = passObjs[passId];
        } else {
            // console.log("271")
            // Show the value of the input field by setting it back to the original value
            input.firstChild.textContent = "*********";
      }
    });

}
catch(err){
    console.log(err)
}
}

function delBusiness(e){
    firebase.database().ref("Users").on("child_added",function(data){
        var data = data.val()
        if("business"+data.id == e.parentNode.parentNode.id){
            var business = e.parentNode.parentNode.children[1].innerHTML
            console.log("business"+data.id)
            console.log(e.parentNode.parentNode.id)
            console.log(business)
            var confirm = prompt("Are you sure to delete: " +'"' +  data.name+ '" \n' + 'Type "yes" for delete')
            if(confirm == null){
                confirm = 'No'
            }
            if(confirm.toLowerCase() == 'yes'){
                firebase.database().ref("Users").child("Users"+data.id).remove()
                firebase.database().ref("Invoice").child(business).remove()
                window.location.reload();
            }
            else{
                console.log("passed")
            }
            // console.log("delete")
        }
    })
    
}

function getIdUpd(e){
    updtId =   e.parentNode.parentNode.id
    // $("#editModal").modal("show")
    $("#editModal").modal("show")
    businessname.innerHTML = "Business Name: " +e.parentNode.parentNode.children[1].firstChild.textContent
    businesspass.value = passObjs[e.parentNode.parentNode.children[3].id]
    businessdesc.value = passObjs[e.parentNode.parentNode.children[2].id]
}

function update(){
    var usersObj = {}
    firebase.database().ref("Users").on("child_added",function(data){
        var data = data.val()  
        // var key = "Users"+data.key
        if("business"+data.id == updtId){
            usersObj['date'] = data.date
            usersObj['name'] = data.name
            usersObj['desc'] = businessdesc.value
            usersObj['pass'] = businesspass.value
            usersObj['id'] = data.id
            usersObj['businessid'] = data.businessid
            usersObj['totalCredit'] = data.totalCredit
            usersObj['totalDebit'] = data.totalDebit
            console.log(data)
            console.log(usersObj)
        }


        
        
        
        
    })
    firebase.database().ref("Users").child("Users"+updtId.split('s')[3]).set(usersObj)
    alert("Data Updated Succesfully!")
    window.location.reload()
}