import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { app } from './config/firebase';
import './app.css';
import 'bulma/css/bulma.min.css';
import FooterUI from './footer';



function App() {

  const [archivoUrl, setArchivoUrl] = useState<string>();
  const [archivoName, setArchivoName] = useState<string>();

  const [docs, setDocs] = useState<[]>([]);


  console.log(docs)
  type InputElemnt = ChangeEvent<HTMLInputElement>;

  interface DataDb {
    nombre: string;
    url: string;

  }


  const archivoHandler = async (event: InputElemnt): Promise<void> => {

    const archivo = event.target.files![0];
    setArchivoName(archivo.name)
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

    await coleccionRef.doc(nombreArchivo).set({ nombre: nombreArchivo, url: archivoUrl })
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
    <main>

      <section className="contenedor">

        <h1>Subir archivos a Cloud Storage</h1>
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
          <input type="text" className='input' name="nombre" placeholder='nombra tu archivio' />

          <button>Enviar</button>
        </form>

        <ul className="contenedorUl">

          {docs.length > 0 ? (
            docs.map((doc: DataDb, index) => {
              return (
                <li key={index}>
                  <h3>{doc.nombre}</h3>
                  <p className="download">URL de descarga: <a href={doc.url} rel="noreferrer" target="_blank">Descargar</a></p>
                </li>
              )
            })
          ) : (
            <h2>Cargando...</h2>
          )
          }

        </ul>

      </section>
      <FooterUI />

    </main>
  );
}

export default App;
