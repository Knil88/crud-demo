
import { users } from "./data";

export async function GET() {
    return Response.json(users);
}



export async function POST(request: Request) {
    const user = await request.json();

    // Verifica se user.text esiste prima di utilizzarlo
    if (!user.name) {
        return new Response(JSON.stringify({ error: "Il campo 'text' è richiesto." }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 400, // Bad Request
        });
    }

    const newUser = {
        id: users.length + 1,
        name: user.name,
        email: user.email
    };

    users.push(newUser);

    return new Response(JSON.stringify(newUser), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 201, // Created
    });
}

export async function PUT(request: Request) {
    const data = await request.json();
    const userId = parseInt(data.id);

    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
        return new Response(JSON.stringify({ error: "User not Found" }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 404,//Not Found
        });
    }

    //Verifica se il campo 'name' esiste
    if (!data.name) {
        return new Response(JSON.stringify({ error: "name field is requested" }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 400,//Bad Request
        })
    }

    users[index] = {
        id: userId,
        name: data.name,
        email: data.email || users[index].email//mantieni email esistente
    };
    return new Response(JSON.stringify(users[index]), {
        headers: {
            "Content-Type": "application/json"

        },
        status: 200,//OK
    })
}

export async function DELETE(request: Request) {
    const data = await request.json();
    const userId = parseInt(data.id);

    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
        return new Response(JSON.stringify({ error: "User not found" }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 404 // Not Found
        });
    }

    // Rimuovi l'utente dall'array
    const deletedUser = users.splice(index, 1)[0];

    return new Response(JSON.stringify(deletedUser), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 200 // OK
    });
}
