import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default async function Edit({ searchParams }: {
    searchParams: {
        id: string;
    };
}) {
    async function editTodos(data: FormData) {
        "use server"
        
        try {
            const description = data.get("description")?.valueOf();
            if (typeof description !== "string" || description.length === 0) {
                throw new Error("Invalid description");
            }
    
            const response = await fetch(`http://127.0.0.1:1337/api/todos/${searchParams.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: {
                        description: description,
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
    const response1 = await fetch(`http://127.0.0.1:1337/api/todos/${searchParams.id}`, { cache: "no-store" });
    const todo = await response1.json();

    // const [description, setDescription] = useState("");

    // useEffect(() => {
    //     if (todo)
    // }, [todo]);

    // const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setDescription(event.target.value);
    // };

    return <>
        <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl">New</h1>
        </header>
        <form action={editTodos} className="flex gap-2 flex-col">
            <input
                type="text"
                name="description"
                className="border border-slate-300 bg-transparent rounded px-2 py-1
                outline-none focus-within:border-slate-100"
                defaultValue={todo.data.attributes.description}
                // onChange={handleDescriptionChange}
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
                    Change
                </button>
            </div>
        </form>
    </>
}
