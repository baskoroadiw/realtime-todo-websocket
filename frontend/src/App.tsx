import "./App.css"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./components/ui/form"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ListTodo from "./mycomponents/ListTodo"
import { useEffect, useState } from "react"
import { socket } from "./Socket"

function App() {
    const [time, setTime] = useState("fetching time..")
    const [listTodo, setListTodo] = useState<{ id: number; title: string }[]>([
        { id: 0, title: "" },
    ])

    useEffect(() => {
        socket.on("connect", () => console.log(socket.id))
        socket.on("connect_error", () => {
            setTimeout(() => socket.connect(), 5000)
        })

        socket.on("time", (data: string) => setTime(data))

        socket.on("disconnect", () => setTime("server disconnected"))

        // Trigger getTodo at first load
        socket.emit("getTodo")
    }, [])

    const formSchema = z.object({
        activity: z.string().min(5).max(50),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            activity: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        socket.emit("addTodo", values.activity, () => {
            socket.emit("getTodo")
            form.resetField("activity")
        })
    }

    useEffect(() => {
        socket.on("listTodo", (data) => {
            setListTodo(data)
        })
    }, [listTodo])

    return (
        <>
            <div className="container flex justify-center mt-10">
                <div className="w-6/12">
                    <p className="text-center mb-5">{time}</p>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="activity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Input Todo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Type your todo here"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <center>
                                <Button type="submit">Add</Button>
                            </center>
                        </form>
                    </Form>

                    <br />

                    <h2>List Todo: </h2>

                    <div className="w-full flex flex-wrap gap-y-3 py-5 mt-3">
                        {listTodo.map((data, index) => {
                            return <ListTodo key={index} todo={data.title} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
