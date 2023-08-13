"use client"

import Link from "next/link"

type TodoItemProps = {
    id: string,
    description: string,
    complete: boolean,
    toggleTodo: (id: string, complete: boolean) => void,
    deleteTodos: (id: string) => void
}

export function TodoItem({ id, description, complete, toggleTodo, deleteTodos }: TodoItemProps) {
    return <li className="flex gap-1 items-center py-1">
        <input
            id={id}
            type="checkbox"
            className="cursor-pointer peer"
            defaultChecked={complete}
            onChange={e => toggleTodo(id, e.target.checked)}
        />
        <label htmlFor={id} className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500">
            {description}
        </label>
        <Link
          className="border border-slate-300 text-slate-300 px-1 rounded
          hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href={{
            pathname: "/edit",
            query: {
                id: id
            }
          }}
        >
          Edit
        </Link>
        <Link
          className="border border-slate-300 text-slate-300 px-1 rounded
          hover:bg-red-700 focus-within:bg-red-700 outline-none bg-red-600"
          onClick={() => deleteTodos(id)}
          href={"/"}
        >
          Delete
        </Link>
    </li>
}