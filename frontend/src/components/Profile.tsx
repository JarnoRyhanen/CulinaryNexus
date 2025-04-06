import { useEffect, useState } from 'react'
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import PasswordChange from './PasswordChange';
import { eventNames } from 'process';

const Profile = () => {

    const token = localStorage.getItem("token");

    const [backgroundShade, setBackgroundShade] = useState(false);

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const authContext = useAuth();

    const fetchData = () => {

        fetch("http://localhost:8080/current-user", {
            headers: {
                'Authorization': token ? `Bearer ${token}` : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setUser(data)
            }
            );

    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            authContext?.logout();
            navigate("/");
        }
    }

    const openChangePassword = () => {
        event?.preventDefault()
        setBackgroundShade(true);
    }

    const closePasswordChange = () => {
        setBackgroundShade(false); 
    };

    return (
        <>
            <div className="relative w-screen h-screen bg-sky-100">
                {backgroundShade && (
                    <>
                        <div className="absolute top-0 left-0 w-full h-full bg-black/90 z-10"></div>

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                            <PasswordChange password={user.password} token={token} onCancel={closePasswordChange} />
                        </div>
                    </>
                )}
                <header className="relative w-auto h-[5.5rem] bg-white flex">
                    <p className="font-normal text-4xl font-sans m-auto">Profile</p>
                </header>
                <form className="flex flex-col gap-6 border rounded-2xl w-[90%] max-w-[30rem] h-4/6 p-6 items-center m-auto mt-12 bg-white shadow-lg">
                    <div className="w-full">
                        <label className="block text-gray-500 text-sm font-bold mb-2">Username</label>
                        <p className="font-bold text-2xl border-b-2 border-b-gray-400 py-2">{user.username}</p>
                    </div>
                    <div className="w-full">
                        <label className="block text-gray-500 text-sm font-bold mb-2">Email</label>
                        <p className="font-bold text-2xl border-b-2 border-b-gray-400 py-2">{user.email}</p>
                    </div>
                    <div className="w-full">
                        <label className="block text-gray-500 text-sm font-bold mb-2">Password</label>
                        <p className="font-bold text-2xl border-b-2 border-b-gray-400 py-2">{user.password}</p>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <Button onClick={handleLogout}>Log out</Button>
                        <Button onClick={openChangePassword}>Change password</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Profile;