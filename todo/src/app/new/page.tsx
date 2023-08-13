import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodos(data: FormData) {
    "use server"
    
    try {
        const description = data.get("description")?.valueOf();
        if (typeof description !== "string" || description.length === 0) {
            throw new Error("Invalid description");
        }

        const response = await fetch("http://127.0.0.1:1337/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: {
                    description: description,
                    complete: false
                }
            }),
            cache: "no-store"
        });
    } catch (error) {
        console.error(error);
    } finally {
        redirect("/");
    }
}

export default function Page() {
    return <>
        <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl">New</h1>
        </header>
        <form action={createTodos} className="flex gap-2 flex-col">
            <input
                type="text"
                name="description"
                className="border border-slate-300 bg-transparent rounded px-2 py-1
                outline-none focus-within:border-slate-100"
            />
            <div className="flex gap-1 justify-end">
                <Link
                    href=".."
                    className="border border-slate-300 text-slate-300 px-2 py-1 rounded
                    hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="border border-slate-300 text-slate-300 px-2 py-1 rounded
                    hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
                >
                    Create
                </button>
            </div>
        </form>
    </>
}