import pinpng from "../../public/assets/pin.png";
import addpng from "../../public/assets/add.png";
import completedpng from "../../public/assets/completed.png";
import updatepng from "../../public/assets/update.png";
import deletepng from "../../public/assets/delete.png";
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

function ToDoListItems({
  myToDoList,
  setMyToDoList,
  setCompleted,
  completed,
  failed,
  setFailed,
}) {
  const [filter, setFilter] = useState("Tümünü Gör");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  const removeClick = async (id) => {
    try {
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

  const markAsCompleted = async (id) => {
    try {
      const currentDateTime = new Date().toLocaleString();
      const toDoComplete = {
        ...myToDoList.find((item) => item.id === id),
        completed: true,
        completedTime: currentDateTime,
      };

      setCompleted([...completed, toDoComplete]);

      setMyToDoList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Öğeyi tamamlarken hata oluştu:", error);
    }
  };
  const markAsFailed = async (item) => {
    try {
      const toDoFailed = {
        ...item,
        failed: true,
      };

      setFailed([...failed, toDoFailed]);

      setMyToDoList((prevList) =>
        prevList.filter((todo) => todo.id !== item.id)
      );
      if (myToDoList.length === 0) {
        setMyToDoList([]);
      }
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
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-2 justify-center md:flex-row">
        {["Gün", "Hafta", "Ay", "Yıl", "Hepsi"].map((label) => (
          <button
            key={label}
            className="bg-blue-500 text-white rounded-full px-4 py-2 transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={() => setFilter(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center">
        <input
          type="text"
          className="border-2 w-full p-2 rounded-md md:max-w-xs focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Arama Yapın"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col text-black text-lg rounded-2xl gap-4 w-full py-4 md:w-3/4 lg:w-96 mx-auto">
        {" "}
        {filteredList.length > 0 &&
          filteredList.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between items-center border-2 p-4 mt-2 rounded-md shadow-md transition-all duration-200 ${
                item.category === "Bugün"
                  ? "border-red-600 bg-red-50"
                  : item.category === "Bu Hafta"
                  ? "border-orange-300 bg-orange-50"
                  : item.category === "Bu Ay"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-green-400 bg-green-50"
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={pinpng}
                  className="w-12 bg-white rounded-full"
                  alt="pin"
                />
                <div className="flex flex-col flex-1">
                  <p className="max-w-xl uppercase font-semibold break-words whitespace-normal border-b-2 border-black p-3">
                    {item.title}
                  </p>
                  <p className="text-base font-normal p-4">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full mt-2">
                <span className=" p-2 rounded-md">
                  Eklenme Zamanı: {item.addedTime}
                </span>
                <Countdown
                  className=" p-2 text-red-600 rounded-md"
                  date={new Date(item.endDate)}
                  onComplete={() => markAsFailed(item)}
                />
              </div>

              {editingItemId === item.id && (
                <div className="mt-4">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border-b p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <input
                    type="date"
                    value={editEndDate}
                    onChange={(e) => setEditEndDate(e.target.value)}
                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <div className="flex w-full justify-center p-2">
                    <button onClick={() => updated(item.id)} className="mt-2">
                      <img src={addpng} className="w-12 hover:w-14" alt="" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 items-center justify-around border-2 w-full flex-shrink-0 p-1 bg-white rounded-full m-4 shadow-md">
                <button onClick={() => markAsCompleted(item.id)}>
                  <img
                    src={completedpng}
                    className="w-12 hover:w-14"
                    alt="completed"
                  />
                </button>
                <button onClick={() => startEditing(item)}>
                  <img
                    src={updatepng}
                    alt="update"
                    className="w-10 hover:w-12"
                  />
                </button>
                <button onClick={() => removeClick(item.id)}>
                  <img
                    src={deletepng}
                    alt="delete"
                    className="w-10 hover:w-12"
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ToDoListItems;
