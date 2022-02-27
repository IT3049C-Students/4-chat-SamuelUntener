const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

function fetchMessages() {
return fetch('https://it3049c-chat-application.herokuapp.com/messages')
      .then(response => response.json())
}

async function updateMessages() {
  // Fetch Messages
  const messages = await fetchMessages();
  // Loop over the messages. Inside the loop we will:
      // get each message
      // format it
      // add it to the chatbox
  let formattedMessages = "";
  messages.forEach(message => {
      formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;

}

updateMessages() 
const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  }
}


function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  }

  fetch ('https://it3049c-chat-application.herokuapp.com/messages', {
      method: `POST`, 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
  });
}

sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  validate();

  sendMessages(sender,message);
  myMessage.value = "";

});

function validate() {
    if(validateFields){
        localStorage.setItem('sender', userInput[0].value);
      }
   }
  
  function validateFields(){
   var retVal = false;
   var userInput = document.querySelectorAll("nameInput");
   for(var i = 0; i < userInput.length; i++) {
      if(userInput[i].value === "") {
        alert("Please fill all required fields!");
        break;
      }else{
        retval = true;
      }
    }
   return retval;
  }

  function SaveUsername(){
      localStorage.setItem('nameInput', JSON.stringify(nameInput))
  }

  function ChangeUsername(){
      localStorage.removeItem(nameInput)
      localStorage.setItem('nameInput', JSON.stringify(nameInput))
  }

  function darkmode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }