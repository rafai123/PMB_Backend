function addAdmin () {
    fetch(`http://localhost:3003/admin/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "admin",
            email: "admin@admin",
            password: "admin",
            avatar: "https://pub-83c13c4b6141426b8e4d3d54567ecbb9.r2.dev/60443788106602",
        })

}).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

addAdmin() // Comment added