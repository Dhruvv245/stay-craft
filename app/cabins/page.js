export default async function Page(){
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    return <div>
        <ul>{users.map(user=>(
            <li key={user.id}>{user.name}</li>
        ))}</ul>
        <h1>Cabins Page</h1>
    </div>
}