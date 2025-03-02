# Actualización maqueta "**mercado libre**"
> [!NOTE]
> Se usa [**Bootstrap**](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
>
> Actualizado de `v4.6` => `v5.3.3`

Clases usadas en los siguientes componentes

>
> [!IMPORTANT]
> Modelo de clases actual (Funcional)
> 
---

> ### SideBar
> - `col-lg-3`: La columna toma **3 unidades** del espacio en > pantallas grandes (**PC**)
> - `col-md-4`: La columna toma **4 unidades** del espacio en pantallas medianas (**Tabletas**)
> - `d-lg-block`: Establece el display en `block` en pantallas grandes (**PC**)
> - `d-md-block`: Establece el display en `block` en pantallas medianas (**Tabletas**)
> - `d-none`: Por defecto está oculto (solo se toma en cuenta en tamaños menores a `md`, **móviles**)
> - `mt-4`: Agregar margen de `24px` en el `top`
> 
> ---
>
> ### Contenedor del principal (dentro está el contenedor de cuadrícula) 
> - `col-lg-9`: La columna toma **9 unidades** del espacio en pantallas grandes (**PC**)
> - `col-md-8`: La columna toma **8 unidades** del espacio en pantallas medianas (**Tabletas**)
> - `col-sm-9`:
> - `col-12`:
> - `mx-auto`: Margen horizontal automático (Centrar el contenido cuando no está el `sidebar`)
> ### Contenedor cuadrícula de principal (CCP):
> - `row`: Sintaxis necesaria para reconocer la clase `col`
> - `mx-0`: Quita el margen horizontal
> - `p-0`: Quita todo tipo de padding
> - `row-cols-lg-3`: En pantallas grandes, se mostrarán **3 columnas** (`col-lg-3`)
> - `row-cols-md-2`: En pantallas medianas, se mostrarán **2 columnas** (`col-md-2`)
> - `row-cols-sm-2`: En pantallas pequeñas, se mostrarán **2 columnas** (`col-sm-2`)
> - `row-cols-1`: En pantallas excluidas de las anteriores (`< sm`), se mostrará **1 columna** (`col-1`)
>   - ### Para cada columna (Cada `div` dentro de [`CCP`](#contenedor-cuadrícula-de-principal-ccp)) dentro de esta sección:
>     - `col`: Esta clase complementa el modelo `responsive` con ayuda de las clases `row mx-0 p-0 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1` permite ajustarse al tamaño adecuado

--- 

> [!WARNING]
> Las siguientes, fueron el modelo inicial (No funcionó como se deseaba)

> ### Tarjetas de las motos (cuadrícula principal)
> 
> - `col-lg-9`:La columna toma **9 unidades** del espacio en pantallas grandes (**PC**)
> - `col-md-8`:La columna toma **8 unidades** del espacio en pantallas medianas (**Tabletas**)
> - `col-12`: La columna toma **12 unidades** del espacio (tamaño completo) en pantallas pequeñas (**móviles**)
> 
>     - ### Para cada columna (`col` => dentro de `row`) dentro de esta sección:
>       - `col-lg-4`:La columna toma **9 unidades** del espacio en pantallas grandes (**PC**)
>       - `col-md-6`:La columna toma **8 unidades** del espacio en pantallas medianas (**Tabletas**)
>       - `col-12`: La columna toma **12 unidades** del espacio (tamaño completo) en pantallas pequeñas (**móviles**)
>       - `p-2`: Toma un espacio interno de `20px` (`padding`)