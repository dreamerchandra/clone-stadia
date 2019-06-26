console.log('12312');
chrome.runtime.onMessageExternal.addListener(
  function (request, sender, sendResponse) {
    console.log(request);
    if (request.msg) {
      sendNativeMessage(request.msg)
    }
    if (request.start) {
      connect()
    }
  }
);

function appendMessage(text) {
  // document.getElementById('response').innerHTML += "<p>" + text + "</p>";
}

function sendNativeMessage(message) {
  message = {"text": message};
  port.postMessage(message);
  appendMessage("Sent message: <b>" + JSON.stringify(message) + "</b>");
}

function onNativeMessage(message) {
  appendMessage("Received message: <b>" + JSON.stringify(message) + "</b>");
}

function onDisconnected() {
  appendMessage("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
  // updateUiState();
}
function updateUiState() {
  if (port) {
    document.getElementById('connect-button').style.display = 'none';
    document.getElementById('input-text').style.display = 'block';
    document.getElementById('send-message-button').style.display = 'block';
  } else {
    document.getElementById('connect-button').style.display = 'block';
    document.getElementById('input-text').style.display = 'none';
    document.getElementById('send-message-button').style.display = 'none';
  }
}
function connect() {
  var hostName = "com.google.chrome.example.echo";
  appendMessage("Connecting to native messaging host <b>" + hostName + "</b>")
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
  // updateUiState();
}