const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const chatSendButton = document.querySelector('.chat-input button');

chatSendButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevents the default action of the "click" event
    const message = chatInput.value;
    if (message.trim() !== '') {
        const userMessage = createUserMessage(message);
        chatMessages.appendChild(userMessage);
        chatInput.value = '';

        // Send user's message to the server and get bot's response
        const botMessage = createBotMessage("Dummy bot response");
        chatMessages.appendChild(botMessage);
    }
});


chatInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) { // If "Enter" key is pressed
        event.preventDefault(); // Prevents the default action of the "Enter" key
        const message = chatInput.value;
        if (message.trim() !== '') {
            const userMessage = createUserMessage(message);
            chatMessages.appendChild(userMessage);
            chatInput.value = '';

            // Send user's message to the server and get bot's response
            const botMessage = createBotMessage("Dummy bot response");
            chatMessages.appendChild(botMessage);
        }
    }
});

function createUserMessage(message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('user-message');
    messageContainer.innerHTML = message;
    return messageContainer;
}

function createBotMessage(message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('bot-message');
    messageContainer.innerHTML = message;
    return messageContainer;
}

// PDFObject.embed("E:/MLSA/MSLearn_SA_StyleGuide_External_V1.1_081120.pdf", "#pdf", { 
//     height: "800px",
//         pdfOpenParams: { 
//         view: "FitV",
//         pagemode: "none",
//         zoom: "100%",
//         scrollbar: "0",
//         toolbar: "0",
//         statusbar: "0",
//         messages: "0"
//       }
//   });
var c = localStorage.getItem('filepath')
PDFObject.embed(c, "#pdf", { // Write by replacing X
    height: "690px", 
    width: "100%", 
    pdfOpenParams: { 
        zoom: "100%",
        toolbar: "0",
        statusbar: "0",
        navpanes: "0",
        scrollbar: "0",
        viewarea: "fit",
        pagemode: "none"
    } 
});

// PDFObject.embed(X, "#pdf", { // Write by replacing X
//     height: "690px", 
//     width: "100%", 
//     pdfOpenParams: { 
//         zoom: "100%",
//         toolbar: "0",
//         statusbar: "0",
//         navpanes: "0",
//         scrollbar: "0",
//         viewarea: "fit",
//         pagemode: "none"
//     } 
// });
//   height: "800px",
//   pdfOpenParams: { 
//     view: "FitV",
//     pagemode: "none",
//     zoom: "90%"
//   },
//   options: {
//     pdfOpenParams: {
//       toolbar: "0",
//     }
//   }

//   v