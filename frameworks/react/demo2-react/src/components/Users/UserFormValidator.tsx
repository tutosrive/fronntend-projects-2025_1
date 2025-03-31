import { User } from "../../models/User";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


// Definimos la interfaz para los props
interface MyFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: User) => void;
    handleUpdate?: (values: User) => void;
    user?: User | null;
}



const UserFormValidator: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate,user }) => {

    const handleSubmit = (formattedValues: User) => {
        if (mode === 1 && handleCreate) {
            handleCreate(formattedValues);  // Si `handleCreate` está definido, lo llamamos
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(formattedValues);  // Si `handleUpdate` está definido, lo llamamos
        } else {
            console.error('No function provided for the current mode');
        }
    };

    return (
        // Para validar los valores de los datos
        <Formik
        // Cuando se crea "user" = null, cuando es update "user" = User
        // Se dan valores iniciales para reemplazar el "null"
            initialValues={user ? user :{
                name: "",
                email: "",
                age: "",
                city: "",
                phone: "",
                is_active: false,
            }}
            // Yup: npm i yup
            validationSchema={Yup.object({
                name: Yup.string().required("El nombre es obligatorio"),
                email: Yup.string().email("Email inválido").required("El email es obligatorio"),
                age: Yup.number()
                    .typeError("Debe ser un número")
                    .positive("Debe ser un número positivo")
                    .integer("Debe ser un número entero")
                    .required("La edad es obligatoria"),
                city: Yup.string().required("La ciudad es obligatoria"),
                phone: Yup.string()
                    .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
                    .required("El teléfono es obligatorio"),
            })}
            onSubmit={(values) => {
                const formattedValues = { ...values, age: Number(values.age) };  // Formateo adicional si es necesario
                handleSubmit(formattedValues);
            }}
            
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-blue rounded-md shadow-md">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                        <Field type="text" name="name" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                        <Field type="email" name="email" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Edad */}
                    <div>
                        <label htmlFor="age" className="block text-lg font-medium text-gray-700">Age</label>
                        <Field type="number" name="age" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="age" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Ciudad */}
                    <div>
                        <label htmlFor="city" className="block text-lg font-medium text-gray-700">City</label>
                        <Field type="text" name="city" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="city" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Phone</label>
                        <Field type="text" name="phone" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Activar */}
                    <div className="flex items-center">
                        <Field type="checkbox" name="is_active" className="mr-2" />
                        <label htmlFor="is_active" className="text-lg font-medium text-gray-700">Active</label>
                    </div>

                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className={`py-2 px-4 text-blue rounded-md ${mode === 1 ? "bg-black hover:bg-sky-950" : "bg-sky-950 hover:bg-green-600"}`}
                    >
                        {mode === 1 ? "Crear" : "Actualizar"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default UserFormValidator;