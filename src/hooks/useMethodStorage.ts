import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";


type InputElemnt = ChangeEvent<HTMLInputElement>;

export const useMethodStorage = () => {

  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileNanme, setFileNanme] = useState<string>("");
  const storage = getStorage();

  const AddStorage = async (e: InputElemnt): Promise<void> => {
    const file = e.target.files![0];

    setFileNanme(file.name);
    const fileRef = ref(storage, file.name);
    await uploadBytes(fileRef, file)
      .then(() => {
        console.log("Uploaded a blob or file!");
      })
      .catch((error) => {
        console.error("Error adding document", error);
      });

    await getDownloadURL(ref(fileRef))
      .then((url) => {
        setFileUrl(url);
        console.log("File available at", url);
      })
      .catch((error) => {
        console.error("Upload failed", error);
      });

    console.log("Uploaded a blob or file!");
  };

  const deleteStorageFile = (url: string) => {
    console.log(url);
    const desertRef = ref(storage, url);
    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!", error);
      });
  };

  return {
    fileUrl,
    fileNanme,
    AddStorage,
    storage,
    deleteStorageFile,
  } as const;
};


