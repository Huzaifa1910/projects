  const form = document.getElementById('detailsForm');
  var passCount = 1
  var businessname = document.getElementById("editNameInput")
  var businesspass = document.getElementById("editPassInput")
  var updtId
  var passObjs = {}
  var rowId
  let toggId = 0
var rowname

var editInvDate1 = document.getElementById("editexampleInput1")
var editInvDesc2 = document.getElementById("editexampleInput2")
var editInvTotal3 = document.getElementById("editexampleInput3")
var editInvDebit4 = document.getElementById("editexampleInput4")
var editInvCredit5 = document.getElementById("editexampleInput5")
var editInvRemarks6 = document.getElementById("editexampleInput6")

function geteditmodal(e){
  editId =   e.parentNode.parentNode.id
  
  editInvDate1.value = ''
  editInvDesc2.value = ''
  editInvTotal3.value = ''
  editInvDebit4.value = ''
  editInvCredit5.value = ''
  editInvRemarks6.value = ''
  $("#exampleModal").modal("hide")
  $("#editInvModal").modal("show")
  editInvDate1.value = e.parentNode.parentNode.children[1].firstChild.textContent
  editInvDesc2.value = e.parentNode.parentNode.children[2].firstChild.textContent
  editInvTotal3.value = e.parentNode.parentNode.children[3].firstChild.textContent
  editInvDebit4.value = e.parentNode.parentNode.children[4].firstChild.textContent
  editInvCredit5.value = e.parentNode.parentNode.children[5].firstChild.textContent
  editInvRemarks6.value = e.parentNode.parentNode.children[9].firstChild.textContent
}


try{
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    var date = document.getElementById('date').value;
    var description = document.getElementById('description').value;
    var debit = document.getElementById('debit').value;
    var credit = document.getElementById('credit').value;
    var total = document.getElementById('total').value;
    var remarks = document.getElementById('remarks').value;
    var userId = localStorage.getItem("loger")
    // const userId = document.getElementById('userId').value;

    const data = {
      date,
      description,
      debit,
      credit,
      total,
      remarks,
      userId,
      rowId
    };
  console.log(data)
    fetch('/save-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Data Entered Successfully")
        window.location.reload()
        // Handle the response as needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error
      });
      
    });}
