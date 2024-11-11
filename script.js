function validate() {
    let user = document.getElementById("username").value
    let pass = document.getElementById("password").value
    if (user === "admin" && pass === "admin") {
        window.location.href = "/dashboard.html"
    } else {
        alert("wrong password")
    }
}

let usernames = []

async function fetchGitHubUsers() {
    const response = await fetch("https://api.github.com/users")
    const data = await response.json()
    usernames = data.slice(0, 10).map(user => ({ login: user.login, url: user.html_url }))
    displayUsers()
}

function displayUsers() {
    const userList = document.getElementById("userList")
    const sortOption = document.getElementById("sortOption").value
    const displayedUsernames = sortOption === "sorted" ? [...usernames].sort((a, b) => a.login.localeCompare(b.login)) : usernames
    userList.innerHTML = ""
    displayedUsernames.forEach(user => {
        const listItem = document.createElement("li")
        const link = document.createElement("a")
        link.href = user.url
        link.textContent = user.login
        link.target = "_blank"
        listItem.appendChild(link)
        userList.appendChild(listItem)
    })
}

function logout() {
    window.location.href = "/index.html"
}
