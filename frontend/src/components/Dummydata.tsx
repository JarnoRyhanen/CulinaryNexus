import { useEffect, useState } from 'react'

type User = {
    id: number;
    name: string;
    email: string;
}

const Dummydata = () => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        fetch('http://localhost:8080/api')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <div className="flex justify-stretch mx-8 p-2 flex-wrap">
                {users.map(user => (
                    <div key={user.id} className='p-2 m-4 gap-1 flex flex-col 
                    w-[16rem]  border border-black'>
                        <h1 className="text-3xl font-bold">
                            {user.name}
                        </h1>
                        {user.id}
                        <p>
                            {user.email}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dummydata;