"use client"

import { useState, useEffect } from "react";
import Link from "next/link";



interface User {
    id: string,
    name: string,
    email:string

}
export default function Update() {




    const [user, setUsers] = useState<User>({ id: '', name: '' ,email:''});



    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('userToEdit');
            if (storedUser) {
                setUsers(JSON.parse(storedUser));
            }
        }

        if (user.id) { // Verifica se item.id è definito
            fetch(`http://localhost:3000/users/${user.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    return response.json();
                })
                .then(data => setUsers(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [user.id]);

    const handleUpdateUser = () => {
        fetch(`http://localhost:3000/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                // Eventualmente gestisci la risposta
                console.log('item updated successfully:', data);
                // Reindirizza l'utente alla pagina principale o a un'altra pagina di dettaglio dell'utente
                window.location.href = "/"
            })
            .catch(error => console.error('Error updating user:', error));
    };




    return (
        <>
            <h1 className=" text-center text-white">Update Item</h1>
            <div className="flex flex-col gap-1 w-96 m-auto justify-center bg-slate-500 p-3 rounded-md">

                <label className=" text-white" htmlFor="">Name</label>
                <input type="text" value={user.name} onChange={e => setUsers({ ...user, name: e.target.value })} />

                <label className=" text-white" htmlFor="">Email</label>
                <input type="text" value={user.email} onChange={e => setUsers({ ...user, email: e.target.value })} />



                <div className="flex justify-center gap-1">
                    <button className=" w-6/12 m-auto mt-1  bg-green-400 hover:bg-green-600 hover:cursor-pointer border-0 p-2 rounded-md text-white font-bold" onClick={handleUpdateUser}>Update User</button>
                    <button className=" w-6/12 m-auto mt-1  bg-red-400 hover:bg-red-600 hover:cursor-pointer border-0 p-2 rounded-md  font-bold"><Link className=" no-underline text-white" href={"/"}>Return to Users</Link></button></div>
            </div>

        </>
    )
}