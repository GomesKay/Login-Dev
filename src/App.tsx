import { useState } from "react";
import { toast } from "sonner";
import { User, Lock, LockOpen } from "phosphor-react";
import { RegisterDialog } from "./components/register-dialog";

export function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [lockIcon, setLockIcon] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function passwordVisibility() {
    setShowPassword(!showPassword);
    setLockIcon(!lockIcon);
  }

  function handleCheckLogin(event: { preventDefault: () => void }) {
    event.preventDefault();

    const userDataString = localStorage.getItem("registers");

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const validLogin = userData.some(
        (item: { username: string; password: string }) =>
          item.username === username && item.password === password
      );

      if (validLogin) {
        setUsername("");
        setPassword("");
        toast.success("Login bem-sucedido!");
      } else {
        toast.error("Login não encontrado!");
      }
    } else {
      toast.error("Nenhum registro encontrado");
    }
  }

  return (
    <main className="flex justify-center items-center font-sans h-screen bg-center bg-cover bg-no-repeat bg-[url('/mountain_6000.jpg')]">
      <div className="flex flex-col items-center w-[500px] h-[500px] border border-black rounded-xl text-white bg-transparent sm:w-[350px]">
        <h1 className="pt-8 text-4xl">Login</h1>

        <form className="flex flex-col gap-y-4 w-full pt-32 px-24 sm:px-8">
          <div className="flex">
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
              id="usernameInput"
              className="pl-4 p-3 w-full border rounded-full outline-none cursor-pointer font-serif font-medium text-white bg-black/0 placeholder:font-sans placeholder:text-white focus:border-black"
            />
            <User
              size={26}
              className="fixed top-[46%] left-[56%] cursor-pointer sm:top-[45.5%] sm:left-[73%] md:top-[45.5%] md:left-[64%] lg:top-[46.5%] lg:left-[60%]"
            />
          </div>

          <div className="flex w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              className="pl-4 p-3 w-full border rounded-full outline-none cursor-pointer font-serif font-medium text-white bg-black/0 placeholder:font-sans placeholder:text-white focus:border-black"
            />
            {lockIcon ? (
              <Lock
                size={26}
                className="fixed top-[53%] left-[56%] cursor-pointer sm:top-[53.5%] sm:left-[73%] md:top-[53.5%] md:left-[64%] lg:top-[52.5%] lg:left-[60%]"
                onClick={passwordVisibility}
              />
            ) : (
              <LockOpen
                size={26}
                className="fixed top-[53%] left-[56%] cursor-pointer sm:top-[53.5%] sm:left-[73%] md:top-[53.5%] md:left-[65%] lg:top-[52.5%] lg:left-[60%]"
                onClick={passwordVisibility}
              />
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-y-2 pt-8">
            <input
              type="submit"
              value="Login"
              onClick={handleCheckLogin}
              className="p-2 w-full border-0 rounded-full cursor-pointer text-lg text-black bg-white"
            />
            <div className="flex gap-x-2">
              <p>Não possui um login?</p>
              <RegisterDialog />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
