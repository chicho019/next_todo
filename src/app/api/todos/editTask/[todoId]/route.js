import { ObjectId } from "mongodb";
import { todos } from "@/services/mongo";

export async function POST(req, { params }) {
    const { todoId } = params;

    if (!todoId) {
        return new Response(JSON.stringify({ error: "Todo ID is required" }), { status: 400 });
    }

    const { task } = await req.json();

    if (!task) {
        return new Response(JSON.stringify({ error: "Task is required" }), { status: 400 });
    }

    const result = await todos.updateOne(
        { _id: new ObjectId(todoId) },
        { $set: { task: task } }
    );

    if (result.matchedCount === 0) {
        return new Response(JSON.stringify({ error: "Todo not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Todo updated successfully" }), { status: 200 });
}
 