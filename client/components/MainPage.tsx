import React, {useState} from "react";
import {AddBoardModal} from "./AddBoardModal";
import {axiosJWT} from "../utils/axios/axios";
import {URL} from "../constants/url";
import {MainPageProps} from "../pages";
import Link from "next/link";
export const MainPage: React.FC<MainPageProps> = ({boards}) => {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <div className="container row">
                <h3>Мои доски</h3>
            <button className="btn" onClick={() => setIsClicked(true)}>Добавить доску</button>
            <AddBoardModal isClicked={isClicked} setIsClicked={setIsClicked} />
            <div className="cards">
                {
                   boards.length ?
                       boards.map(item => {
                           return (
                               <div key={item.id}>
                                   <div className="card horizontal">
                                       <div className="card-stacked">
                                           <div className="card-content">
                                               <p>{item.name}</p>
                                           </div>
                                           <div className="card-action">
                                               <Link href={`/board/${item.id}`}>Перейти к доске</Link>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           )
                       })
                       : <h5>Досок нет</h5>
                }
            </div>
        </div>
    )
}