catch{
  console.log("Welcome")
}

  function add_business(){
    const business_name = document.getElementById('nameInput').value;
    const password = document.getElementById('passInput').value;

    if(business_name == '' || password == ''){
      alert("Please Provide all the fields")
      return
    }

    const data = {
        business_name,
        password
      };

      fetch('/add-business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((data) => {
          alert("Business Created Successfully, named: " + business_name)
          // Handle the response as needed
          window.location.reload()
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error
        });

  }

  function data(){
    // Fetch data from the Flask route
    fetch('/data',{
        body: rowId
    })
    .then(response => response.json())
    .then(data => {
    // Print data in the console
    var table = document.getElementById("detailsBody1")
    
    for(let i = 0;i<data.length;i++){
    var tr = document.createElement('tr')
    tr.setAttribute('id',"business"+data[i]['id'])
    tr.setAttribute('onclick','showModal(this)')

    var td1 = document.createElement('td')
    var td2 = document.createElement('td')

    td1.appendChild(document.createTextNode(data[i]['id']))
    td2.appendChild(document.createTextNode(data[i]['business_name']))

    tr.appendChild(td1)
    tr.appendChild(td2)

    table.appendChild(tr)
}
    })
    .catch(error => console.log(error));

  }
  function show_form(){
    $("#crtUserModal").modal("show")
}
function remove(e){
  // console.log(e.parentNode.parentNode.id)
  var x = e.parentNode.parentNode.id
  var confirm = prompt("Are you sure to delete? "+ ' \n' + 'Type "yes" for delete')
  if(confirm == null){
      confirm = 'No'
  }
  if(confirm.toLowerCase() == 'yes'){

    fetch(`/removeBusiness/${x}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        window.location.reload();
        console.log('Business record deleted successfully.');
      } else {
        console.log('Failed to delete business record.');
      }
    })
    .catch(error => console.log(error));
  }
  else{
      console.log("passed")
  }
  
}

function get_details(){
    var tGrand = document.getElementById("grandTotal")
    var tDebit = document.getElementById("totalDebit")
    var tCredit = document.getElementById("totalCredit")
    var tRemain = document.getElementById("totalGAP")
    var tProfit = document.getElementById("totalProfit")
    var tLoss = document.getElementById("totalLoss")

    tGrand.innerHTML = ''
    tDebit.innerHTML = ''
    tCredit.innerHTML = ''

    let tg = 0
    let tc = 0
    let td = 0
    let tR = 0
    let tP = 0
    let tL = 0


    detailsBody.innerHTML = ""
    $("#exampleModal").modal("show")
    fetch(`/get-details/${rowId}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    // Print data in the console
    var table = document.getElementById("detailsBody")
        
    for(let i = 0;i<data.length;i++){
        var tr = document.createElement("tr")
        tr.setAttribute('id',data[i]['id'])
        
        
        
        
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



        var td1 = document.createElement("td")
        var td2 = document.createElement("td")
        var td3 = document.createElement("td")
        var td4 = document.createElement("td")
        var td5 = document.createElement("td")
        var td6 = document.createElement("td")
        var td7 = document.createElement("td")
        var td8 = document.createElement("td")
        var td9 = document.createElement("td")
        var td10 = document.createElement("td")
        var td11 = document.createElement("td")

console.log(formatDate(data[i]['date']))
        td1.appendChild(document.createTextNode(i+1))
        td2.appendChild(document.createTextNode(formatDate(data[i]['date'])))
        td3.appendChild(document.createTextNode(data[i]['description']))
        td4.appendChild(document.createTextNode(data[i]['total']))
        td5.appendChild(document.createTextNode(data[i]['credit']))
        td6.appendChild(document.createTextNode(data[i]['debit']))
        console.log((parseFloat(data[i]['total']) + parseFloat(data[i]['debit'])) - parseFloat(data[i]['credit']))
        td7.appendChild(document.createTextNode((parseFloat(data[i]['total']) + parseFloat(data[i]['debit'])) - parseFloat(data[i]['credit'])))

        if((parseFloat(data[i]['total']) + parseFloat(data[i]['debit'])) - parseFloat(data[i]['credit']) > 0){
          console.log("its profit")
          td8.appendChild(document.createTextNode((parseFloat(data[i]['total']) + parseFloat(data[i]['debit'])) - parseFloat(data[i]['credit'])))
          td9.appendChild(document.createTextNode(0))
          tP += (parseFloat(data[i]['total']) + parseFloat(data[i]['debit'])) - parseFloat(data[i]['credit'])
          
        }else if((parseFloat(data[i]['total']) + parseFloat(data[i]['debit'])) - parseFloat(data[i]['credit']) < 0){
          td8.appendChild(document.createTextNode(0))
          td9.appendChild(document.createTextNode((parseFloat(data[i]['total']) + parseFloat(data[i]['debit'])) - parseFloat(data[i]['credit'])))
          tL -= (parseFloat(data[i]['total']) + parseFloat(data[i]['debit'])) - parseFloat(data[i]['credit'])
          console.log("its loss")
        }else{
          td8.appendChild(document.createTextNode(0))
          td9.appendChild(document.createTextNode(0))
          tP += (parseFloat(data[i]['total']) + parseFloat(data[i]['debit'])) - parseFloat(data[i]['credit'])
          tL -= (parseFloat(data[i]['total']) + parseFloat(data[i]['debit'])) - parseFloat(data[i]['credit'])
          console.log("Break Even")

        }
        
        
        // td9.appendChild(document.createTextNode(data[i]['id']))
        td10.appendChild(document.createTextNode(data[i]['remarks']))
        td11.appendChild(editbtn)
        td11.appendChild(delbtn)


        tg += parseFloat(data[i]['total'])
        tc += parseFloat(data[i]['credit'])
        td += parseFloat(data[i]['debit'])
        tR += parseFloat((parseFloat(data[i]['total']) + parseFloat(data[i]['debit'])) - parseFloat(data[i]['credit']))


        
        


        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td6)
        tr.appendChild(td5)
        tr.appendChild(td7)
        tr.appendChild(td8)
        tr.appendChild(td9)
        tr.appendChild(td10)
        tr.appendChild(td11)

        table.appendChild(tr)
        
        // console.log(data[i]['total'] - data[i]['debit'])

    }
    tGrand.innerHTML = tg
    tDebit.innerHTML = tc
    tCredit.innerHTML = td
    tRemain.innerHTML = tR
    tProfit.innerHTML = tP
    tLoss.innerHTML = tL
})
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
  function adminData(){
    // Fetch data from the Flask route
    fetch('/data')
    .then(response => response.json())
    .then(data => {
    // Print data in the console
    var table = document.getElementById("detailsBody1")
    
    for(let i = 0;i<data.length;i++){
    var tr = document.createElement('tr')
    tr.setAttribute('id',data[i]['id'])
    tr.setAttribute('class','detailbods')
    toggId ++
    
    var td1 = document.createElement('td')
    var td2 = document.createElement('td')
    td2.setAttribute('data-toggle','modal')
    td2.setAttribute('data-target','#exampleModal')
    td2.setAttribute('onclick','getId(this)')
    var td3 = document.createElement('td')
    td3.setAttribute("id","password-value" + toggId)
    var td4 = document.createElement('td')

    var delBtn = document.createElement("button")
    delBtn.setAttribute("onclick","remove(this)")
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

    "customSwitch" + toggId

    var toggInp = document.createElement("input")
    toggInp.setAttribute("class","custom-control-input .show-password-toggle")
    toggInp.setAttribute("type","checkbox")
    toggInp.setAttribute("role","switch")
    toggInp.setAttribute("onclick","showHidePass(this)")
    toggInp.setAttribute("id","customSwitch" + toggId)

    toggles.appendChild(toggInp)

    var toggLabel = document.createElement("label")
    toggLabel.setAttribute("class","custom-control-label")
    // toggLabel.setAttribute("onclick","showHidePass(this)")
    toggLabel.setAttribute("for","customSwitch" + toggId)
    toggInp.setAttribute("role","switch")
    toggLabel.setAttribute("id","customSwitch1")

    toggles.appendChild(toggLabel)


    td1.appendChild(document.createTextNode(i+1))
    td2.appendChild(document.createTextNode(data[i]['business_name']))
    // td3.appendChild(document.createTextNode(data[i]['password']))
    passObjs["password-value"+passCount] = data[i]['password']

    passCount ++ 


    td3.appendChild(document.createTextNode('*********'))
    td3.appendChild(toggles)
    td4.appendChild(editBtn)
    td4.appendChild(delBtn)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    


    table.appendChild(tr)
  }
    })
    .catch(error => console.log(error));

  }

  function getId(e){
    rowId = e.parentNode.id
    get_details()
}

