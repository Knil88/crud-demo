"use client"

import { useState, useEffect } from "react";
import Link from "next/link";



interface Item {
    id: string,
    name: string,

}
export default function Update() {




    const [item, setitems] = useState<Item>({ id: '', name: '' });



    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedItem = localStorage.getItem('itemToEdit');
            if (storedItem) {
                setitems(JSON.parse(storedItem));
            }
        }

        if (item.id) { // Verifica se item.id è definito
            fetch(`http://localhost:5000/items/${item.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    return response.json();
                })
                .then(data => setitems(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [item.id]);

    const handleUpdateUser = () => {
        fetch(`http://localhost:5000/items/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
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
                <input type="text" value={item.name} onChange={e => setitems({ ...item, name: e.target.value })} />



                <div className="flex justify-center gap-1">
                    <button className=" w-6/12 m-auto mt-1  bg-green-400 hover:bg-green-600 hover:cursor-pointer border-0 p-2 rounded-md text-white font-bold" onClick={handleUpdateUser}>Update Item</button>
                    <button className=" w-6/12 m-auto mt-1  bg-red-400 hover:bg-red-600 hover:cursor-pointer border-0 p-2 rounded-md  font-bold"><Link className=" no-underline text-white" href={"/"}>Return to Users</Link></button></div>
            </div>

        </>
    )
}