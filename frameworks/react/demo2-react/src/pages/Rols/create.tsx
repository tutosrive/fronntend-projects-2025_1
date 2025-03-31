import React, { useState } from 'react'; // Asegúrate de importar useState
import { Role } from '../../models/Role';
import RoleFormValidator from '../../components/Roles/RolesFormValidtor'; 

import Swal from 'sweetalert2';
import { roleService } from "../../services/roleService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();
    // Lógica de creación
    const handleCreateRole = async (role: Role) => {
        try {
            const createdRole = await roleService.createRole(role);
            if (createdRole) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                })
                console.log("Rol creado con éxito:", createdRole);
                // Navegar a la lista de roles (Para ver el nuevo rol creado)
                navigate("/roles/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear el registro",
                icon: "error",
                timer: 3000
            })
        }
    };
    return (
        <div>
            {/* Formulario para crear un nuevo rol */}
            <h2>Create Role</h2>
                <Breadcrumb pageName="Crear Rol" />
                <RoleFormValidator
                    handleCreate={handleCreateRole}
                    mode={1} // 1 significa creación
                />
        </div>
    );
};

export default App;
