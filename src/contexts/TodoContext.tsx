import { createContext,useEffect,ReactNode,useContext,useState} from "react"
import { api } from "../services"
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";

const TodoListContext=createContext<ITodoContext>({} as ITodoContext)
export const useTodo=()=> useContext(TodoListContext)

interface ITodoContext{
    todoList:ITodo[]
    completeTask:(id:number)=>void 
    deleteTask:(id:number)=>void
    createTask:(data:formData)=>void
    editTask:(data:formData)=>void
    getOneTask:(id:number)=>void
}

interface IChildren{
    children:ReactNode
}

interface ITodo{
    id:number
    description:string
    completed:boolean
}
interface formData{
    description:string
}

const TodoProvider=({children}:IChildren)=>{
    
    const [todoList,setTodoList]=useState<ITodo[]>([])
    const [getOne,setGetOne]=useState<number>()

    useEffect(()=>{
        api.get("todo/").then((response)=>{
            setTodoList(response.data)
        }).catch((err)=>{
            console.log(err.response)
        })


    },[todoList])


    const createTask=async(data:formData)=>{
        await
        api.post("todo/",data).then((_)=>{
            toast.success("Tarefa cadastrada!", {
                position: toast.POSITION.TOP_CENTER
              });
        }).catch((err)=>{
            console.log(err)
        })
    }

    const editTask=async(data:formData)=>{
        await
        api.patch(`todo/${getOne}/`,data).then((response)=>{
            toast.success("Tarefa atualizada!", {
                position: toast.POSITION.TOP_CENTER
            });        
    }).catch((err)=>console.log(err))
    }

    const completeTask=async(id:number)=>{
        await
        api.put((`todo/${id}/`)).then((_)=>{
            toast.success("Tarefa concluída!", {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }


    const deleteTask= async(id:number)=>{
        await
        api.delete(`todo/${id}/`).then((_)=>{
            toast.success("Tarefa deletada! ", {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    const getOneTask = async(id:number)=>{

        await
        api.get(`todo/${id}/`).then((response)=>{
            setGetOne(response.data.id)
        })
        .catch((err)=>
        console.log(err)
        )
    }

return (
    <TodoListContext.Provider value={{todoList,completeTask,deleteTask,createTask,editTask,getOneTask}}>
        {children}
    </TodoListContext.Provider>
)


}



export default TodoProvider