import { useEffect, useState } from 'react';
import './app.css';
import 'bulma/css/bulma.min.css';
import { IconCloud } from './icons/icons';
import { useMethodStorage } from './hooks/useMethodStorage';
import { modelData } from './interface/interface';
import { useMethodFirebase } from './hooks/useMethodFirebase';



function App() {

  const { fileUrl, fileNanme, AddStorage } = useMethodStorage();

  const { addFirebase, updateName, deleteDocCompled, setAddUrl, docsData } = useMethodFirebase();

  
  useEffect(() => setAddUrl(fileUrl), [fileUrl]);






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
          <input type="text" className='input' defaultValue="" name="name" placeholder='name your file' />

          <button>Send</button>
        </form>

        <ul className="contenedorUl">

          {docsData.length >= 1 ? (
            docsData.map((doc: object, index: number) => {
              const {
                id,
                data: {
                  name,
                  url
                }

              } = doc as modelData
              console.log(url)
              return (
                <li key={index}>
                  <h3>{name}</h3>
                  <p className="download">Download URL: <a href={url} rel="noreferrer" target="_blank">Download</a></p>
                  <button onClick={() => updateName(id)} className='button-update'>Update Title</button>
                  <button onClick={() => deleteDocCompled(id, url)} className='button-delete'>Delete</button>

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
