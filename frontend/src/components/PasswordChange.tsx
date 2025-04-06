import { useState } from 'react'
import Button from './Button';

type PasswordChangeProps = {
    password: string;
    token: string | null;
    onCancel: () => void;
};


const PasswordChange = ({ token, password, onCancel }: PasswordChangeProps) => {

    const [newPassword, setNewPassWord] = useState("");

    const handlePasswordReset = () => {
        fetch("http://localhost:8080/reset-password", {
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
            });;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassWord(event.target.value)
    }

    return (
        <div className='w-[20rem] h-[20rem] bg-white rounded-2xl flex flex-col justify-start m-auto p-4 '>
            <div className='mb-4'>
                <label className='block text-sm text-gray-500 font-bold mb-2'>Current password</label>
                <p className="font-bold text-2xl border-b-2 border-b-gray-400 py-2">{password}</p>
            </div>

            <div className='w-full'>
                <label className='block text-sm text-gray-500 font-bold mb-2'>New password</label>
                <input
                    name="newPassword"
                    onChange={handleChange}
                    value={newPassword}
                    className="font-sans font-semibold text-2xl border-b-2 border-b-gray-400 py-2 w-full bg-transparent"
                    placeholder='Enter new password'
                />
            </div>
            <div className='flex justify-between my-4'>
                <Button className='w-fit' onClick={handlePasswordReset}>Reset</Button>
                <Button className='w-fit' onClick={onCancel}>Cancel</Button>
            </div>
        </div>
    )
}

export default PasswordChange;