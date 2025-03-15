# **REACT**
> [!NOTE] NOTAS DE CLASE

Primera parte es una sección de pagina, al abrir el calendario se caraga sobre ese fragmento, eso es un **Single Page** (**SPA**), un fragmento.

Después **Demo** que es una **constante**, hay que hacer de cuenta que es una **clase**, llamada **clase demo** y _termina donde termina la llave_.

Dentro de las llaves (`llave = {}`) se puede dividir la sección en 2 partes, la primera donde dice **programe aquí**, se puede poner **variables**, **métodos**..., lo que hemos aprendido de **js**, la otra parte es el **HTML** mas abajo, quiere decir que en esa pagina podrá tener la prgramacion y el **HTML**, tambien podría meter el **CSS**, y es un problema que puede ocurrir con ****REACT**** (_programar desorndenado_) claro que se puede independizar, pero este es el estándar de **REACT**, arriba código abajo **HTML**, esto es lo malo de **REACT**, poca organización.
ahora usaremos **Typescript**, se necesita decir el tipo de dato de la **variable**, **Typescript** es lo mismo que **js** pero especificando tipo de **variable**, y esa **variable** **name** es una **variable de clase** que conoce todo el archivo y se llevo al **HTML** metiéndola con `{}`, y dentro de las llaves se puso el nombre de la **variable** (esa parte de código básicamente lo que hace es **incrustar una variable de js en HTML**)

Después hay un concepto que ocurre en todos lo **Frameworks** de **js** que son las variables **reactivas** (el otro código, linea 4 `[name, setName]`), es como un paso de **referencia**, osea que si cambio algo de la **variable** en la programación se cambia en **HTML** o viceversa, (ejemplo código antes copiado  
```tsx
return <div>
   <h1>Hello World {name}</h1>
    {   
        flag ? <h2>Flag es verdadero</h2> : <h2>Flag es falso</h2>
    }
```
)
en pocas palabras con la variable **reactiva** cualquier cambio que sea haga en cualquier parte que involucre la **variable** se vera refeljado tanto en programación con **HTML**

---

## código demo.tsx

`useEffect` es un método que se ejecuta cada que carga la página (como cuando se llamo la **API** para cargar información).

Después hay una **función** para manejar los cambios en la caja de texto y para entenderla debemos mirar el **HTML**, donde hay un `value` con `name`, lo que quiere decir que esta enlazado con esa **variable**, tienen una **comunicación bidireccional**, lo que quiere decir que si cambia una cambia la otra, y abajo el `onchange`, propio de **REACT**, es para llamar una **función**, y llama a `manejoCambio`, y esta **función** recibe un **evento** que es lo que se esta cambiando en la caja de texto y es lo que permite cambiar lo de arriba, es lo que permite al cambiar lo de la caja de texto cambiar el name (esto es una `demo{name}` (esta encima de la caja de texto))

### CONDICIONALES

Ce coloco una **variable** `let age:number = 20;`
después en el **HTML** se pone un **condicional** (no es que sea un lenguaje de programación pero esto hace **REACT**, permite este tipo de cosas);
lo que se puso ahi es un **condicional ternario**, un condicional que va en una linea de código (todo esto es código **embebido**)

### CICLO FOR

Se creo una `lista` llamada `frameworks:string[] = [REACT, Angular, Vue]`

>[!NOTE]
>`<ul></ul>`; es para crear listas desordenadas

Se abren **llaves** para que sepa que voy a **"tirar" código** y se puso el nombre de la lista .map (`listName.map(value, index)`), que básicamente es un **mapeo** o un **forEach**, un **for** por debajo y el **index** se para en cada **posicion**, y va a **recopilar** por cada **framework** cada cosa que este ahí.