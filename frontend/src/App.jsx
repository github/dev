import "react-phone-number-input/style.css";
import html2canvas from "html2canvas";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
function App() {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const token = import.meta.env.VITE_JWT;
      fetch(`http://localhost:3000/api/history?number=${value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          formatData(response.history);
          setUser(response.accept);
        });
      await new Promise((r) => setTimeout(r, 2000));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  const TestButton = () => {
    const table = document.getElementById("table-container");

    html2canvas(table).then(function (canvas) {
      const link = document.createElement("a");
      link.download = "table.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  function formatData(history) {
    function formatDate(date_work) {
      const date = new Date(date_work);
      const horas = date.getHours();
      const minutos = date.getMinutes();
      const fulldate = date.toLocaleDateString();
      setDate(fulldate);

      const periodo = horas >= 12 ? "PM" : "AM";

      const horasFormato12 = horas % 12 || 12;

      const horaFormateada = `${horasFormato12}:${minutos.toLocaleString(
        "en-US",
        { minimumIntegerDigits: 2 }
      )} ${periodo}`;
      return horaFormateada;
    }
    const new_data = history.map((mess) => {
      mess.date = formatDate(mess.date);
      return mess;
    });
    setMessages(new_data);
  }

  return (
    <div  className="h-screen w-full ">
      <header className="flex fixed  justify-between px-2 py-2 border-b border-slate-300 bg-white w-full">
        <div className="flex justify-center items-center gap-2">
          <img className="h-10 " src="/icon.png" alt="Icon Chat-Bot" />
          <span className="font-semibold text-2xl">Consultar Chat</span>
        </div>
        <button className="px-2 py-2 bg-white hover:bg-black/10 border rounded-md">
          Configuracion
        </button>
      </header>
      <main className="flex">
        <section className="w-[23%] my-20 fix px-5 py-5 border-r border-slate-300">
          <form className="fixed" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col gap-3 items-start">
              <span>Número de teléfono</span>
              <PhoneInput
                international
                defaultCountry="CO"
                value={value}
                onChange={setValue}
                className="py-2 px-2 border-slate-300 border rounded-md"
              />
              <button className="bg-black text-slate-50 px-3 py-2 rounded-md">
                Buscar
              </button>
            </div>
          </form>
        </section>
        <article id="table-container" className="flex my-20  flex-col w-[77%]  px-5 py-2 gap-5 overflow-visible">
          <div className="h-14 flex">
            <div className="border-b-2 w-auto min-w-[20%]  border-[#989898] px-1 py-2">
              <div className="w-full h-[100%] rounded-md flex justify-center items-center px-2 py-2 bg-red-300">
                {user && user[0]?.name_wp}
              </div>
            </div>
            <div className="w-[80%] px-2 py-2 flex justify-end border-b border-slate-300">
              <button
                onClick={() => TestButton()}
                className="bg-black text-slate-50 px-3 py-2 rounded-md"
              >
                Compartir
              </button>
            </div>
          </div>
          {date && (
            <div className="flex justify-center">
              <span className=" bg-black text-slate-50 rounded-md px-2 py-2 w-auto">
                {date}
              </span>
            </div>
          )}
          {loading ? (
            <div  className="h-full my-20 flex justify-center items-center">
              <div className="h-20 w-20 rounded-full border-4 border-blue-500 border-r-transparent animate-spin"></div>
            </div>
          ) : messages.length > 0 ? (
            messages?.map((message, index) => (
              <div
                className={`${
                  message.options.buttons
                    ? "self-end rounded-l-md rounded-tr-md "
                    : "rounded-r-md rounded-tl-md self-start"
                } ${
                  message.options.buttons ? "bg-blue-200" : "bg-gray-200"
                } border  w-[55%]  flex flex-col justify-between px-2 py-2`}
                key={index}
              >
                <span>{message.answer}</span>
                <div className="text-slate-50 my-3">
                  <span className="bg-black px-2 rounded-full">
                    {message.date}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center min-h-screen">
              <span>No hay historial del numero</span>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}

export default App;
