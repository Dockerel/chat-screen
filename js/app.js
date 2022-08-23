const chats = document.querySelector(".chats");
const option = document.querySelector("#option-select");
const chatInput = document.querySelector("input");
let chatClass = "myside";
const CHAT_KEY = "chats";
let chatList = [];

function handleOption(event) {
  const selectedIndex = event.target.options.selectedIndex;
  if (selectedIndex === 0) {
    chatClass = "myside";
  } else {
    chatClass = "opponent";
  }
}

function handleInput() {
  const chatContent = chatInput.value;
  chatInput.value = "";
  const chatCdnClass = `chat__${chatClass}`;
  const infoChat = { text: chatContent, class: chatCdnClass, id: Date.now() };
  chatList.push(infoChat);
  paintChats(infoChat);
  saveToDB();
}

function paintChats(newChats) {
  const img = document.createElement("img");
  img.src =
    "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/cnoC/image/4yPtuRXtR0-jusOMCCXb4MeN6zU.jpg";
  const div = document.createElement("div");
  div.classList.add(newChats.class);
  div.id = newChats.id;
  const span = document.createElement("span");
  span.innerText = newChats.text;
  if (newChats.class === "chat__opponent") {
    div.appendChild(img);
  }
  div.appendChild(span);
  chats.appendChild(div);
  div.addEventListener("dblclick", handleDeleteChat);
}

function saveToDB() {
  localStorage.setItem(CHAT_KEY, JSON.stringify(chatList));
}

function handleDeleteChat(event) {
  const rmv = event.target.parentElement;
  chatList = chatList.filter((chat) => chat.id !== parseInt(rmv.id)); // localStorage의 item 지우는 부분. chat.id !== parseInt(rmv.id) 가 참인 경우 제외하고 filter 시킴.
  rmv.remove(); //실제 element 지우는 부분
  saveToDB();
}

chatInput.addEventListener("change", handleInput);
option.addEventListener("change", handleOption);

const savedChats = localStorage.getItem(CHAT_KEY);

if (savedChats !== null) {
  const parsedChats = JSON.parse(savedChats);
  chatList = parsedChats;
  parsedChats.forEach(paintChats);
}
