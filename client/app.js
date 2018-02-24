/* eslint-disable */
// javascript and dom selection

const formButton = document.getElementById('createButton')
const emailInput = document.getElementById('email')

fetch('/api')
  .then(result => result.json())
  .then(data => {
    data.forEach(person => {
      const newPerson = document.createElement('li')
      newPerson.innerText = person.email
      document.getElementById('customerList').appendChild(newPerson)
    })
  })
  .then(() => {
    const message = document.getElementById('message')
    const newMessage = document.createElement('p')
    newMessage.innerText = 'Create a person!'
    message.appendChild(newMessage)
  })
  .catch(console.error)

// adding new person to list
formButton.addEventListener('click', () => {
  fetch('/api/customers', {
    method: 'POST',
  })
    .then(result => {
      console.log(result)
      result.json()})
    .then(data => {
      console.log(data)

    })
    .catch(console.error)
  const newPerson = document.createElement('li')
  newPerson.innerText = emailInput.value
  document.getElementById('customerList').appendChild(newPerson)
})

