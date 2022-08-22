const clock = document.querySelector(".clock");

function getTime() {
  const time = new Date();
  const hour = time.getHours();
  const minute = String(time.getMinutes()).padStart(2, "0");
  clock.innerText = `${hour}:${minute}`;
}
getTime();
setInterval(getTime, 1000);
