import {
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from 'react'
import { tareaStore } from '../../../store/tareaStore'
import type { ITarea } from '../../../types/ITarea'
import useTareas from '../../../hooks/useTareas'

type Props = {
  handleCloseModal: VoidFunction
}
const initalState: ITarea = {
  titulo: '',
  descripcion: ' ',
  fechaLimite: ' ',
}

const Modal: FC<Props> = ({ handleCloseModal }) => {
  const tareaActiva = tareaStore(state => state.tareaActiva)
  const setTareaActiva = tareaStore(state => state.setTareaActiva)
  const [formValues, setFormValues] = useState<ITarea>(initalState)

  const { createTarea, putTarea } = useTareas()

  useEffect(() => {
    if (tareaActiva) {
      setFormValues(tareaActiva)
    } else {
      setFormValues(initalState)
    }
  }, [tareaActiva])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormValues(prev => ({ ...prev, [`${name}`]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (tareaActiva) {
      putTarea(formValues)
    } else {
      createTarea({ ...formValues, id: new Date().toDateString() })
    }

    handleCloseModal()
    setTareaActiva(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-background text-dark p-6 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-end">
          <button
            onClick={handleCloseModal}
            className="text-dark hover:text-primary text-xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-primary">
            {tareaActiva ? 'Editar tarea' : 'Crear Tarea'}
          </h3>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
              onChange={handleChange}
              placeholder="Título"
              type="text"
              required
              name="titulo"
              value={formValues.titulo}
            />
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
              required
              name="descripcion"
              onChange={handleChange}
              placeholder="Descripción"
              value={formValues.descripcion}
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
              type="date"
              required
              name="fechaLimite"
              onChange={handleChange}
              value={formValues.fechaLimite}
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-accent text-dark px-4 py-2 rounded-lg hover:bg-primary transition"
            >
              {tareaActiva ? 'Guardar Cambios' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
