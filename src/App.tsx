import { useEffect } from 'react';
import './app.css';
import 'bulma/css/bulma.min.css';
import { IconCloud } from './icons/icons';
import { useMethodStorage } from './hooks/useMethodStorage';
import { modelData } from './interface/interface';
import { useMethodFirebase } from './hooks/useMethodFirebase';
import { useModal } from './hooks/useModal';


function App() {

  const { fileUrl, fileNanme, AddStorage } = useMethodStorage();

  const { addFirebase, deleteDocCompled, setAddUrl, docsData } = useMethodFirebase();

  useEffect(() => setAddUrl(fileUrl), [fileUrl,setAddUrl]);

  const { ModalView, openModal } = useModal()


  return (
    <main>
      <section className="contenedor">
        <div className='svgStyles'>
          <IconCloud />
        </div>
        <h1>Upload File to Cloud Storage</h1>
        <form onSubmit={addFirebase} className="formStyles">

          <div className="file is-large  has-name is-boxed">
            <label className="file-label">
              <input className="file-input" type="file" onChange={(e) => AddStorage(e)} name="resume" />
              <span className="file-cta">
                <span className="file-label">
                  Choose a file…
                </span>
              </span>
              <span className="file-name">
                {fileNanme}
              </span>
            </label>
          </div>
          <input type="text" className='input is-medium' defaultValue="" name="name" placeholder='name your file' />

          <button className="generalBotton">Send</button>

        </form>
        <ModalView />


        <ul className="contenedorUl">

          {docsData !== undefined ? (

            docsData.length !== 0 ? (

              docsData.map((doc: object, index: number) => {
                const {
                  id,
                  data: {
                    name,
                    url
                  }

                } = doc as modelData
                return (
                  <li key={index}>
                    <h3>{name}</h3>
                    <p className="download">Download URL: <a href={url} rel="noreferrer" target="_blank">Download</a></p>
                    <button onClick={() => openModal(id)} className='updateBotton'>Update Title</button>
                    <button onClick={() => deleteDocCompled(id, url)} className='deleteBotton'>Delete</button>
                  </li>
                )
              }

              )

            ) : (<h2>There are no files in the Cloud 🦧 </h2>)

          ) : (
            <h2>Loading...</h2>

          )
          }

        </ul>

      </section>

    </main>
  );
}

export default App;
