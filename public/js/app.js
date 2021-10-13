const form = document.querySelector('form')
const titleInput = document.querySelector('#title')
const contentInput = document.querySelector('#content')

var xhr = new XMLHttpRequest()
xhr.open("POST", "/blog", true)

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = titleInput.value
    const content = contentInput.value

    fetch('/blog').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log("Error")
            } else {

            }
        })
    })
})