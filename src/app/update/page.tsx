"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

interface User {
    id: number, // Modifica il tipo di id in number
    name: string,
    email: string
}

export default function Update() {
    const [user, setUser] = useState<User>({ id: 0, name: '', email: '' }); // Imposta id su 0 o un valore iniziale appropriato
    const navigation = useRouter();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = parseInt(queryParams.get('id') || '0'); // Converti l'id da stringa a numero
        const name = queryParams.get('name') || '';
        const email = queryParams.get('email') || '';
        setUser({ id, name, email });
    }, []);

    const handleUpdateUser = () => {
        fetch(`http://localhost:4545/api/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                console.log('user updated successfully:', data);
                // Reindirizza l'utente alla home
                navigation.push("/");
            })
            .catch(error => console.error('Error updating user:', error));
    };

    return (
        <>
            <h1 className="text-center text-white">Update Item</h1>
            <div className="flex flex-col gap-1 w-96 m-auto justify-center bg-slate-500 p-3 rounded-md">
                <label className="text-white" htmlFor="name">Name</label>
                <input type="text" id="name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />

                <label className="text-white" htmlFor="email">Email</label>
                <input type="text" id="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />

                <div className="flex justify-center gap-1">
                    <button className="w-6/12 m-auto mt-1 bg-green-400 hover:bg-green-600 hover:cursor-pointer border-0 p-2 rounded-md text-white font-bold" onClick={handleUpdateUser}>Update User</button>
                    <button className="w-6/12 m-auto mt-1 bg-red-400 hover:bg-red-600 hover:cursor-pointer border-0 p-2 rounded-md font-bold">
                        <Link className="no-underline text-white" href={"/"}>
                            Return to Users
                        </Link>
                    </button>
                </div>
            </div >
        </>
    )
}
