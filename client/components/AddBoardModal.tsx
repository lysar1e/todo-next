import React, {useEffect, useState} from "react";
import {axiosJWT} from "../utils/axios/axios";
import {URL} from "../constants/url";
import {Loader} from "./Loader";
import {useRouter} from "next/router";
type Props = {
    isClicked: boolean;
    setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AddBoardModal: React.FC<Props> = ({isClicked, setIsClicked}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        document.body.addEventListener("click", function (event) {
            const elem = event.target;
            //@ts-ignore
            if (elem.classList.contains("modalka")) {
                closeModal();
            }
        });
    }, []);
    const closeModal = () => {
        setIsClicked(false);
    }
    const [name, setName] = useState("");
    const createBoard = () => {
        try {
            setIsLoading(true);
            axiosJWT.post(`${URL}/board/create`, {name}, {withCredentials: true}).then(() => {
                setIsLoading(false);
                setIsClicked(false);
                router.replace('/');
            });
        } catch (e) {
            console.warn(e)
            setIsLoading(false);
        }
    }
    return (
        <>
                <div id="myModal" className={isClicked ? "modalka show" : "modalka"}>
                    <div className="modal-content">
                        {isLoading ? <Loader/> :
                            <>
                            <span className="close" onClick={() => closeModal()}>
                          &times;
                        </span>
                            <form onSubmit={e => e.preventDefault()}>
                            <h5>Название доски</h5>
                            <input type="text" placeholder="Название доски..." onChange={e => setName(e.target.value)}/>
                            <button type="submit" className='btn' onClick={() => createBoard()}>Добавить</button>
                            </form>
                            </>
                        }
                    </div>
                </div>
        </>
    )
}