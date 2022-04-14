Cada imagen o archivo que cargas en línea debe almacenarse en algún lugar. Son los proveedores de almacenamiento en la nube (como Amazon y Google Cloud) quienes se encargan de almacenar esos archivos como "objetos" en "depósitos" (o **buckets**, como se conocen en inglés).

**Firebase Realtime Database**  y **Cloud Firestore** son excelentes para almacenar datos, pero no son tan buenos con los archivos. **Google Cloud Storage¨** (un servicio de Google Cloud Platform) está diseñado para almacenar y entregar estos archivos.

Firebase Storage es un "middleman" (intermediario) de G. Cloud Storage - uno, dicho sea de paso, bastante útil. 

En este tutorial aprenderás como utilizar Firebase Storage para cargar y descargar archivos con React - aunque en realidad podrías utilizar lo aquí aprendido con cualquier otro framework o incluso JavaScript puro. 

## Requisitos

Antes de entrar de lleno al código son necesarios un par de pasos previos. 

1. Tener [Node](https://nodejs.org/es/) instalado 
2. Instalar el [Firebase CLI](https://firebaseopensource.com/projects/firebase/firebase-tools/)

   `npm install -g firebase-tools`

**Nota:** Puedes encontrar [aquí](https://github.com/lasfito/tutoriales/tree/master/04-firebase-storage) el repositorio para este tutorial.

## Create-react-app

Lo primero es crear un proyecto de React con create-react-app. Este no es un tutorial para ello, si gustas puedes echar un vistazo a la documentación de [React](https://create-react-app.dev/docs/getting-started) 

O bien, puedes abrir alguna carpeta desde VS Code y en la terminal integrada ejecutar:

`npx create-react-app my-app`

Ojo:  **my-app** es el nombre de tu proyecto. 

Después, ejecuta `cd my-app` y estamos listos para comenzar (no olvides abrir el folder también desde vs code). 

## Proyecto Firebase

Lo segundo es crear un proyecto en la [consola de Firebase](console.firebase.google.com). Una vez creado (toma unos cuantos segundos), desde el panel lateral creamos una instancia de *Firebase* y una de *Storage*.


No olvides iniciar la instancia de Firestore en modo prueba.

## Inicializar Firebase en React

Lo siguiente es dirigirnos a VS Code y desde la terminal ejecutar:

 `firebase init` 

Esto iniciará un asistente, dentro del cual debemos:

1. Seleccionar las opciones de Firestore y Storage
2. Escoger la opción de proyecto existente (y elegir el que acabamos de crear)
3. Elige los nombres por defecto para los archivos de reglas

Con ello concluirá el asistente. El siguiente paso es crear una aplicación dentro de nuestro proyecto. Para ello, desde la terminal integrada ejecuta:

`firebase apps:create`

Elige la opción de web.
Esto creará y enlazará la app con tu proyecto. Recibirás en pantalla un comando para obtener las credenciales de acceso. Ejecútalo y copia las credenciales que se mostrarán en pantalla en un archvo .env.local 

Lo siguiente es crear un archivo en src y pegar ahí las credenciales. 

Guarda la función de las credenciales una constante llamada app y expórtala con  `export` escrito antes de la declaración:

```javascript
  export const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  });
```


Después, en ese mismo archivo, importa Firebase y los módulos de Firestore y Storage:



```javascript
import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import "firebase/compat/firestore"
```


No olvides instalar firebase con:
`npm install firebase`


Para terminar, modificaremos las reglas de Storage para nuestro proyecto. 
Dirígete el archivo de **storage.rules** y modifica el if para escribir y leer de la siguiente manera:

`allow read, write: if true`

Después de ello, carga los cambios ejecutando:

`firebase deploy --only storage`

## Carga de archivos con Firebase Storage

Primeramente, importa el archivo en el cual tienes tus credenciales de la siguiente manera: 

`import {app} from "./fb"`

Para cargar archivos utilizaremos una forma:

# firebase-storage
