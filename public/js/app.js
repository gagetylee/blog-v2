const form = document.querySelector('form')
const titleInput = document.querySelector('#title')
const contentInput = document.querySelector('#content')

// var xhr = new XMLHttpRequest()
// xhr.open("POST", "/blog", true)


// http://localhost:3000/weather?address=' + location

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = titleInput.value
    const content = contentInput.value

    fetch('http://localhost:3000/blog?title='+title+'&content='+content).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log("Error")
            } else {
                console.log('success')
            }
        })
    })
})