import { useEffect, useState } from 'react'
import { tareaStore } from '../../../store/tareaStore'
import { getAllTareas } from '../../../http/tareas'
import CardList from '../CardList/CardList'
import Modal from '../Modal/Modal'
import type { ITarea } from '../../../types/ITarea'
import useTareas from '../../../hooks/useTareas'

const ListTareas = () => {
  const [openModalTarea, setOpenModalTarea] = useState(false)
  const { getTareas, tareas } = useTareas()
  const setTareaActiva = tareaStore(state => state.setTareaActiva)

  useEffect(() => {
    getTareas()
  }, [])

  const handleOpenModalEdit = (tarea: ITarea) => {
    setTareaActiva(tarea)
    setOpenModalTarea(true)
  }

  const handleCloseModal = () => {
    setOpenModalTarea(false)
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-primary">Tus Tareas</h2>
          <button
            className="bg-secondary hover:bg-primary text-white px-4 py-2 rounded-lg transition"
            onClick={() => {
              setTareaActiva(null)
              setOpenModalTarea(true)
            }}
          >
            Agregar Tarea +
          </button>
        </div>
        <div className="grid gap-4">
          {tareas.length > 0 ? (
            tareas.map(el => (
              <CardList
                key={el.id}
                handleOpenModal={handleOpenModalEdit}
                tarea={el}
              />
            ))
          ) : (
            <div className="text-secondary text-center py-6">
              <h3>Aún no hay tareas</h3>
            </div>
          )}
        </div>
      </div>
      {openModalTarea && <Modal handleCloseModal={handleCloseModal} />}
    </>
  )
}

export default ListTareas
