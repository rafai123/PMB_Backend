function deleteBioById (idBio) {
    fetch(`http://localhost:3003/biodata/${idBio}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
}).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

deleteBioById(4) // Comment added