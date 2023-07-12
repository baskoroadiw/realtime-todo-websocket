interface Props {
    todo: string
}

function ListTodo(props: Props) {
    return (
        <div className='flex w-full p-2 bg-slate-50 items-center rounded-lg shadow-lg justify-between'>
            <div>{props.todo}</div>
            <div className="cursor-pointer bg-slate-200 p-1 rounded-full w-9 h-9 text-center shadow-lg text-gray-600 z-30">X</div>
        </div>
    )
}

export default ListTodo