import axios from "axios";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { db } from "../firebase";

function ToDoListItems({ myToDoList, setMyToDoList }) {
  const [filter, setFilter] = useState("Tümünü Gör");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapShot = await getDocs(collection(db, "todos"));
        const todoList = querySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyToDoList(todoList);
      } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
      }
    };
    fetchData();
  }, [setMyToDoList]);

  const removeClick = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setMyToDoList(myToDoList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Öğeyi silerken hata oluştu:", error);
    }
  };

  const updated = async (id) => {
    try {
      const updatedItem = {
        title: editTitle,
        description: editDescription,
        endDate: editEndDate,
      };
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, updatedItem);

      setMyToDoList(
        myToDoList.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
      );
      setEditingItemId(null);
    } catch (error) {
      console.log("Öğeyi güncellerken hata oluştu:", error);
    }
  };

  const startEditing = (item) => {
    setEditingItemId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setEditEndDate(item.endDate);
  };

  const completed = async (id) => {
    try {
      const currentDateTime = new Date().toLocaleString();
      const toDoComplete = {
        ...myToDoList.find((item) => item.id === id),
        completed: true,
        completedTime: currentDateTime,
      };
      // 1. Önce `completed` koleksiyonuna yeni belge ekle
      await addDoc(collection(db, "completed"), toDoComplete);

      // 2. Ardından `todos` koleksiyonundaki belgeyi sil
      const todoRef = doc(db, "todos", id);
      await deleteDoc(todoRef);

      // 3. Ekrandaki görevi kaldır
      setMyToDoList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Öğeyi tamamlarken hata oluştu:", error);
    }
  };
  const failed = async (item) => {
    try {
      // `failed` koleksiyonuna eklemek için gerekli veri
      const toDoFailed = {
        ...item,
        failed: true,
      };

      // 1. Süresi dolan görevi `failed` koleksiyonuna ekle
      await addDoc(collection(db, "failed"), toDoFailed);

      // 2. `todos` koleksiyonundaki görevi sil
      const todoRef = doc(db, "todos", item.id);
      await deleteDoc(todoRef);

      // 3. Ekrandaki görev listesinden kaldır
      setMyToDoList((prevList) =>
        prevList.filter((todo) => todo.id !== item.id)
      );
    } catch (error) {
      console.error(
        "Görevi `failed` koleksiyonuna eklerken hata oluştu:",
        error
      );
    }
  };

  const filteredList = myToDoList.filter((item) => {
    const matchesSearch =
      (item.title &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    //hashmap
    const categories = {
      today: "Bugün",
      toweek: "Bu Hafta",
    };
    switch (filter) {
      case categories.today:
        return matchesSearch && item.category === categories.today;
      case "Bu Hafta":
        return matchesSearch && item.category === "Bu Hafta";
      case "Bu Ay":
        return matchesSearch && item.category === "Bu Ay";
      case "Bu Yıl":
        return matchesSearch && item.category === "Bu Yıl";
      default:
        return matchesSearch;
    }
  });

  return (
    <div>
      <div className="flex flex-col gap-2 justify-around md:flex-row">
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2"
          onClick={() => setFilter("Bugün")}
        >
          Bugün
        </button>
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2"
          onClick={() => setFilter("Bu Hafta")}
        >
          Bu Hafta
        </button>
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2"
          onClick={() => setFilter("Bu Ay")}
        >
          Bu Ay
        </button>
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2"
          onClick={() => setFilter("Bu Yıl")}
        >
          Bu Yıl
        </button>
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2"
          onClick={() => setFilter("Tümünü Gör")}
        >
          Tümünü Gör
        </button>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <input
          type="text"
          className="border-2 w-full p-2"
          placeholder="Arama Yapın"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col text-black text-lg rounded-2xl gap-4 w-96 break-all py-4 md:w-144">
        {filteredList.length > 0 &&
          filteredList.map((item) => (
            <div
              key={item.id}
              className={`flex justify-between font-barlow items-center border-2 p-8 mt-2 ${
                item.category === "Bugün"
                  ? "border-red-600"
                  : item.category === "Bu Hafta"
                  ? "border-orange-300"
                  : item.category === "Bu Ay"
                  ? "border-yellow-200"
                  : "border-green-400"
              }`}
            >
              <div className="flex flex-col flex-1 gap-4">
                <img
                  src="../../public/pin.png"
                  className="w-12 bg-white rounded-full"
                  alt="pin"
                />
                <div>
                  <div className="flex flex-col justify-between gap-4 ">
                    <div className="flex justify-between gap-4 p-2">
                      <span className="border-2 p-2">
                        Eklenme Zamanı: {item.addedTime}
                      </span>
                      <Countdown
                        className="border-2 p-2 text-red-600"
                        date={new Date(item.endDate)}
                        onComplete={() => failed(item)}
                      />
                    </div>
                    <div className="border-1 border-black">
                      {editingItemId === item.id ? (
                        <div>
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full border-b p-2"
                          />
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full p-2"
                          />
                          <input
                            type="date"
                            value={editEndDate}
                            onChange={(e) => setEditEndDate(e.target.value)}
                            className="w-full border p-2"
                          />
                          <div className="flex w-full justify-center p-2">
                            <button
                              onClick={() => updated(item.id)}
                              className="mt-2 "
                            >
                              <img
                                src="../../public/add.png"
                                className="w-12 hover:w-14"
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="max-w-xl uppercase font-semibold break-words whitespace-normal border-b-2 border-black p-3">
                            {item.title}
                          </p>
                          <p className="text-base font-normal p-4">
                            {item.description}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 items-center justify-around flex-shrink-0 p-1 bg-white rounded-full m-4">
                    <button onClick={() => completed(item.id)}>
                      <img
                        src="../../public/completed.png"
                        className="w-12 hover:w-14"
                        alt="completed"
                      />
                    </button>
                    <button onClick={() => startEditing(item)}>
                      <img
                        src="../../public/update.png"
                        alt="update"
                        className="w-10 hover:w-12"
                      />
                    </button>
                    <button onClick={() => removeClick(item.id)}>
                      <img
                        src="../../public/delete.png"
                        alt="delete"
                        className="w-10 hover:w-12"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ToDoListItems;
