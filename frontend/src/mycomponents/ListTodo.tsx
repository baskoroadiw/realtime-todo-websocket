import { socket } from "../Socket"

interface Props {
    idTodo: number
    todo: string
}

function ListTodo(props: Props) {
    function handleDelete() {
        socket.emit("deleteTodo", props.idTodo, () => {
            socket.emit("getTodo")
        })
    }

    return (
        <div className="flex w-full p-2 bg-slate-50 items-center rounded-lg shadow-lg justify-between">
            <div>{props.todo}</div>
            <div
                className="cursor-pointer bg-slate-200 p-1 rounded-full w-9 h-9 text-center shadow-lg text-gray-600 z-30 hover:bg-slate-400 hover:text-gray-200"
                onClick={handleDelete}
            >
                X
            </div>
        </div>
    )
}

export default ListTodo
