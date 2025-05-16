import Header from "../ui/Header/Header"
import ListTareas from "../ui/ListTareas/ListTareas"

const TareasScreens = () => {

    return (
        <div className="min-h-screen bg-background text-dark p-4">
         <Header />
         <ListTareas />
        </div>
    )
}

export default TareasScreens