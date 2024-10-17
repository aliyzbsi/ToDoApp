import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const saveName = () => {
    localStorage.setItem("isim", name);
  };

  const forgetMe = () => {};

  return (
    <div className="p-3 text-center flex flex-col gap-2 items-center">
      <h1 className="text-lg">
        Hoşgeldin {localStorage.getItem("isim") || "Yabancı"}
      </h1>
      <input
        onChange={handleChange}
        value={name}
        className="border h-8 px-2 border-stone-400"
      />

      <div className="flex gap-2">
        <button
          className="bg-stone-600 h-8 text-sm px-3 rounded text-white disabled:opacity-70"
          onClick={forgetMe}
        >
          Beni unut
        </button>
        <button
          className="bg-green-600 h-8 text-sm px-3 rounded text-white disabled:opacity-70"
          onClick={saveName}
          disabled={name === ""}
        >
          Adımı Kaydet
        </button>
      </div>
    </div>
  );
}
