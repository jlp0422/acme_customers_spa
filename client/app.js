/* eslint-disable */
// javascript and dom selection

const formButton = document.getElementById('createButton')
const emailInput = document.getElementById('email')
const customerList = document.getElementById('customerList')
const message = document.getElementById('message')
const newMessage = document.createElement('p')

const emails = []

fetch('/api')
  .then(result => result.json())
  .then(data => {
    data.forEach(person => {
      // creating person list item
      const newPerson = document.createElement('li')
      newPerson.style = 'margin:15px 0px';
      newPerson.innerText = person.email
      newPerson.id = person.id
      // creating remove button
      const removeButton = document.createElement('button')
      removeButton.innerText = 'Remove'
      removeButton.className = 'btn btn-danger'
      removeButton.style = 'margin-left:10px;'
      customerList.appendChild(newPerson)
      newPerson.appendChild(removeButton)
      // keeping track of emails
      emails.push(person.email)

      removeButton.addEventListener('click', () => {
        fetch(`/api/customers/${newPerson.id}`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'delete',
          body: JSON.stringify({ id: `${newPerson.id}` })
        })
        newPerson.remove()
      })

    })
  })
  .then(() => {
    newMessage.innerText = 'Create a person!'
    message.appendChild(newMessage)
  })
  .catch(console.error)

// adding new person to list
formButton.addEventListener('click', () => {
  fetch('/api/customers', {
    headers: {'Content-Type': 'application/json'},
    method: 'post',
    body: JSON.stringify({email: emailInput.value})
  })
  .then(result => result.json())
  .then(customer => {
    // checking to see if email already exists
    if (emails.includes(customer.email)) {
      newMessage.innerText = 'Emails must be unique!'
      return;
    }
    // creating new person list item
    const newPerson = document.createElement('li')
    newPerson.style = 'margin:15px 0px';
    newPerson.innerText = customer.email
    newPerson.id = customer.id
    // creating remove button
    const removeButton = document.createElement('button')
    removeButton.innerText = 'Remove'
    removeButton.className = 'btn btn-danger'
    removeButton.style = 'margin-left:10px;'
    customerList.appendChild(newPerson)
    newPerson.appendChild(removeButton)
    // keeping track of emails
    emails.push(customer.email)
    // setting input field to empty after successfull submission
    emailInput.value = ''

    removeButton.addEventListener('click', () => {
      fetch(`/api/customers/${newPerson.id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'delete',
        body: JSON.stringify({ id: `${newPerson.id}` })
      })
      newPerson.remove()
    })

  })
  .catch(console.error)
})
