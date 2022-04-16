import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { SyntheticEvent, useEffect, useState } from "react";
import { db } from "../config/firebaseV2";

export const useMethodFirebase = (loadingTime?: boolean | undefined) => {
  const [addUrl, setAddUrl] = useState<string>("");
  const [docsData, setDocsData] = useState<object[] | undefined>(undefined);
  // const { timeFile } = useMethodStorage();

  // console.log(data)
  useEffect(() => {
    onSnapshot(collection(db, "archivos"), (doc) => {
      const data = doc.docs.map((doc) => [doc.id, doc.data()]);
      const docdata: object[] = [];
      data.map((item) =>
        docdata.push({
          id: item[0],
          data: item[1],
        })
      );
      setDocsData(docdata);
    });
  }, [setAddUrl]);

  const addFirebase = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    let nameFile: string = !target.name?.value
      ? "Default Title"
      : target.name.value;
    if (addUrl !== "" && loadingTime) {
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
    } 

  };

  const updateName = async (id: string, data: string): Promise<void> => {
    console.log(data);

    if (data.length > 0 && data.trim() !== "") {
      const washingtonRef = doc(db, "archivos", id);
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

  // const GetInput=(e: SyntheticEvent):any =>{

  // }
  // GetInput(da)

  //   await updateDoc(washingtonRef, {
  //     name: "Default",
  //   })
  //     .then(() => {
  //       console.log("File updated");
  //     })
  //     .catch((error) => {
  //       console.error("Updated failed", error);
  //     });
  // };

  const deleteDocCompled = async (id: string, url: string): Promise<void> => {
    // deleteStorageFile(url);
    await deleteDoc(doc(db, "archivos", id))
      .then(() => {
        console.log("File delete");
      })
      .catch((error) => {
        console.error("Delete failed", error);
      });
  };

  return {
    setAddUrl,
    addFirebase,
    updateName,
    deleteDocCompled,
    docsData,
  } as const;
};
