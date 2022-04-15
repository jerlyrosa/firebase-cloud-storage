import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import  { ChangeEvent, useState } from "react";

type InputElemnt = ChangeEvent<HTMLInputElement>;

const useAddStorage = () => {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileNanme, setFileNanme] = useState<string>("");

  const AddStorag = async (e: InputElemnt): Promise<void> => {
    const file = e.target.files![0];

    const storage = getStorage();
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
        console.log("File available at", url );
      })
      .catch((error) => {
        console.error("Upload failed", error);
      });

    console.log("Uploaded a blob or file!");
  };

  return [fileUrl, fileNanme, AddStorag] as const;
};

export { useAddStorage };
