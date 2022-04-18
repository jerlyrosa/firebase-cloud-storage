import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ChangeEvent, useState, SyntheticEvent } from "react";

type InputElemnt = ChangeEvent<HTMLInputElement>;

export const useMethodStorage = () => {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileNanme, setFileNanme] = useState<string>();
  const [timeFile, setTime] = useState<boolean | undefined>(undefined);
  const [file, setFile] = useState<File>();

  const storage = getStorage();

  const GetFiles = async (e: InputElemnt): Promise<void> => {
    const file = e.target.files![0];
    setFile(file);
    setFileNanme(file.name);
  };

  const AddStorage = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (file) {
      setTime(false);

      const fileRef = ref(storage, file.name);

      const url = await uploadBytes(fileRef, file)
        .then((item) => {
          console.log("Uploaded a blob or file!");
          return getDownloadURL(ref(fileRef))
            .then((url) => {
              setFileUrl(url);
              setTime(true);
              console.log("File available at", url);
              return url;
            })
            .catch((error) => {
              console.error("Upload failed", error);
            });
        })
        .catch((error) => {
          console.error("Error adding document", error);
        });
      return url;
    }
  };

  const deleteStorageFile = (url: string) => {
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
    setFileNanme,
    GetFiles,
    storage,
    timeFile,
    deleteStorageFile,
    AddStorage,
  } as const;
};
