"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UserDetails() {
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedUserName, setSelectedUserName] = useState('');
    const [selectedUserEmail, setSelectedUserEmail] = useState('');

    useEffect(() => {
        const id = localStorage.getItem('selectedUserId');
        const name = localStorage.getItem('selectedUserName');
        const email =localStorage.getItem('selectedUserEmail');
        if (id && name && email) {
            setSelectedUserId(id);
            setSelectedUserName(name);
            setSelectedUserEmail(email)
        }
    }, []);

   

    return (
        <>
            <h1 className='text-white text-center'>User Details</h1>
            <div className='flex justify-items-center mt-3 flex-col '>
                <div className='text-white w-1/4 bg-slate-500 p-3 rounded-md m-auto'>

                    <p>ID: {selectedUserId}</p>
                    <p>Name: {selectedUserName}</p>
                    <p>Email: {selectedUserEmail}</p>
                    <div className='flex justify-center'>
                        <button className='font-bold bg-blue-300 hover:bg-blue-600 hover:cursor-pointer border-0 p-2 rounded-md text-white '>
                            <Link className=' no-underline text-white' href={'/'}>Return Home</Link>
                        </button>
                    </div>
                </div>

            </div>

        </>
    );
}
