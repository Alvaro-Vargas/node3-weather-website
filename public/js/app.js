console.log('Client Side JS loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.innerHTML = '<h1>test</h1>'


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const location = search.value;

  messageOne.textContent = ' ';
  messageTwo.textContent = ' ';

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {

    res.json().then((data) => {
      if (data.error) {
        if (data.err){
          return messageTwo.innerHTML = `<b>Oops... ${data.err}`
        }
        messageTwo.innerHTML = `<b>Oops... ${data.error}`
        return console.log('Error in the API');
      } else {
        
        search.value = ' ';
        messageOne.innerHTML = '<b>Thank you</b> for searching! <b>:)</b><br> Our meteorologists are running to get that for you!'

        setTimeout(() => {
          messageOne.innerHTML = `In <b>${data.location}</b> it is ${data.weatherDescription}. <br> The current temperature is: <b>${data.temperature}</b> degrees and it feels like <b>${data.feelslike}</b> degrees`  
        }, 1500)

      }
    })
  })

})