function getIdUpd(e){
  updtId =   e.parentNode.parentNode.id
  $("#editModal").modal("show")
  // $("#editModal").modal("show")
  businessname.value = e.parentNode.parentNode.children[1].firstChild.textContent
  businesspass.value = passObjs[e.parentNode.parentNode.children[2].id]
}



function showHidePass(e){
  var input = document.getElementById(e.parentNode.parentNode.id);
  var passId = e.parentNode.parentNode.id
  var originalValue
  if(input.firstChild.textContent[0] == '*'){
      var checkbox = $("#"+e.id);
  
  // Get the input field element
  
  // Get the checkbox element
  
  // Store the original value of the input field
  originalValue = input.firstChild.textContent;
}
// Add a change event listener to the checkbox
try{
  checkbox.change(function() {
      // Check if the checkbox is checked
      if (checkbox.is(':checked')) {
        // Hide the value of the input field by setting it to an empty string
        input.firstChild.textContent = passObjs[passId];
      } else {
          // Show the value of the input field by setting it back to the original value
          input.firstChild.textContent = "*********";
    }
  });

}
catch(err){
  console.log(err)
}
}


function pass_check(){
  let passFlag = 0
  fetch('/data')
  .then(response => response.json())
  .then(data => {
    var pass = document.getElementById("businessPassInput")
    for(let i = 0;i<data.length;i++){
      if(rowname == data[i]['business_name'] && pass.value == data[i]['password']){
          get_details()
          passFlag = 1
          pass.value = ''
        }
      }
      if(passFlag == 0){
        alert("Wrong Password")
        pass.value = ''
      }
    })

}
function showModal(e){

    $("#passModal").modal("show")
    rowId = e.firstChild.innerText
    rowname = e.children[1].innerText
}


