function ToDoListItems({ list }) {
  const removeClick = () => {};

  return (
    <div>
      <div className="flex flex-col text-black text-lg rounded-2xl  gap-4 w-96 break-all py-4 md:w-144">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between font-barlow items-center border-b-2 p-2 mt-3"
          >
            <p className="  max-w-xs break-words whitespace-normal p-2">
              {item.text}
            </p>
            <div className="flex gap-1 items-center flex-shrink-0">
              <button>
                <img
                  src="../../public/update.png"
                  alt="update"
                  className="w-10 hover:w-12"
                />
              </button>
              <button
                onClick={removeClick}
                className="text-red-700 py-2 px-4 rounded-3xl text-2xl hover:bg-red-700 hover:text-white"
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDoListItems;
