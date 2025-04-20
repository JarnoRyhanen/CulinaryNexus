import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import PasswordChange from './PasswordChange';

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
        fetch(`${import.meta.env.VITE_BACKEND_URL}/current-user`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((data) => {
                setUser(data);
            });
    };

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

    const handleDeleteAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmDelete) {
            fetch("https://culinary-nexus-web-app-culinarynexus.2.rahtiapp.fi/delete-account", {
                method: "DELETE",
                headers: {
                    'Authorization': token ? `Bearer ${token}` : "",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    console.log(response);

                    if (!response.ok) {
                        throw new Error("Failed to delete account");
                    }
                })
                .then(() => {
                    console.log("deleted");

                    alert("Your account has been deleted successfully.");
                    authContext?.logout();
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Error deleting account:", error);
                    alert("Failed to delete account. Please try again.");
                });
        }
    };

    return (
        <div className="relative w-screen h-screen bg-gradient-to-b from-blue-100 to-sky-200">
            {backgroundShade && (
                <>
                    <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <PasswordChange password={user.password} token={token} onCancel={closePasswordChange} />
                    </div>
                </>
            )}
            <header className="relative w-full h-[5.5rem] bg-white shadow-md flex items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            </header>
            <form className="flex flex-col gap-6 border rounded-2xl w-[90%] max-w-[30rem] h-auto p-6 items-center m-auto mt-12 bg-white shadow-lg">
                <div className="w-full">
                    <label className="block text-gray-500 text-sm font-bold mb-2">Username</label>
                    <p className="font-bold text-xl border-b-2 border-gray-300 py-2">{user.username}</p>
                </div>
                <div className="w-full">
                    <label className="block text-gray-500 text-sm font-bold mb-2">Email</label>
                    <p className="font-bold text-xl border-b-2 border-gray-300 py-2">{user.email}</p>
                </div>
                <div className="w-full">
                    <label className="block text-gray-500 text-sm font-bold mb-2">Password</label>
                    <p className="font-bold text-xl border-b-2 border-gray-300 py-2">********</p>
                </div>
                <div className="flex flex-row justify-between w-full gap-4">
                    <button
                        className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                        onClick={openChangePassword}
                    >
                        Change password
                    </button>
                </div>
                <button
                    className="w-full bg-red-700 text-white py-2 rounded-lg shadow-md hover:bg-red-900 transition"
                    onClick={handleDeleteAccount}
                >
                    Delete account
                </button>
            </form>
        </div>
    );
}

export default Profile;