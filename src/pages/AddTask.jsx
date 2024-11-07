import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import addpng from "../../public/assets/add.png";
import { format, differenceInDays } from "date-fns";
import { tr } from "date-fns/locale";

function AddTask({ setMyToDoList }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const submitForm = async (data) => {
    const deadlineDate = new Date(data.deadline);
    const now = new Date();
    const daysDifference = differenceInDays(deadlineDate, now);

    let category;
    if (daysDifference < 1) {
      category = "Bugün";
    } else if (daysDifference <= 7) {
      category = "Bu Hafta";
    } else if (daysDifference <= 30) {
      category = "Bu Ay";
    } else if (daysDifference <= 365) {
      category = "Bu Yıl";
    } else {
      category = "Gelecek Yıl";
    }

    const formattedDate = format(now, "dd/MM/yyyy HH:mm", { locale: tr });

    const taskData = {
      ...data,
      id: nanoid(5),
      endDate: deadlineDate,
      addedTime: formattedDate,
      category: category,
    };

    setMyToDoList((prevList) => [...prevList, taskData]);
    reset();
  };

  return (
    <div className="border-2 rounded-2xl bg-white">
      <form
        className="p-2 flex flex-col items-center gap-4 w-full max-w-md"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="flex flex-col w-full">
          {" "}
          <label htmlFor="title" className="text-lg">
            Başlık
          </label>
          <input
            className="border-1 p-2 rounded text-black"
            type="text"
            id="title"
            name="title"
            {...register("title", {
              required: "Task Başlığı Yazmalısınız",
              minLength: {
                value: 3,
                message: "Task başlığı en az 3 karakter olmalı",
              },
            })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full">
          {" "}
          <label htmlFor="description" className="text-normal">
            Açıklama
          </label>
          <textarea
            className="border-1 p-2 rounded"
            id="description"
            name="description"
            {...register("description", {
              required: "Task Açıklaması Yazmalısınız.",
              minLength: {
                value: 10,
                message: "Task açıklaması en az 10 karakter olmalı",
              },
            })}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full py-2">
          <label htmlFor="deadline" className="text-sm pb-1">
            Son Tarih
          </label>
          <input
            className="border-1 p-1 text-sm rounded w-full"
            type="date"
            {...register("deadline", {
              required: "Son gün seçmelisiniz",
            })}
            id="deadline"
            name="deadline"
            min="2024-10-16"
          />
          {errors.deadline && (
            <p className="input-error">{errors.deadline.message}</p>
          )}
        </div>
        <div>
          <button
            className="submit-button p-2 rounded text-white"
            type="submit"
            disabled={!isValid}
          >
            <img
              src={addpng}
              className="w-12 transition-transform transform scale-90 hover:scale-100 "
              alt="add"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
