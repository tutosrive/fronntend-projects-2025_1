import React, { useState, useEffect } from "react";
const Demo: React.FC = () => {
    //Aquí es la lógica
    let [name, setName] = useState("Felipe")
    let colores=["rojo","verde","azul"];
    let flag = true;
    useEffect(() => {
        console.log("Se montó el componente");
        //Llamar a backend solicitando información
    }, []);



    // Función para manejar los cambios en la caja de texto
    const manejarCambio = (event: any) => {
        setName(event.target.value); // Actualizar el estado con el valor del input
    };

    //Es el html
    return <div>
        <h1>Hello World {name}</h1>
        {   flag? 
                <h2>Flag es verdadero</h2>
            :
                <h2>Flag es falso</h2>
        }
        <input
            type="text"
            value={name} // El valor del input está ligado al estado 'texto'
            onChange={manejarCambio} // Se actualiza el estado cada vez que el usuario escribe
        />
        <ul>
            {colores.map((color) => (
                <li>{color}</li>
            ))}
        </ul>
    </div>
        ;
}
export default Demo;