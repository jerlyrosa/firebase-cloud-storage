import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { SyntheticEvent, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { modelDataWiew, modelDataBase } from "../interface/interface";
import { useMethodStorage } from "./useMethodStorage";

export const useMethodFirebase = () => {
  const COLLECTION: string = "archivos";

  const [docsData, setDocsData] = useState<modelDataWiew[] | undefined>(
    undefined
  );
  const { deleteStorageFile } = useMethodStorage();

  useEffect(() => {
    onSnapshot(collection(db, COLLECTION), (doc) => {
      const data = doc.docs.map((doc) => [doc.id, doc.data()]);
      const docdata: modelDataWiew[] = [];

      data.map((item) => {
        const { name, url } = item[1] as modelDataBase;
        const id: string = item[0] as string;

        docdata.push({
          id: id,
          name: name as string,
          url: url as string,
        });
        return 0 ;
      });
      setDocsData(docdata);
    });
  }, []);

  const addFirebase = async (e: SyntheticEvent, url: string): Promise<void> => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    let nameFile: string = !target.name?.value
      ? "Default Title"
      : target.name.value;
    if (url !== "") {
      await addDoc(collection(db, COLLECTION), {
        name: nameFile,
        url: url,
      })
        .then(() => {
          console.log("File available");
        })
        .catch((error) => {
          console.error("Upload failed", error);
        });
    }
  };

  const updateName = async (id: string, data: string): Promise<void> => {
    if (data.length > 0 && data.trim() !== "") {
      const washingtonRef = doc(db, COLLECTION, id);
      await updateDoc(washingtonRef, {
        name: data,
      })
        .then(() => {
          console.log("File updated");
        })
        .catch((error) => {
          console.error("Updated failed", error);
        });
    }
  };

  const deleteDocCompled = async (id: string, url: string): Promise<void> => {
    console.log("sin url", url);

    const find = docsData?.filter((item) => item.id !== id && item.url);

    if (find?.length === 0) deleteStorageFile(url);

    await deleteDoc(doc(db, COLLECTION, id))
      .then(() => {
        console.log("File delete");
      })
      .catch((error) => {
        console.error("Delete failed", error);
      });
  };

  return {
    addFirebase,
    updateName,
    deleteDocCompled,
    docsData,
  } as const;
};
