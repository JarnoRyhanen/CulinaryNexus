import { useEffect, useState } from 'react'

const Home = () => {

    type User = {
        id: number;
        name: string;
        email: string;
    }
    const [users, setUsers] = useState<User[]>([]);


    const username: string | null = localStorage.getItem("username");
    const password: string | null = localStorage.getItem("password");

    useEffect(() => {

        fetch('http://localhost:8080/users', {
            headers: {
                'Authorization': username && password ? 'Basic ' + btoa("kuusi" + ":" + "0000") : '',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }).then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (

        <div className='bg-cyan-700 w-screen h-screen p-20'>
            Home, THIS SHOULD ONLY BE VISIBLE AFTER AUTH
            <p>Welcome, {localStorage.getItem("username")} from localstorage</p>
            <p>Your email: {localStorage.getItem("email")}</p>
            <p>Your password: {localStorage.getItem("password")}</p>
            <div className="flex justify-stretch mx-8 p-2 flex-wrap">
                {users.map(user => (
                    <div key={user.id} className='p-2 m-4 gap-1 flex flex-col 
                    w-[16rem]  border border-black'>
                        <h1 className="text-3xl font-bold">
                            {user.name}
                            { }
                        </h1>
                        {user.id}
                        <p>
                            {user.email}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;