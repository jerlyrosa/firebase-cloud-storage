import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { app } from './config/firebase';
import './app.css';
import 'bulma/css/bulma.min.css';
import { IconCloud } from './icons/icons';
// import cloud from './cloud.png';
import { getStorage, ref, deleteObject } from "firebase/storage";


function App() {

  const [archivoUrl, setArchivoUrl] = useState<string>();
  const [archivoName, setArchivoName] = useState<string>();

  const [docs, setDocs] = useState<object[]>([]);
  const [loanding, setLoanding] = useState<boolean>(false);



  type InputElemnt = ChangeEvent<HTMLInputElement>;
// otro lado
  interface DataDb {
    readonly id: string,
    data: {
      name: string,
      url: string
    }


  }


  const archivoHandler = async (event: InputElemnt): Promise<void> => {

    const archivo = event.target.files![0];
    setArchivoName(archivo.name)
    const storageRef = app.storage().ref();

    const archivoPath = storageRef.child(archivo.name)
    await archivoPath.put(archivo)



    // console.log(uploadTask.state.)
    console.log(`Archivo cargado ${archivo.name}`)
    const enlaceUrl: string = await archivoPath.getDownloadURL()

    setArchivoUrl(enlaceUrl)

  }



  const submitHandler = async (e: SyntheticEvent): Promise<void> => {


    e.preventDefault();
    
    const target = e.target as typeof e.target & {
      nombre: { value: string };
    };
    const nombreArchivo: string = !target.nombre?.value ? "Default Title" : target.nombre.value
    
    // console.log(nombreArchivo)
    // if (!nombreArchivo) {

    //   alert('Coloca un nombre')
    //   return
    // }


    const coleccionRef = app.firestore().collection("archivos");

    await coleccionRef.add({ name: nombreArchivo, url: archivoUrl })

    console.log(`Archivo cargado ${nombreArchivo}`)
    // window.location.href = "/";
  }




  useEffect(() => {
    (async () => {
      app.firestore().collection('archivos').onSnapshot((item) => {
        // console.log(item.docs.map((doc) => doc.id))
        const data = item.docs.map((doc) => [doc.id, doc.data()]);
        const Docdata: object[] = [];

        data.map((item) => (
          Docdata.push({
            id: item[0],
            data: item[1]

          }
          )
        ))

        setDocs(Docdata)

      });
    })();


  }, [])

  const updateTitle = async (id: string): Promise<void> => {

    app.firestore().collection('archivos').doc(id).update({ name: "test local local" })

      .catch((error) => {
        console.error("Error de actualización de doumento", error);
      });


  }

  const deleteDoc = async (id: string, url:string): Promise<void> => {
    // console.log(id)
    app.firestore().collection('archivos').doc(id).delete()
      .catch((error) => console.error("Error eliminando documento", error));

    const storage = getStorage();
    const desertRef = ref(storage, url);
    deleteObject(desertRef).then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });


  }



  return (
    <main>

      <section className="contenedor">
        <div className='svgStyles'>

          <IconCloud />
        </div>
        <h1>Upload File to Cloud Storage</h1>
        <form onSubmit={submitHandler} className="formStyles">

          <div className="file is-large  has-name is-boxed">
            <label className="file-label">
              <input className="file-input" type="file" onChange={archivoHandler} name="resume" />
              <span className="file-cta">
                <span className="file-label">
                  Choose a file…
                </span>
              </span>
              <span className="file-name">
                {archivoName}
              </span>
            </label>
          </div>
          <input type="text" className='input' defaultValue="" name="nombre" placeholder='name your file' />

          <button>Send</button>
        </form>

        <ul className="contenedorUl">

          {docs.length >= 1 ? (
            docs.map((doc: object, index: number) => {
              const {
                id,
                data: {
                  name,
                  url
                }

              } = doc as DataDb
              // console.log(name)
              return (
                <li key={index}>
                  <h3>{name}</h3>
                  <p className="download">Download URL: <a href={url} rel="noreferrer" target="_blank">Download</a></p>
                  <button onClick={() => updateTitle(id)} className='button-update'>Update Title</button>
                  <button onClick={() => deleteDoc(id, url)} className='button-delete'>Delete</button>

                </li>
              )
            })
          ) :
            // docs.length === 0  ?(
            //   <h2>No data</h2>
            // ):
            (
              <h2>Loading...</h2>

            )
          }

        </ul>

      </section>

    </main>
  );
}

export default App;
