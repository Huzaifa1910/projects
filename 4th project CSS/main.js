// Get DOM elements
const searchField = document.querySelector('.search-field');
const infoSection = document.querySelector('.info-section');
const mapSection = document.querySelector('.map-section');
const submitButton = document.querySelector('.submit-button');
const chatMessages = document.querySelector('#chat-messages');

//Autocomplete address field
 function initialize() {
  // console.log('reached111')
  const input = document.getElementById('fromloc');
  const autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    const place = autocomplete.getPlace();
    // console.log(place)
    const data = {address:place};
      // document.getElementById('city2').value = place.name;
      // document.getElementById('cityLat').value = place.geometry.location.lat();
      // document.getElementById('cityLng').value = place.geometry.location.lng();
      fetch(`/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        if (data.status != true) {
          alert(data.message)
        }
        else{
          // console.log('under else')
          // Access the values in the response
          const address = data.address;
          const status = data.status;
          const price = data.price;
          const bed = data.bed;
          const bath = data.bath;
          const sizeSqft = data["size-sqft"];
          // and so on for other properties
          document.getElementById('field1').value = address;
          document.getElementById('field3').value = price;
          document.getElementById('field4').value = bed;
          document.getElementById('field5').value = bath;
          document.getElementById('field6').value = sizeSqft;
          // Print the values
          // console.log("Status:", status);
          // console.log("Price:", price);
          // console.log("Bed:", bed);
          // and so on for other properties
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
      
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
// Simulate response delay (Replace with your actual response logic)
setTimeout(function() {
  // Remove the typing animation and display the bot response
  var typingAnimation = document.querySelector('.typing-animation');
  typingAnimation.parentNode.innerHTML = 'Bot response goes here';
}, 15000); // 15 seconds (Adjust the time according to your response delay)


// Event listener for submit button click
submitButton.addEventListener('click', async () => {
  // console.log('Clicked')

  const address = document.getElementById('field1').value;
  const price = document.getElementById('field3').value;
  const bed = document.getElementById('field4').value;
  const bath = document.getElementById('field5').value;
  const sizeSqft = document.getElementById('field6').value;

  
  const userData = {
    'address':address,
    'price':price,
    'bed':bed,
    'bath':bath,
    'sizeSqft':sizeSqft
  };

  // Clear search field
  searchField.value = '';

  // Display user message
  // displayUserMessage(userData.address);
  const status = 1
  // Send user message to server
  // const response = await fetch(`/chatbot?user_id=${USER_ID}`, {
  const response = await fetch(`/chatbot?status=${status}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  // Get response from server
  const data = await response.json();
  // console.log(data)
  // Display bot response
  // const botMessage = data;
  displayBotMessage(data.firstResponse);
  displayBotMessage(data.secondResponse);
});

// Function to display bot message
function displayBotMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'bot');
  messageElement.style.borderRadius = '15px';
  const messageText = document.createElement('p');
  messageText.innerText = message;
  messageElement.appendChild(messageText);
  chatMessages.insertBefore(messageElement, chatMessages.firstChild);
}

// Function to display user message
function displayUserMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'user');
  const messageText = document.createElement('p');
  messageText.innerText = message;
  messageElement.appendChild(messageText);
  chatMessages.appendChild(messageElement);
}

