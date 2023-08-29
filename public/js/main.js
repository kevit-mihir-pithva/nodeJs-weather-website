const weatherForm = document.querySelector("form");
const inputData = document.querySelector("input");
const messageOne =  document.querySelector("#m1")
const messageTwo =  document.querySelector("#m2")


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = inputData.value;
    messageOne.textContent="loading.."
    messageTwo.textContent=""
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent=data.error
      } else {
        messageOne.textContent=data.location
        messageTwo.textContent=data.forcast
      }
    });
  });
});
