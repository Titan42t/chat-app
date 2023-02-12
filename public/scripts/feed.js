const divParent = document.getElementById('posts')

function addMessage(name, message) {
  const divPost = document.createElement('div')
  divPost.className = 'post'
  const messageElement = document.createElement('p')
  messageElement.innerText = name + ' : ' + message
  const dateElement = document.createElement('p')
  dateElement.innerText = "Il y a quelques instants"
  divPost.appendChild(messageElement)
  divPost.appendChild(dateElement)
  const postsElement = document.getElementsByClassName('post')
  divParent.insertBefore(divPost, postsElement[0])
}

let ws

function connect() {
  ws = new WebSocket('ws://localhost:3000/ws')
  ws.onopen = () => {
    console.log('Connected')
  }

  ws.onclose = () => {
    console.log('Disconnected')
    setTimeout(connect, 1000)
  }

  ws.onerror = (error) => {
    console.log('Error', error)
  }

  ws.onmessage = (event) => {
    console.log('Message from server', event.data)
    const {type, data} = JSON.parse(event.data)
    console.log(data)
    if (type === 'reply') {
      addMessage(
        data.user.name,
        data.msg
      )
    }
  }
}

connect()

document.querySelector('form')
  .addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.querySelector('#contentInput')
    ws.send(input.value)
    input.value = ''
  })
