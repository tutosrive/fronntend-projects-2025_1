import { Permission } from "../../models/Permission";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


// Definimos la interfaz para los props
interface MyFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Permission) => void;
    handleUpdate?: (values: Permission) => void;
    permission?: Permission | null;
}



const PermissionFormValidator: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate,permission }) => {

    const handleSubmit = (formattedValues: Permission) => {
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
        // Cuando se crea "permission" = null, cuando es update "permission" = Permission
        // Se dan valores iniciales para reemplazar el "null"
            initialValues={permission ? permission :{
                method:"",
                url:""
            }}
            // Yup: npm i yup
            validationSchema={Yup.object({
                method: Yup.string().required("El nombre es obligatorio"),
                url: Yup.string().required("La descripción es obligatoria"),
            })}
            onSubmit={(values) => {
                handleSubmit(values); // Llama a la función de envío con los valores formateados
            }}
            
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-blue rounded-md shadow-md">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="method" className="block text-lg font-medium text-gray-700">Method</label>
                        <Field type="text" name="method" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="method" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="url" className="block text-lg font-medium text-gray-700">URL</label>
                        <Field type="text" name="url" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="url" component="p" className="text-red-500 text-sm" />
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

export default PermissionFormValidator;