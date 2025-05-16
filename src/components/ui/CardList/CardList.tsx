import type { FC } from "react"
import type { ITarea } from "../../../types/ITarea"
import { FaTrash, FaPen } from "react-icons/fa";
import useTareas from "../../../hooks/useTareas";
type ICardList = {
    tarea: ITarea,
    handleOpenModal: (tarea:ITarea)=> void,
}

const CardList: FC<ICardList> = ({ tarea, handleOpenModal }) => {
    const {eliminarTarea}= useTareas()

    const eliminarTareaByID = () =>{
        eliminarTarea(tarea.id!)
    }
    const editarTarea = () =>{ 
        handleOpenModal(tarea)
    }

    return (
        <div className="bg-accent text-dark p-4 rounded-lg shadow-md flex justify-between items-start">
            <div>
                <h3 className="text-lg font-bold">{tarea.titulo}</h3>
                <p>{tarea.descripcion}</p>
                <p className="mt-2 text-sm font-medium">Fecha Límite: {tarea.fechaLimite}</p>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={eliminarTareaByID}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                >
                    <FaTrash />
                </button>
                <button
                    onClick={editarTarea}
                    className="bg-primary hover:bg-secondary text-white p-2 rounded"
                >
                    <FaPen />
                </button>
            </div>
        </div>
    )
}

export default CardList