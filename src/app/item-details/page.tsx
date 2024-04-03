"use client"
import { useEffect, useState } from 'react';

export default function ItemDetails() {
    const [selectedItemId, setSelectedItemId] = useState('');
    const [selectedItemName, setSelectedItemName] = useState('');

    useEffect(() => {
        const id = localStorage.getItem('selectedItemId');
        const name = localStorage.getItem('selectedItemName');
        if (id && name) {
            setSelectedItemId(id);
            setSelectedItemName(name);
        }
    }, []);

    const handleReturnHome = () => {
        window.location.href = '/';
    }

    return (
        <>
            <h1 className='text-white text-center'>Item Details</h1>
            <div className='flex justify-items-center mt-3 flex-col '>
                <div className='text-white w-1/4 bg-slate-500 p-3 rounded-md m-auto'>

                    <p>ID: {selectedItemId}</p>
                    <p>Name: {selectedItemName}</p>
                    <p>Description: lorem ipsum</p>
                    <div className='flex justify-center'>
                        <button className='font-bold bg-blue-300 hover:bg-blue-600 hover:cursor-pointer border-0 p-2 rounded-md text-white '
                            onClick={() => handleReturnHome()}>
                            Return To the Home
                        </button>
                    </div>
                </div>

            </div>

        </>
    );
}
