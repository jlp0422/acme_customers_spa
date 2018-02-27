/* eslint-disable */
// javascript and dom selection

const formButton = document.getElementById('createButton')
const emailInput = document.getElementById('email')
const customerList = document.getElementById('customerList')
const message = document.getElementById('message')
const newMessage = document.createElement('h4')
message.appendChild(newMessage)

const createCustomer = (customer) => {
  const newCustomer = document.createElement('li')
  newCustomer.style = 'margin:10px 0px';
  newCustomer.className = 'list-group-item'
  newCustomer.innerText = customer.email
  // creating remove button
  const removeButton = document.createElement('button')
  removeButton.innerText = 'Remove'
  removeButton.className = 'btn btn-outline-danger'
  removeButton.style = 'margin-left:10px;'
  customerList.appendChild(newCustomer)
  newCustomer.appendChild(removeButton)
  emailInput.value = ''
  // remove button click event
  removeButton.addEventListener('click', () => {
    deleteCustomer(customer)
    newCustomer.remove()
  })
}

const deleteCustomer = (customer) => {
  fetch(`/api/customers/${customer.id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'delete',
  })
}

const checkForError = (response) => {
  if (!response.ok) {
    return response.json()
      .then(res => {
        console.log(res.err.errors[0])
        newMessage.innerText = res.err.errors[0].message
        throw Error(response.error)
        return;
      })
  }
  return response
}

// fetching all customers
fetch('/api/customers')
  .then(checkForError)
  .then(result => result.json())
  .then(data => data.forEach(customer => createCustomer(customer)))
  .then(() => newMessage.innerText = 'Create a person!')
  .catch(console.log())

// adding new customer to list
formButton.addEventListener('click', () => {
  fetch('/api/customers', {
    headers: {'Content-Type': 'application/json'},
    method: 'post',
    body: JSON.stringify({email: emailInput.value})
  })
  .then(response => checkForError(response))
  .then(result => result.json())
  .then(customer => createCustomer(customer))
  .catch(error => console.log('posting\n', error))
})
