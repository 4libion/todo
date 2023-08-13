import { TodoItem } from "@/components/TodoItem";
import { redirect } from "next/navigation";
import Link from "next/link";

async function fetchTodos() {
  return await fetch("http://127.0.0.1:1337/api/todos", { cache: "no-store" });
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  try {
    await fetch(`http://127.0.0.1:1337/api/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: {
                complete: complete
            }
        }),
        cache: "no-store"
    });
  } catch (error) {
      console.error("Error", error);
  }
}

async function deleteTodos(id: string) {
  "use server";

  try {
      await fetch(`http://127.0.0.1:1337/api/todos/${id}`, {
          method: "DELETE"
      });
  } catch (error) {
      console.error(error);
  } finally {
    redirect("/");
  }
}

export default async function Home() {
  const data = await fetchTodos();
  const todos = await data.json();
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todo</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded
          hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
      <ul className="pl-4">
        {todos.data.map((todo: any) => (
          <TodoItem key={todo.id} id={todo.id} {...todo.attributes} toggleTodo={toggleTodo} deleteTodos={deleteTodos}/>
        ))}
      </ul>
    </>
  )
}
