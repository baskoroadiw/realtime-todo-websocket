import './App.css'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './components/ui/form'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import ListTodo from './mycomponents/ListTodo'

function App() {

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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    form.resetField('activity')
    console.log(values.activity)
  }

  return (
    <>
      <div className="container flex justify-center mt-10">
        <div className='w-6/12'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input Todo</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your todo here" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <center><Button type="submit">Add</Button></center>
            </form>
          </Form>

          <br />

          <h2>List Todo: </h2>

          <div className='w-full flex flex-wrap gap-y-3 py-5 mt-3'>
            <ListTodo todo={'Lari pagi'} />
          </div>
        </div>
      </div >

    </>
  )
}

export default App