function login(){
  let flag = 0
  var email = document.getElementById('email')
  var pass = document.getElementById('pass')
  fetch('/login')
  .then(response => response.json())
  .then(data => {
    for(let i = 0;i<data.length;i++){
      if(email.value == 'admin' && data[i]['username'] == 'admin' && pass.value == data[i]['password']){
        flag = 1
        localStorage.setItem('loger',1)
        window.location.assign('/admindashboard')          
      }
      else if(email.value == 'user' && data[i]['username'] == 'user' && pass.value == data[i]['password']){
          localStorage.setItem('loger',2)
          flag = 1
          window.location.assign('/dashboard')          
      }
      }
      if(flag == 0){
        alert("Wrong Username or Password")
      }
    })
}
function logout(){
  // localStorage.setItem("loginflag",false)
  // localStorage.setItem("loginUser",'')
  window.location.replace("./");
}



function updateBusiness() {
  const businessName = document.getElementById('editNameInput').value;
  const businessPass = document.getElementById('editPassInput').value;
  var x = updtId
  console.log(x)
  fetch(`/update-business/${x}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({businessName,businessPass})
  })
  .then(response => {
    if (response.ok) {
      window.location.reload()
      console.log('Business name updated successfully.');
    } else {
      console.log('Failed to update business name.');
    }
  })
  .catch(error => console.log(error));
}

function delInvoice(e){
  var x = e.parentNode.parentNode.id 
  var confirm = prompt("Are you sure to delete? "+ ' \n' + 'Type "yes" for delete')
  if(confirm == null){
    confirm = 'No'
}
if(confirm.toLowerCase() == 'yes'){

  fetch(`/removeInvoice/${x}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      window.location.reload();
      console.log('Business record deleted successfully.');
    } else {
      console.log('Failed to delete business record.');
    }
  })
  .catch(error => console.log(error));
}
else{
    console.log("passed")
}


}


function editInv(){
  const date = document.getElementById('editexampleInput1').value;
  const description = document.getElementById('editexampleInput2').value;
  const total = document.getElementById('editexampleInput3').value;
  const debit = document.getElementById('editexampleInput4').value;
  const credit = document.getElementById('editexampleInput5').value;
  const remarks = document.getElementById('editexampleInput6').value;

  var x = editId
  
  if(date == ''){
    alert("Please Select date")
    return
  }
  fetch(`/updateInvoice/${x}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({date,description,total,debit,credit,remarks})
  })
  .then(response => {
    if (response.ok) {
      window.location.reload()
      console.log('Invoice updated successfully.');
    } else {
      console.log('Failed to update Invoice.');
    }
  })
  .catch(error => console.log(error));

}
