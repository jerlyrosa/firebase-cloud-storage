import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { app } from './config/firebase';

function App() {

  const [archivoUrl, setArchivoUrl] = useState<string>()
  const [docs, setDocs] = useState<[]>([])

  // console.log(docs)
  //TIPOS
  type InputElemnt = ChangeEvent<HTMLInputElement>;

  interface DataDb {
    nombre: string;
    url: string;

  }




  const archivoHandler = async (event: InputElemnt): Promise<void> => {

    const archivo = event.target.files![0];
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(archivo.name)
    await archivoPath.put(archivo)
    console.log(`Archivo cargado ${archivo.name}`)
    const enlaceUrl: string = await archivoPath.getDownloadURL()

    setArchivoUrl(enlaceUrl)

  }



  const submitHandler = async (e: SyntheticEvent): Promise<void> => {


    e.preventDefault();

    const target = e.target as typeof e.target & {
      nombre: { value: string };
    };
    const nombreArchivo: string = target.nombre.value;

    if (!nombreArchivo) {

      alert('Coloca un nombre')
      return
    }


    const coleccionRef = app.firestore().collection("archivos");

    const doc = await coleccionRef.doc(nombreArchivo).set({ nombre: nombreArchivo, url: archivoUrl })
    console.log(`Archivo cargado ${nombreArchivo}`)
    window.location.href = "/";

  }




  useEffect(() => {
    (async () => {
      const docList = await app.firestore().collection('archivos').get();
      setDocs(docList.docs.map((doc) => doc.data()) as [])
    })();


  }, [])


  return (
    <section>
      <form onSubmit={submitHandler}>
        <input type="file" onChange={archivoHandler} />
        <input type="text" name="nombre" placeholder='nombra tu archivio' />
        <button>Enviar</button>
      <h1>{ process.env.TZ} s</h1>
      </form>

      <ul>
        {docs.map((doc: DataDb, index) => {

          console.log(doc.nombre)

          return (
            <li key={index}>
              <h3>{doc.nombre}</h3>
              <img src={doc.url} height="100px" width="100px" />
            </li>
          )
        })}

      </ul>
    </section>
  );
}

export default App;
