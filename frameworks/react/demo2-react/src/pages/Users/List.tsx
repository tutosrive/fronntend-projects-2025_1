import { Eye, Edit, Trash2, BadgePlus } from "lucide-react";
import { useState, useEffect } from "react";

import { userService } from "../../services/userService";
import Swal from "sweetalert2";
import { User } from "../../models/User";
import { useParams, useNavigate } from "react-router-dom";

const ListUsers = () => {

    // Para "redirigir" a rutas (Navegar por la URL)
    const navigate = useNavigate();

    // Estado para almacenar los datos del JSON
    const [data, setData] = useState<User[]>([]);

    // 🔹 Llamar `fetchData` cuando el componente se monta
    useEffect(() => {
        fetchData();
    }, []);

    // 🔹 Obtiene los datos de los usuarios
    const fetchData = async () => {
        const users = await  userService.getUsers();
        setData(users);
    };



    // Funciones para manejar las acciones
        const handleView = async(id: number) => {
            console.log(`Ver registro con ID: ${id}`);
            const user: User | null = await userService.getUserById(id)
            
            let html_content = ''
            // Recorrer llaves del objeto User
            for (const key in user){
                // Saltarse estas propiedades
                if (["id", "token", "is_active", "password"].find(k => k === key)) continue
                // Agregar cada atributo al html_content
                html_content +=`
                <strong>${key}</strong>: ${user[key]}<br>
                `
            }
            
            Swal.fire({
                title: "Visualización",
                html: html_content,
                icon: "info",
                showCloseButton: true,
                closeButtonHtml: "X",
                showCancelButton: true,
                cancelButtonColor: "blue",
                cancelButtonText: "Cerrar",
            })
        };
    
        const handleEdit = (id: number) => {
            console.log(`Editar registro con ID: ${id}`);
            navigate(`/users/update/${id}`)
        };

    const handleDelete = async (id: number) => {
        console.log(`Intentando eliminar usuario con ID: ${id}`);
        Swal.fire({
            title: "Eliminación",
            text: "Está seguro de querer eliminar el registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await  userService.deleteUser(id);
                if (success) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "El registro se ha eliminado",
                        icon: "success"
                    });
                }
                // 🔹 Vuelve a obtener los usuarios después de eliminar uno
                fetchData();
            }
        });
    };

    const handleCreate = () => {
        console.log("Crear nuevo usuario");
        navigate("/users/create")
    }

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                {/* <!-- Input Fields --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Listado
                        </h3>
                        <button 
                        onClick={()=> handleCreate()}
                        className=" text-blue-600 dark:text-blue-500 ml-auto"><BadgePlus size={30}/></button>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Nombre</th>
                                        <th scope="col" className="px-6 py-3">Correo</th>
                                        <th scope="col" className="px-6 py-3">Edad</th>
                                        <th scope="col" className="px-6 py-3">Ciudad</th>
                                        <th scope="col" className="px-6 py-3">Teléfono</th>
                                        <th scope="col" className="px-6 py-3">Activo</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 even:dark:text-white text-black border-b dark:border-gray-700 border-gray-200">
                                            <td className="px-6 py-4 text-gray-900">{item.name}</td>
                                            <td className="px-6 py-4">{item.email}</td>
                                            <td className="px-6 py-4">{item.age}</td>
                                            <td className="px-6 py-4">{item.city}</td>
                                            <td className="px-6 py-4">{item.phone}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {item.is_active ? "Activo" : "Inactivo"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button
                                                    onClick={() => handleView(item.id ? item.id : 0)}
                                                    className="text-blue-600 dark:text-blue-500"
                                                >
                                                    <Eye size={20} /> {/* Ícono de ver */}
                                                </button>
                                                <button
                                                    onClick={() => item.id !== undefined && handleEdit(item.id)}
                                                    className="text-yellow-600 dark:text-yellow-500"
                                                >
                                                    <Edit size={20} /> {/* Ícono de editar */}
                                                </button>
                                                <button
                                                    onClick={() => item.id !== undefined && handleDelete(item.id)}
                                                    className="text-red-600 dark:text-red-500"
                                                >
                                                    <Trash2 size={20} /> {/* Ícono de eliminar */}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ListUsers;
