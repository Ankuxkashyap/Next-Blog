"use client";
import axios from "axios";

export default function LogoutButton() {
    const handelLogout = async () => {
        try {
           const res  = await axios.get('/api/auth/logout')
            console.log('Logout response:', res);
            if(res.status === 200){
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    return (
        <button onClick={handelLogout} className="px-3 py-1 md:px-4 md:py-2  md:block text-xl bg-red-600 rounded-xl cursor-pointer text-white hover:bg-red-800 transition ">LogOut</button>
    );
}
