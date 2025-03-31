
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {permissionService} from "../../services/permissionService";
import Swal from "sweetalert2";

import { Permission } from '../../models/Permission';
import PermissionFormValidator from '../../components/Permissions/PermissionsFormValidtor';
import Breadcrumb from "../../components/Breadcrumb";

const UpdatePermissionPage = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    // Para "redirigir" a rutas (Navegar por la URL)
    const navigate = useNavigate();
    const [permission, setPermission] = useState<Permission | null>(null);

    // Cargar datos del usuario después del montaje
    useEffect(() => {
        console.log("Id->"+id)
        const fetchPermission = async () => {
            if (!id) return; // Evitar errores si el ID no está disponible
            const permissionData = await permissionService.getPermissionById(parseInt(id));
            setPermission(permissionData);
        };

        fetchPermission();
    }, [id]);

    const handleUpdatePermission = async (thePermission: Permission) => {
        try {
            const updatedPermission = await permissionService.updatePermission(thePermission.id || 0, thePermission);
            if (updatedPermission) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/permissions/list"); // Redirección en React Router
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!permission) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Permiso" />
            <PermissionFormValidator
                handleUpdate={handleUpdatePermission}
                mode={2} // 2 significa actualización
                permission={permission}
            />
        </>
    );
};

export default UpdatePermissionPage;