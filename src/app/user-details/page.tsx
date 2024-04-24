"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Componente UserDetails
export default function UserDetails() {
    const [userData, setUserData] = useState({ id: '', name: '', email: '' });

    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id') || '';
        const name = queryParams.get('name') || '';
        const email = queryParams.get('email') || '';
        setUserData({ id, name, email });
    }, []);

    return (
        <>
            <h1 className='text-white text-center'>User Details</h1>
            <div className='flex justify-items-center mt-3 flex-col '>
                <div className='text-white w-1/4 bg-slate-500 p-3 rounded-md m-auto'>
                    <label className=' font-bold'>ID </label>
                    <p>{userData.id}</p>
                    <label className=' font-bold'>Name</label>
                    <p>{userData.name}</p>
                    <label className=' font-bold'>Email</label>
                    <p>{userData.email}</p>
                    <div className='flex justify-center'>
                        <Link className=' no-underline font-bold bg-blue-300 hover:bg-blue-600 hover:cursor-pointer border-0 p-2 rounded-md text-white' href='/'>
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
