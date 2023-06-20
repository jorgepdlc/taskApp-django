import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/task.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function TaskFormPage() {

    const { 
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm()
    const navigate = useNavigate()
    const param = useParams()

    const onSubmit = handleSubmit(async data => {
        if (param.id) {
            await updateTask(param.id, data)
            toast.success('Task updated', {
                position: 'bottom-right',
                style: {
                    backgroundColor: '#101010',
                    color: '#fff'
                }
            })
        } else {
            await createTask(data)
            toast.success('New task created', {
                position: 'bottom-right',
                style: {
                    backgroundColor: '#101010',
                    color: '#fff'
                }
            })
        }
        navigate('/tasks')
    })

    useEffect(() => {
        async function fetchTask() {
            const res = await getTask(param.id)
            setValue('title', res.data.title)
            setValue('description', res.data.description)
        }
        fetchTask()
    }, [])
    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Title" 
                    {...register("title", {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                />
                {errors.title && <span>This field is required</span>}
                <textarea rows="3" placeholder="Description"
                    {...register("description", {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                ></textarea>
                {errors.description && <span>This field is required</span>}
                <button 
                className='button bg-indigo-500 p-3 rounded-lg block w-full mt-3' 
                type="submit">Save</button>
            </form>
            { param.id && <div className='flex justify-end'>
            <button 
            onClick={async () => {
                const accepted = window.confirm('Are you sure?')
                if (accepted) {
                    await deleteTask(param.id)
                    toast.success('Task deleted', {
                        position: 'bottom-right',
                        style: {
                            backgroundColor: '#101010',
                            color: '#fff'
                        }
                    })
                    navigate('/tasks')
                }
            }}
            className='button bg-red-500 p-3 rounded-lg block w-48 mt-3'
            >Delete</button>
            </div> }
        </div>
    )
}