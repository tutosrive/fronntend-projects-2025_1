[33mcommit e29960219d3ed2bcd6f4ea7294efaafe7a3046b8[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: tutosrive <tutosrivegamer@gmail.com>
Date:   Mon Mar 17 20:25:02 2025 -0500

    Update 'demo2-react', add a list users function and show in frontend

[1mdiff --git a/API/backend-API/naval-battle/app.py b/API/backend-API/naval-battle/app.py[m
[1mindex b637652..ee7b5e0 100644[m
[1m--- a/API/backend-API/naval-battle/app.py[m
[1m+++ b/API/backend-API/naval-battle/app.py[m
[36m@@ -26,6 +26,10 @@[m [mdef save_scores(scores):[m
     with open(DB_FILE, "w") as file:[m
         json.dump(scores, file, indent=4)[m
 [m
[32m+[m[32m@app.route("/", methods=["GET"])[m
[32m+[m[32mdef home():[m
[32m+[m[32m    return jsonify({"status": "OK", "data": "Bienvenido al backend de Naval Battle AI"}), 200[m
[32m+[m
 [m
 @app.route("/score-recorder", methods=["POST"])[m
 def score_recorder():[m
[1mdiff --git a/API/backend-API/naval-battle/database/scores.json b/API/backend-API/naval-battle/database/scores.json[m
[1mindex b4e4d79..8f71edd 100644[m
[1m--- a/API/backend-API/naval-battle/database/scores.json[m
[1m+++ b/API/backend-API/naval-battle/database/scores.json[m
[36m@@ -6,5 +6,50 @@[m
     "srm": {[m
         "score": 13,[m
         "country_code": "co"[m
[32m+[m[32m    },[m
[32m+[m[32m    "srm2": {[m
[32m+[m[32m        "score": 34,[m
[32m+[m[32m        "country_code": "co"[m
[32m+[m[32m    },[m
[32m+[m[32m    "srm3": {[m
[32m+[m[32m        "score": 67,[m
[32m+[m[32m        "country_code": "co"[m
[32m+[m[32m    },[m
[32m+[m[32m    "srm4": {[m
[32m+[m[32m        "score": 3,[m
[32m+[m[32m        "country_code": "co"[m
[32m+[m[32m    },[m
[32m+[m[32m    "srm5": {[m
[32m+[m[32m        "score": 3,[m
[32m+[m[32m        "country_code": "co"[m
[32m+[m[32m    },[m
[32m+[m[32m    "srm6": {[m
[32m+[m[32m        "score": 3,[m
[32m+[m[32m        "country_code": "co"[m
[32m+[m[32m    },[m
[32m+[m[32m    "srm23wew4": {[m
[32m+[m[32m        "score": 3,[m
[32m+[m[32m        "country_code": "co"[m
[32m+[m[32m    },[m
[32m+[m[32m    "srmwedwe4": {[m
[32m+[m[32m        "score": 3,[m
[32m+[m[32m        "country_code": "co"[m
[32m+[m[32m    },[m
[32m+[m[32m    "srwerwerwm4": {[m
[32m+[m[32m        "score": 3,[m
[32m+[m[32m        "country_code": "co"[m
[32m+[m[32m    },[m
[32m+[m[32m    "srm4sdsfsd": {[m
[32m+[m[32m        "score": 3,[m
[32m+[m[32m        "country_code": "co"[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    "srmdsdsd4": {[m
[32m+[m[32m        "score": 3,[m
[32m+[m[32m        "country_code": "co"[m
[32m+[m[32m    },[m
[32m+[m[32m    "srfefrferm4": {[m
[32m+[m[32m        "score": 3,[m
[32m+[m[32m        "country_code": "co"[m
     }[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m}[m
[1mdiff --git a/frameworks/react/demo2-react/package-lock.json b/frameworks/react/demo2-react/package-lock.json[m
[1mindex bd0daeb..9e6d0ad 100644[m
[1m--- a/frameworks/react/demo2-react/package-lock.json[m
[1m+++ b/frameworks/react/demo2-react/package-lock.json[m
[36m@@ -2320,6 +2320,7 @@[m
       "version": "0.477.0",[m
       "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.477.0.tgz",[m
       "integrity": "sha512-yCf7aYxerFZAbd8jHJxjwe1j7jEMPptjnaOqdYeirFnEy85cNR3/L+o0I875CYFYya+eEVzZSbNuRk8BZPDpVw==",[m
[32m+[m[32m      "license": "ISC",[m
       "peerDependencies": {[m
         "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"[m
       }[m
[36m@@ -3258,6 +3259,7 @@[m
       "version": "11.17.2",[m
       "resolved": "https://registry.npmjs.org/sweetalert2/-/sweetalert2-11.17.2.tgz",[m
       "integrity": "sha512-HKxDr1IyV3Lxr3W6sb61qm/p2epFIEdr5EKwteRFHnIg6f8nHFl2kX++DBVz16Mac+fFiU3hMpjq1L6yE2Ge5w==",[m
[32m+[m[32m      "license": "MIT",[m
       "funding": {[m
         "type": "individual",[m
         "url": "https://github.com/sponsors/limonte"[m
[1mdiff --git a/frameworks/react/demo2-react/src/pages/Users/List.tsx b/frameworks/react/demo2-react/src/pages/Users/List.tsx[m
[1mnew file mode 100644[m
[1mindex 0000000..a0c7472[m
[1m--- /dev/null[m
[1m+++ b/frameworks/react/demo2-react/src/pages/Users/List.tsx[m
[36m@@ -0,0 +1,137 @@[m
[32m+[m[32mimport { Eye, Edit, Trash2 } from "lucide-react";[m
[32m+[m[32mimport { useState, useEffect } from "react";[m
[32m+[m
[32m+[m[32mimport { userService } from "../../services/userService";[m
[32m+[m[32mimport Swal from "sweetalert2";[m
[32m+[m[32mimport { User } from "../../models/User";[m
[32m+[m
[32m+[m
[32m+[m[32mconst ListUsers = () => {[m
[32m+[m
[32m+[m
[32m+[m[32m    // Estado para almacenar los datos del JSON[m
[32m+[m[32m    const [data, setData] = useState<User[]>([]);[m
[32m+[m
[32m+[m[32m    // 🔹 Llamar `fetchData` cuando el componente se monta[m
[32m+[m[32m    useEffect(() => {[m
[32m+[m[32m        fetchData();[m
[32m+[m[32m    }, []);[m
[32m+[m
[32m+[m[32m    // 🔹 Obtiene los datos de los usuarios[m
[32m+[m[32m    const fetchData = async () => {[m
[32m+[m[32m        const users = await  userService.getUsers();[m
[32m+[m[32m        setData(users);[m
[32m+[m[32m    };[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[32m    // Funciones para manejar las acciones[m
[32m+[m[32m    const handleView = (id: number) => {[m
[32m+[m[32m        console.log(`Ver registro con ID: ${id}`);[m
[32m+[m
[32m+[m[32m    };[m
[32m+[m
[32m+[m[32m    const handleEdit = (id: number) => {[m
[32m+[m[32m        console.log(`Editar registro con ID: ${id}`);[m
[32m+[m
[32m+[m[32m        // Lógica para editar el registro[m
[32m+[m[32m    };[m
[32m+[m
[32m+[m[32m    const handleDelete = async (id: number) => {[m
[32m+[m[32m        console.log(`Intentando eliminar usuario con ID: ${id}`);[m
[32m+[m[32m        Swal.fire({[m
[32m+[m[32m            title: "Eliminación",[m
[32m+[m[32m            text: "Está seguro de querer eliminar el registro?",[m
[32m+[m[32m            icon: "warning",[m
[32m+[m[32m            showCancelButton: true,[m
[32m+[m[32m            confirmButtonColor: "#3085d6",[m
[32m+[m[32m            cancelButtonColor: "#d33",[m
[32m+[m[32m            confirmButtonText: "Si, eliminar",[m
[32m+[m[32m            cancelButtonText: "No"[m
[32m+[m[32m        }).then(async (result) => {[m
[32m+[m[32m            if (result.isConfirmed) {[m
[32m+[m[32m                const success = await  userService.deleteUser(id);[m
[32m+[m[32m                if (success) {[m
[32m+[m[32m                    Swal.fire({[m
[32m+[m[32m                        title: "Eliminado",[m
[32m+[m[32m                        text: "El registro se ha eliminado",[m
[32m+[m[32m                        icon: "success"[m
[32m+[m[32m                    });[m
[32m+[m[32m                }[m
[32m+[m[32m                // 🔹 Vuelve a obtener los usuarios después de eliminar uno[m
[32m+[m[32m                fetchData();[m
[32m+[m[32m            }[m
[32m+[m[32m        });[m
[32m+[m[32m    };[m
[32m+[m
[32m+[m[32m    return ([m
[32m+[m[32m        <div className="grid grid-cols-1 gap-9">[m
[32m+[m[32m            <div className="flex flex-col gap-9">[m
[32m+[m[32m                {/* <!-- Input Fields --> */}[m
[32m+[m[32m                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">[m
[32m+[m[32m                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">[m
[32m+[m[32m                        <h3 className="font-medium text-black dark:text-white">[m
[32m+[m[32m                            Listado[m
[32m+[m[32m                        </h3>[m
[32m+[m[32m                    </div>[m
[32m+[m[32m                    <div className="flex flex-col gap-5.5 p-6.5">[m
[32m+[m[32m                        <div className="overflow-x-auto">[m
[32m+[m[32m                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">[m
[32m+[m[32m                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">[m
[32m+[m[32m                                    <tr>[m
[32m+[m[32m                                        <th scope="col" className="px-6 py-3">Nombre</th>[m
[32m+[m[32m                                        <th scope="col" className="px-6 py-3">Correo</th>[m
[32m+[m[32m                                        <th scope="col" className="px-6 py-3">Edad</th>[m
[32m+[m[32m                                        <th scope="col" className="px-6 py-3">Ciudad</th>[m
[32m+[m[32m                                        <th scope="col" className="px-6 py-3">Teléfono</th>[m
[32m+[m[32m                                        <th scope="col" className="px-6 py-3">Activo</th>[m
[32m+[m[32m                                        <th scope="col" className="px-6 py-3">Acciones</th>[m
[32m+[m[32m                                    </tr>[m
[32m+[m[32m                                </thead>[m
[32m+[m[32m                                <tbody>[m
[32m+[m[32m                                    {data.map((item) => ([m
[32m+[m[32m                                        <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">[m
[32m+[m[32m                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>[m
[32m+[m[32m                                            <td className="px-6 py-4">{item.email}</td>[m
[32m+[m[32m                                            <td className="px-6 py-4">{item.age}</td>[m
[32m+[m[32m                                            <td className="px-6 py-4">{item.city}</td>[m
[32m+[m[32m                                            <td className="px-6 py-4">{item.phone}</td>[m
[32m+[m[32m                                            <td className="px-6 py-4">[m
[32m+[m[32m                                                <span className={`px-2 py-1 rounded-full ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>[m
[32m+[m[32m                                                    {item.is_active ? "Activo" : "Inactivo"}[m
[32m+[m[32m                                                </span>[m
[32m+[m[32m                                            </td>[m
[32m+[m[32m                                            <td className="px-6 py-4 space-x-2">[m
[32m+[m[32m                                                <button[m
[32m+[m[32m                                                    onClick={() => handleView(item.id ? item.id : 0)}[m
[32m+[m[32m                                                    className="text-blue-600 dark:text-blue-500"[m
[32m+[m[32m                                                >[m
[32m+[m[32m                                                    <Eye size={20} /> {/* Ícono de ver */}[m
[32m+[m[32m                                                </button>[m
[32m+[m[32m                                                <button[m
[32m+[m[32m                                                    onClick={() => item.id !== undefined && handleEdit(item.id)}[m
[32m+[m[32m                                                    className="text-yellow-600 dark:text-yellow-500"[m
[32m+[m[32m                                                >[m
[32m+[m[32m                                                    <Edit size={20} /> {/* Ícono de editar */}[m
[32m+[m[32m                                                </button>[m
[32m+[m[32m                                                <button[m
[32m+[m[32m                                                    onClick={() => item.id !== undefined && handleDelete(item.id)}[m
[32m+[m[32m                                                    className="text-red-600 dark:text-red-500"[m
[32m+[m[32m                                                >[m
[32m+[m[32m                                                    <Trash2 size={20} /> {/* Ícono de eliminar */}[m
[32m+[m[32m                                                </button>[m
[32m+[m[32m                                            </td>[m
[32m+[m[32m                                        </tr>[m
[32m+[m[32m                                    ))}[m
[32m+[m[32m                                </tbody>[m
[32m+[m[32m                            </table>[m
[32m+[m[32m                        </div>[m
[32m+[m[32m                    </div>[m
[32m+[m[32m                </div>[m
[32m+[m[32m            </div>[m
[32m+[m[32m        </div>[m
[32m+[m
[32m+[m[32m    );[m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32mexport default ListUsers;[m
[1mdiff --git a/frameworks/react/demo2-react/src/routes/index.ts b/frameworks/react/demo2-react/src/routes/index.ts[m
[1mindex 61dc0d6..44634ca 100644[m
[1m--- a/frameworks/react/demo2-react/src/routes/index.ts[m
[1m+++ b/frameworks/react/demo2-react/src/routes/index.ts[m
[36m@@ -11,6 +11,8 @@[m [mconst Alerts = lazy(() => import('../pages/UiElements/Alerts'));[m
 const Buttons = lazy(() => import('../pages/UiElements/Buttons'));[m
 const Demo= lazy(() => import('../pages/Demo'));[m
 [m
[32m+[m[32mconst ListUsers= lazy(() => import('../pages/Users/List'));[m
[32m+[m
 const coreRoutes = [[m
   {[m
     path: '/demo',[m
[36m@@ -62,6 +64,11 @@[m [mconst coreRoutes = [[m
     title: 'Buttons',[m
     component: Buttons,[m
   },[m
[32m+[m[32m  {[m
[32m+[m[32m    path: "/users/list",[m
[32m+[m[32m    title:"UsersList",[m
[32m+[m[32m    component: ListUsers[m
[32m+[m[32m  }[m
 ];[m
 [m
 const routes = [...coreRoutes];[m
