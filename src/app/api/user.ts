// pages/api/users.ts

import { NextApiRequest, NextApiResponse } from 'next';

interface User {
    id: string;
    name: string;
    email: string;
}

let users: User[] = []; // Dati utente di esempio

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            // Operazione READ: Restituisci tutti gli utenti
            res.status(200).json(users);
            break;
        case 'POST':
            // Operazione CREATE: Aggiungi un nuovo utente
            const newUser: User = req.body;
            users.push(newUser);
            res.status(201).json(newUser);
            break;
        case 'PUT':
            // Operazione UPDATE: Aggiorna un utente esistente
            const { id } = req.query;
            const updatedUser: User = req.body;
            users = users.map(user => (user.id === id ? { ...user, ...updatedUser } : user));
            res.status(200).json(updatedUser);
            break;
        case 'DELETE':
            // Operazione DELETE: Elimina un utente esistente
            const userId = req.query.id as string;
            users = users.filter(user => user.id !== userId);
            res.status(200).json({ message: 'User deleted successfully' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
