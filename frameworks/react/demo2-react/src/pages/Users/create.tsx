import React, { useState } from 'react'; // Asegúrate de importar useState
import { User } from '../../models/User';
import UserFormValidator from '../../components/Users/UserFormValidator'; 

import Swal from 'sweetalert2';
import { userService } from "../../services/userService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    // Estado para almacenar el usuario a editar

    // Lógica de creación
    const handleCreateUser = async (user: User) => {

        try {
            const createdUser = await userService.createUser(user);
            if (createdUser) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                })
                console.log("Usuario creado con éxito:", createdUser);
                // Navegar a la lista de usuarios (Para ver el nuevo usuario creado)
                navigate("/users/list");
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
            {/* Formulario para crear un nuevo usuario */}
            <h2>Create User</h2>
                <Breadcrumb pageName="Crear Usuario" />
                <UserFormValidator
                    handleCreate={handleCreateUser}
                    mode={1} // 1 significa creación
                />
        </div>
    );
};

export default App;
