import "react-phone-number-input/style.css";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
function App() {
  const [value, setValue] = useState();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      fetch(`http://localhost:3000/api?number=${value}`)
        .then((response) => response.json())
        .then((response) => {
          setMessages(response.history);
          setUser(response.accept);
        });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="h-screen w-full ">
      <header className="flex fixed  justify-between px-2 py-2 border-b border-slate-300 bg-white w-full">
        <span className="font-semibold text-2xl">Consultar Chat</span>
        <button className="px-2 py-2 bg-white hover:bg-black/10 border rounded-md">
          Configuracion
        </button>
      </header>
      <main className="flex">
        <section className="w-[23%] my-20 fix px-5 py-5 border-r border-slate-300">
          <form className="fixed" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col gap-3 items-start">
              <span>Phone Number</span>
              <PhoneInput
                international
                defaultCountry="CO"
                placeholder="Enter phone number"
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
        <article className="flex my-20 flex-col w-[77%]  px-5 py-2 gap-5 overflow-visible">
          <div className="h-14 flex">
            <div className="border-b-2 w-auto  border-[#989898] px-1 py-2">
              <div className="w-full h-[100%] rounded-md flex justify-center items-center px-2 py-2 bg-red-300">
                {user && user[0]?.name_wp}
              </div>
            </div>
            <div className="w-[80%] border-b border-slate-300"></div>
          </div>
          {messages?.map((message, index) => (
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
              <div className="text-slate-50">
                <span className="bg-black px-2 rounded-full">
                  {message.date}
                </span>
              </div>
            </div>
          ))}
        </article>
      </main>
    </div>
  );
}

export default App;
