import { collection, addDoc } from "firebase/firestore";
import { SyntheticEvent, useState } from "react";
import { db } from "../config/firebaseV2";

export const useAddFirebase = () => {
  const [addUrl, setAddUrl] = useState<string>("");

  const addFirebase = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    let nameFile: string = !target.name?.value
      ? "Default Title"
      : target.name.value;
    //   console.log(nameFile)

    await addDoc(collection(db, "archivos"), {
      name: nameFile,
      url: addUrl,
    })
      .then(() => {
        console.log("File available");
      })
      .catch((error) => {
        console.error("Upload failed", error);
      });
    //   console.log("Document written with ID: ", docRef.id);
  };

  return [setAddUrl, addFirebase] as const;
};
