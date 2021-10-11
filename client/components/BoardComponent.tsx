import React, {useState} from "react";
import {BoardProps} from "../pages/board/[id]";
import {useRouter} from "next/router";
import {axiosJWT} from "../utils/axios/axios";
import {URL} from "../constants/url";
import {Navbar} from "./Navbar";
import { Loader } from "./Loader";
export const BoardComponent: React.FC<BoardProps> = ({board}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const id = router.query.id;
    const [text, setText] = useState("");
    const createTodo = () => {
        try {
            setIsLoading(true);
            axiosJWT.post(`${URL}/board/create-todo`, {boardId: id, text}, {withCredentials: true}).then(() => {
                router.replace(`/board/${id}`);
                setIsLoading(false);
            })
        } catch (e) {
            console.log(e);
        }
    }
    const completeTodo = async (todoId: number) => {
        setIsLoading(true)
        await axiosJWT.patch(`${URL}/board/complete-todo/${todoId}`, {boardId: id}, {withCredentials: true}).then(() => {
            router.replace(`/board/${id}`);
            setIsLoading(false);
        })
    }
    const importantTodo = async (todoId: number) => {
        setIsLoading(true);
        await axiosJWT.patch(`${URL}/board/important-todo/${todoId}`, {boardId: id}, {withCredentials: true}).then(() => {
            router.replace(`/board/${id}`);
            setIsLoading(false);
        })
    }
    const removeTodo = async (todoId: number) => {
        setIsLoading(true);
        await axiosJWT.delete(`${URL}/board/remove-todo`, {withCredentials: true, params: {boardId: id, todoId}}).then(() => {
            router.replace(`/board/${id}`);
            setIsLoading(false);
        })
    }
    return (
       <>
           <Navbar isLogin={true} />
        <div className='container'>
                       <h3>Доска {board && board.name}</h3>
                       <div className="main-page">
                           <h4>Добавить задачу:</h4>
                           <form className='form form-login' onSubmit={e => e.preventDefault()}>
                               <div className="row">
                                   <div className="input-field col s12">
                                       <input
                                           type="text"
                                           placeholder=''
                                           name="input"
                                           className='validate'
                                           onChange={e => setText(e.target.value)}
                                           value={text}
                                       />
                                       {/*<label htmlFor="input">Задача</label>*/}
                                   </div>
                               </div>
                               <div className="row">
                                   <button className='waves-effect waves-light btn blue' onClick={() => createTodo()}>
                                       Добавить
                                   </button>
                               </div>
                           </form>
                           {
                               !isLoading ?
                                   <>
                                   <h3>Активные задачи</h3>
                                   <div className="todos">
                                       {
                                           board && board.todos ? board.todos.map((todo, index) => {
                                               let cls = ['col todos-text'];

                                               if (todo.completed) {
                                                   cls.push('completed');
                                               }
                                               if (todo.important) {
                                                   cls.push('important');
                                               }


                                               return (
                                                   <div className="row flex todos-item" key={index}>
                                                       <div className="col todos-num">{index + 1}</div>
                                                       <div className={cls.join(' ')}>{todo.text}</div>
                                                       <div className="col todos-buttons">
                                                           <i className="material-icons blue-text" onClick={() => completeTodo(todo.id)}>check</i>
                                                           <i className="material-icons orange-text" onClick={() => importantTodo(todo.id)}>warning</i>
                                                           <i className="material-icons red-text" onClick={() => removeTodo(todo.id)}>delete</i>
                                                       </div>
                                                   </div>
                                               )
                                           }) : <h3>Задач нет</h3>
                                       }
                                   </div>
                                   </>
                               : <Loader/>
                           }
                       </div>
                   </div>
           </>
    )
}