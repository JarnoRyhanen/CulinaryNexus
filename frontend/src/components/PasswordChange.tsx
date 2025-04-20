import { useState } from 'react'

type PasswordChangeProps = {
    password: string;
    token: string | null;
    onCancel: () => void;
};


const PasswordChange = ({ token, password, onCancel }: PasswordChangeProps) => {

    const [newPassword, setNewPassWord] = useState("");

    const handlePasswordReset = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/reset-password`, {
            method: "PUT",
            headers: {
                'Authorization': token ? `Bearer ${token}` : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: newPassword,
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to reset password");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Password reset successful:", data);
                alert("Password reset successful!");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error resetting password:", error);
                alert("Failed to reset password. Please try again.");
            });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassWord(event.target.value)
    }

    return (
        <div className="w-[22rem] h-auto bg-white rounded-2xl flex flex-col justify-start items-center p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Change Password</h2>
            <div className="w-full mb-6">
                <label className="block text-sm text-gray-500 font-bold mb-2">Current Password</label>
                <p className="font-bold text-lg border-b-2 border-gray-300 py-2 text-gray-700">{password}</p>
            </div>

            <div className="w-full mb-6">
                <label className="block text-sm text-gray-500 font-bold mb-2">New Password</label>
                <input
                    name="newPassword"
                    onChange={handleChange}
                    value={newPassword}
                    className="font-sans font-medium text-lg border-b-2 border-gray-300 py-2 w-full bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter new password"
                />
            </div>

            <div className="flex justify-between w-full gap-4">
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                    onClick={handlePasswordReset}
                >
                    Reset
                </button>
                <button
                    className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default PasswordChange;