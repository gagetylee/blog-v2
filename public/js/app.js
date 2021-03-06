const titleInput = document.getElementById('edit-title')
const contentInput = document.getElementById('edit-content')
// var xhr = new XMLHttpRequest()
// xhr.open("POST", "/blog", true)

async function editPressed(id) {
    try {
        const response = await fetch('http://localhost:3000/' + id, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInput.value,
                content: contentInput.value,
            })
        })
        const article = await response.json()
        window.location.href = `/${article.slug}`
    } catch (e) {
        console.log(e);
    }
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