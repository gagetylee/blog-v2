const deleteButton = document.getElementById('delete')

// var xhr = new XMLHttpRequest()
// xhr.open("POST", "/blog", true)

async function editPressed(id) {
    
}


async function deletePressed(id) {
    let res = confirm("Are you sure you want to delete this post?")
    if (res) {
        await fetch('http://localhost:3000/' + id, {
            method: 'DELETE'
        })
        window.location.href = '/'
    }
};