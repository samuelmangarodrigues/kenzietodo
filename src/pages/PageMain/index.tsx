import TodoList from "../../components/TodoList"
import Header from "../../components/Header"
import { useTodo } from "../../contexts/TodoContext"
import { ButtonEdit, ButtonRegisterTask, CointainerButtonInput, ContainerInpList, ContainerInputAndErrorMessage, ContainerMain, ContainerShadowEffect, ErrorMessage, Input} from "./styles"
import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {RiArrowDownSLine} from "react-icons/ri"
import { Modal } from "@mui/material"
import { AlignModal, ContainerModal } from "../../components/TodoList/styles"
import { useState } from "react"
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTaskSchema=yup.object().shape({
    description:yup.string().required("campo obrigatório")
})

interface formData{
    description:string
}

const PageMain=()=>{
    const [open,setOpen]=useState<boolean>(false)
    const {createTask} = useTodo()
    const {todoList,completeTask,deleteTask,getOneTask}=useTodo()
    const {handleSubmit,register,formState:{errors}} = useForm<formData>({
        resolver:yupResolver(CreateTaskSchema)
    })

    const {editTask}=useTodo()
    const newTask=(data:formData)=>{
        createTask(data)
    }
    const editingTask =(data:formData)=>{
        setOpen(false)
        editTask(data)
    }
    return (
        <ContainerMain>
                <Header/>
                <ToastContainer/>
            <ContainerShadowEffect>
                <ContainerInputAndErrorMessage>
                    <ContainerInpList>
                        <CointainerButtonInput>
                            {}
                            <ButtonRegisterTask type="submit" onClick={handleSubmit(newTask)}>
                                <RiArrowDownSLine size={30}/>
                            </ButtonRegisterTask>
                            <Input
                            {...register("description")}
                            placeholder="Registre uma tarefa"
                            />
                           
                        </CointainerButtonInput>
                        {todoList.map((todo)=>{
                            return(
                                <TodoList
                                setOpen={setOpen}
                                getOneTask={()=>getOneTask(todo.id)} 
                                completed={todo.completed}
                                description={todo.description}
                                key={todo.id}
                                handleUpdateClick={ ()=> completeTask(todo.id)}
                                handleDeleteClick={ ()=> deleteTask(todo.id)}
                                id={todo.id}   
                                />
                                )
                            })}
                    </ContainerInpList>
                    <ErrorMessage>
                        {errors.description?.message}
                    </ErrorMessage>
                </ContainerInputAndErrorMessage>
            </ContainerShadowEffect>
            <Modal open={open} onClose={()=>setOpen(false)}>
                <AlignModal>                
                   <ContainerModal>
                        <h1>Edição de tarefas</h1>
                        <Input {...register("description")} placeholder="Edite sua tarefa"></Input>
                        <ButtonEdit type="submit" onClick={handleSubmit(editingTask)}>editar</ButtonEdit>
                    </ContainerModal>
                </AlignModal>
            </Modal>
        </ContainerMain>
    )
}
export default PageMain