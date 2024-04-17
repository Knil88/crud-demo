"use client"
import "animate.css";
import Link from 'next/link';
import router from 'next/router';
import { useState, useEffect } from 'react';



interface Users {
  id: string;
  name: string;
  email:string;


}

export default function Home() {
  const [users, setUsers] = useState<Users[]>([]);
  const [newUser, setNewUser] = useState<Users>({ id: '', name: '' ,email:''});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string>('');
  const [newUserModal, setNewUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  



  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleEditUser = (user: Users) => {
    localStorage.setItem('userToEdit', JSON.stringify(user));
  };


  const handleAddUser = () => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, data]);
        setNewUser({ id: '', name: '', email:'' });
        setNewUserModal(false);

      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleDeleteItem = () => {
    fetch(`http://localhost:3000/users/${userToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userToDelete })
    })
      .then(response => {
        if (response.ok) {
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete));
          setUserToDelete('');
          setDeleteModalOpen(false); // Chiudi il modal dopo aver eliminato l'utente
        } else {
          throw new Error('Failed to delete item');
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleDetailsClick = (user: Users) => {
    localStorage.setItem('selectedUserId', user.id);
    localStorage.setItem('selectedUserName', user.name);
    localStorage.setItem('selectedUserEmail', user.email);
    window.location.href = `/user-details?id=${user.id}`

  };



  return (
    <>

      <h1 className='text-center text-white'>Users Table</h1>
      <div>
        <div className='flex   flex-col '>

          <table className='table-auto  border-solid border-3 border-sky-500    text-white w-1/4 m-auto mb-3'>
            <thead>
              <tr className='bg-slate-500'>
                <th className=' p-2'>Id</th>
                <th className=' p-2'>Name</th>
                <th className='p-2'>Email</th>
                <th className=' p-2'>Action</th>
              </tr>
            </thead>
            <tbody className=' bg-slate-400'>
              {users.map(user => (
                <tr key={user.id}>
                  <td className=' p-2 text-center'>{user.id}</td>
                  <td className=' p-2 text-center'>{user.name}</td>
                  <td className=' p-2 text-center'>{user.email}</td>
                  <td className='flex gap-3 p-2 justify-center'>
                    <button className='font-bold bg-blue-300 hover:bg-blue-600 hover:cursor-pointer border-0 p-2 rounded-md text-white'
                      onClick={() => handleDetailsClick(user)}>
                      Details
                    </button>
                    <button onClick={() => handleEditUser(user)} className=' bg-green-400 hover:bg-green-600 hover:cursor-pointer border-0 p-2 rounded-md'>
                      <Link className=' font-bold no-underline text-white' href={`/update?id=${user.id}`}>
                        Edit
                      </Link>
                    </button>
                    <button
                      className='font-bold bg-red-400 hover:bg-red-600 hover:cursor-pointer border-0 p-2 rounded-md text-white'
                      onClick={() => { setDeleteModalOpen(true); setUserToDelete(user.id); }}>
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setNewUserModal(true)} className='font-bold bg-red-400 hover:bg-red-600 hover:cursor-pointer border-0 p-2 rounded-md text-white  w-32 m-auto'>
            Add Item
          </button>
        </div>

        {/* Modal per aggiunta Item */}

        {newUserModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-75  ">
            <div className="p-6 rounded shadow-lg modal text-white">
              <div>
                <h3>
                  Add a new User
                </h3>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                />

                <label htmlFor="">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                />
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2 hover:cursor-pointer"
                    onClick={() => setNewUserModal(false)}>Cancel</button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded hover:cursor-pointer"
                    onClick={() => handleAddUser()}>
                    Add User
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Modal per Eliminazione */}

        {deleteModalOpen && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className=" text-white p-6 rounded shadow-lg modal">
              <h3 className='text-center'>Warning!!!</h3>
              <p className="mb-4">You want to delete this item?</p>
              <div className="flex justify-center">
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2 font-bold hover:cursor-pointer" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-bold hover:cursor-pointer" onClick={handleDeleteItem}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal per i dettagli
        {detailsModalOpen && selectedItem && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="p-6 rounded shadow-lg modal text-white">
              <h3>Item Details</h3>
              <p><strong>ID:</strong> {selectedItem.id}</p>
              <p><strong>Name:</strong> {selectedItem.name}</p>
              <p><strong>Description:</strong> Lorem ipsum </p>
              <div className="flex justify-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2 hover:cursor-pointer font-bold"
                  onClick={() => setDetailsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )} */}

        {/* <h2>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={e => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button> */}
      </div >

      {/* Modal per confermare l'eliminazione */}

    </>
  );
}
{/* <button onClick={() => handleEditUser(user)}>
                <Link className=' no-underline text-black' href={`/update-${user.id}`}>
                  Edit
                </Link>
              </button>
              <button onClick={() => { setUserToDelete(user.id); setModalOpen(true); }}>Delete</button> */}