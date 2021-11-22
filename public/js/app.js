const deleteButton = document.getElementById('delete')

// var xhr = new XMLHttpRequest()
// xhr.open("POST", "/blog", true)

async function deletePressed(id) {
    await fetch('http://localhost:3000/' + id, {
        method: 'DELETE'
    })
    window.location.href = '/'
};