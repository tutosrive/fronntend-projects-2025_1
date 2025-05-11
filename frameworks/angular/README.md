# Angular

## Files

- `package-lock.json`: Configuración del proyecto

## Folders

- `src/`:
  - `assets/`: Contenidos (logos, imágenes, íconos, e.t.c.)
  - `environments/`: Archivos `.env`
    - `environment.prod.ts`: Para cuando se suba a producción
  - `app/`: 
    - `app.component.html`: **Main** html
    - `app.module.ts`: Configurar librerías
    - `app.routing.ts`: Configuración de rutas (__app routing__)
    - `app.component.scss`: Estilos para toda la página (programable)
    - `components/`:
      - `footer/`
      - `navbar/`
      - `header/`
    - `layouts/`:
      - `main`
    - `page/`: Fragementos de página de la aplicación (módulos & componentes)
      - > `módulos`: Sección/visualización/página, agrupación de varias componentes
      - > `componente`: unidad básica de visualización
  - `environments`: Todas las variables de entorno.

`ngOnInit()` => Similar al useEffect de react

`subscribe()` => Similar al `Promise`

`next:` => Similar al `await`

---

**Vista**: HTML, CSS

**Controlador**: Manipular la vista

**Modelo**: Clases de modelo



> La vista puede ver variables del controlador y viseversa



`*ngFor` => For Each de Angular (Es un "directiva")



---

IMPORTANTE:

IMPORTAR `FormsModule` => Para Acceder al `ngModel`

---

`ngModel`: "Apuntar" a una conexión bidireccional entre el modelo y la vista

- En el HTML: `[(ngModel)]="model.atributte"`
  
  - `[]` => Corchetes significan "ver"
  
  - `()` => Indican que se pueden modificar
  
  - `[()]` => Ver y modificar
