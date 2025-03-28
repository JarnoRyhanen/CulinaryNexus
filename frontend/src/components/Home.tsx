import React, { useEffect, useState } from 'react'

const Home = () => {

    type User = {
        id: number;
        name: string;
        email: string;
    }

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (

        <div className='bg-cyan-700 w-screen h-screen p-20'>
            Home, THIS SHOULD ONLY BE VISIBLE AFTER AUTH

            <div className="flex justify-stretch mx-8 p-2 flex-wrap">
                {users.map(user => (
                    <div key={user.id} className='p-2 m-4 gap-1 flex flex-col 
                    w-[16rem]  border border-black'>
                        <h1 className="text-3xl font-bold">
                            {user.name}
                            {}
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