import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

import { permissionService } from "../../services/permissionService";
import Swal from "sweetalert2";
import { Permission } from "../../models/Permission";


const ListPermissions = () => {


    // Estado para almacenar los datos del JSON
    const [data, setData] = useState<Permission[]>([]);

    // 🔹 Llamar `fetchData` cuando el componente se monta
    useEffect(() => {
        fetchData();
    }, []);

    // 🔹 Obtiene los datos de los usuarios
    const fetchData = async () => {
        const permissions = await  permissionService.getPermissions();
        setData(permissions);
    };



    // Funciones para manejar las acciones
    const handleView = async(id: number) => {
        console.log(`Ver registro con ID: ${id}`);
        const permission: Permission | null = await permissionService.getPermissionById(id)
        const permission_name: string | undefined = permission ? permission.method : "No encontrado"
        const endpoint: string | undefined = permission ? permission.url : "----"
        const html_content =`
            <strong>Permiso</strong>: ${permission_name}<br>
            <strong>End-Point</strong>: ${endpoint}
        `

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

        Swal.fire({
            title: "Actualización",
            text: "¿Está seguro de querer actualizar el registro?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, actualizar",
            cancelButtonText: "No"
        }).then(async (result) => {
            console.log(result)
        });
    };

    const handleDelete = async (id: number) => {
        console.log(`Intentando eliminar usuario con ID: ${id}`);
        Swal.fire({
            title: "Eliminación",
            text: "¿Está seguro de querer eliminar el registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await  permissionService.deletePermission(id);
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

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                {/* <!-- Input Fields --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Listado
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Nombre</th>
                                        <th scope="col" className="px-6 py-3">Descripción</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                            <td className="px-6 py-4">{item.method}</td>
                                            <td className="px-6 py-4">{item.url}</td>
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

export default ListPermissions;
