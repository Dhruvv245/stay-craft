import Counter from "../components/Counter";

export default async function Page(){
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    return <div>
        <h1>Cabins Page</h1>
        <Counter users={users}/>
    </div>
}