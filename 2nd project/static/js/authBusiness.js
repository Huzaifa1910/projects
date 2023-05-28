if(localStorage.getItem("loginflag") == false){
    window.location.replace("./index.html");
}else if(localStorage.getItem("loginflag") == true && localStorage.getItem("loginUser") != 'admin'){
    window.location.replace("./dashboard.html");

}else if(localStorage.getItem("loginflag") == true && localStorage.getItem("loginUser") == 'admin'){
    window.location.replace("./admindashboard.html");

}

var editInvDate1 = document.getElementById("editexampleInput1")
var editInvDesc2 = document.getElementById("editexampleInput2")
var editInvTotal3 = document.getElementById("editexampleInput3")
var editInvDebit4 = document.getElementById("editexampleInput4")
var editInvRemarks5 = document.getElementById("editexampleInput5")

var modalLabel = document.getElementById("exampleModalLabel")
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
var refName
var tCredit = document.getElementById('totalCredit')
var tDebit = document.getElementById('totalDebit')

function pass_check(){
    flag = 0
    firebase.database().ref('Users').on("child_added",function(data){
        n = 1
        var data = data.val() 
            if (busName.split('\t')[1] == data['name'] && passINp.value == data.pass){
                console.log("Successfull")
                flag = 1
                passINp.value = ''
                $("#exampleModal").modal("show")
                retreive()
            }})
            if(flag == 0){
                passINp.value = ''
                alert("Wrong Password!")
            
            }
            ret()

        }
function adminBusinessData(e){
    busName = e.parentNode.innerText
    busid = e.parentNode.id
    console.log(busid)
    // flag = 0
        n = 1
        // var data = data.val() 
        $("#exampleModal").modal("show")
        retreive()
        ret()
    }
    
function retreive(){
        detailsBody.innerHTML = ""
        modalLabel.innerHTML = ""
        totalCredit = 0
        totalDebit = 0
        var refName =busName.split('\t')[1]
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
        var td3 = document.createElement("td")
        var td4 = document.createElement("td")
        var td5 = document.createElement("td")
        var td6 = document.createElement("td")
        var td7 = document.createElement("td")
        
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
        var inpDebit = document.createTextNode(data.debit)
        var inpTotal = document.createTextNode(data.total)
        var inpRemaining = document.createTextNode(data.remaining)
        var inpRemarks = document.createTextNode(data.remarks)
        totalDebit += parseInt(data.debit)
        totalCredit += parseInt(data.remaining)
        
        td1.appendChild(inpDate)
        td2.appendChild(inpDesc)
        td3.appendChild(inpDebit)
        td4.appendChild(inpTotal)
        td5.appendChild(inpRemaining)
        td6.appendChild(inpRemarks)
        td7.appendChild(editbtn)
        td7.appendChild(delbtn)
        
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td4)
        tr.appendChild(td3)
        tr.appendChild(td5)
        tr.appendChild(td6)
        tr.appendChild(td7)
        
        detailsBody.appendChild(tr)
        n+=1
    }
    tDebit.innerText = totalDebit
    tCredit.innerText = totalCredit
    // console.log(tDebit.innerHTML)
    // console.log(tCredit.innerHTML)
    // console.log(busName.split('\t')[1])
    
})
// }
}
function onClick(e){
    busName = e.innerText
    busid = e.id
    console.log(busid,busName)
}

function logout(){
    localStorage.setItem("loginflag",false)
    localStorage.setItem("loginUser",'')
    window.location.replace("./index.html");
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
    editInvDebit4.value = ''
    editInvRemarks5.value = ''
    $("#exampleModal").modal("hide")
    $("#editInvModal").modal("show")
    console.log(e.parentNode.parentNode.children[1].firstChild.textContent)
    editInvDate1.value = e.parentNode.parentNode.children[1].firstChild.textContent
    editInvDesc2.value = e.parentNode.parentNode.children[2].firstChild.textContent
    editInvTotal3.value = e.parentNode.parentNode.children[3].firstChild.textContent
    editInvDebit4.value = e.parentNode.parentNode.children[4].firstChild.textContent
    editInvRemarks5.value = e.parentNode.parentNode.children[6].firstChild.textContent
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
            usersObj['debit'] = editInvDebit4.value
            usersObj['description'] = editInvDesc2.value
            usersObj['key'] = data.key
            usersObj['remaining'] = editInvTotal3.value - editInvDebit4.value
            usersObj['remarks'] = editInvRemarks5.value
            usersObj['total'] = editInvTotal3.value
            console.log(data)
            console.log(usersObj)
        }
})
firebase.database().ref(editInv).child("Invoice"+editId).set(usersObj)
    alert("Data Updated Succesfully!")
   window.location.reload()
}