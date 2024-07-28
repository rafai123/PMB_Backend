function deleteUserById (idUser) {
    fetch(`http://localhost:3003/user/delete/${idUser}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
}).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

deleteUserById(4) // Comment added