import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ChangeEvent,  useState } from "react";


type InputElemnt = ChangeEvent<HTMLInputElement>;

export const useMethodStorage = () => {

  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileNanme, setFileNanme] = useState<string>("");
  const [timeFile, setTime] = useState<boolean | undefined>(undefined);

  // console.log(time !== undefined ? time ? "se caragdo": "cargando":" estado base"  )

  const storage = getStorage();

  const AddStorage = async (e: InputElemnt): Promise<void> => {
    const file = e.target.files![0];
    setTime(false)

    setFileNanme(file.name);
    const fileRef = ref(storage, file.name);
    await uploadBytes(fileRef, file)
      .then(() => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(ref(fileRef))
        .then((url) => {
          setFileUrl(url);
          setTime(true)
          console.log("File available at", url);
        })
        .catch((error) => {
          console.error("Upload failed", error);
        });

      })
      .catch((error) => {
        console.error("Error adding document", error);
      });

      // setTime(undefined)
    // await getDownloadURL(ref(fileRef))
    //   .then((url) => {
    //     setFileUrl(url);

    //     console.log("File available at", url);

    //   })
    //   .catch((error) => {
    //     console.error("Upload failed", error);
    //   });



     
  };



  // const deleteStorageFile = (url: string) => {
  //   const desertRef = ref(storage, url);
  //   deleteObject(desertRef)
  //     .then(() => {
  //       console.log("File deleted successfully");
  //     })
  //     .catch((error) => {
  //       console.log("Uh-oh, an error occurred!", error);
  //     });
  // };

  return {
    fileUrl,
    fileNanme,
    AddStorage,
    storage,
    timeFile
    // deleteStorageFile,
  } as const;
};


