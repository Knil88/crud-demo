
import { users } from "../data";
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const user = users.find(
        (user) => user.id === parseInt(params.id)
    )
    return Response.json(user);
}