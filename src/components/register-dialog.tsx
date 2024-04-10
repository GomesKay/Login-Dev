import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Trash, X } from "phosphor-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Records {
  username: string;
  password: string;
}

const registerDialogSchema = z.object({
  username: z.string().nonempty("Nome de Usuário obrigatório"),
  password: z
    .string()
    .nonempty("Senha obrigatória")
    .min(7, "A senha precisa ter no mínimo 7 caracteres"),
});

type RegisterDialogSchema = z.infer<typeof registerDialogSchema>;

export function RegisterDialog() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [records, setRecords] = useState<Records[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDialogSchema>({
    resolver: zodResolver(registerDialogSchema),
  });

  function handleRegisterUser(data: RegisterDialogSchema) {
    if (username === "" || password === "") {
      toast.error("Preencha os Campos");
    } else {
      const newRecords = [
        ...records,
        { username: data.username, password: data.password },
      ];
      setRecords(newRecords);

      localStorage.setItem("registers", JSON.stringify(newRecords));

      const userDataString = localStorage.getItem("registers");
      if (userDataString) {
        setUsername("");
        setPassword("");
        JSON.parse(userDataString);
        toast.success("Registrado com sucesso!");
      } else {
        toast.error("Não registrado, tente novamente!");
      }
    }
  }

  function handleDeleteUsers() {
    localStorage.removeItem("registers");
    toast.success("Todos os registros deletados!");
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <p className="hover:underline hover:duration-500 hover:text-black">
          Registrar
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="w-[350px] h-[350px] rounded-lg bg-night relative">
            <Dialog.Close className="absolute right-0 top-0 p-2">
              <X size={15} className="text-white" />
            </Dialog.Close>

            <h2 className="flex justify-center pt-4 text-2xl text-white">
              Register
            </h2>

            <form
              onSubmit={handleSubmit(handleRegisterUser)}
              className="flex flex-col px-14"
            >
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col pt-6">
                  <label className="text-white">Nome de Usuário</label>
                  <input
                    type="text"
                    value={username}
                    {...register("username")}
                    placeholder="Seu nome de usuário"
                    onChange={(event) => setUsername(event.target.value)}
                    className="pl-3 p-1 outline-none border-2 rounded-full font-serif font-medium placeholder:font-sans focus:border-gray"
                  />
                  {errors.username && (
                    <span className="text-sm text-red/90">
                      {errors.username.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-white">Senha</label>
                  <input
                    type="password"
                    value={password}
                    {...register("password")}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Mínimo 7 caracteres"
                    className="pl-3 p-1 outline-none border-2 rounded-full font-serif font-medium placeholder:font-sans focus:border-gray"
                  />
                  {errors.password && (
                    <span className="text-sm text-red/90">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <input
                  type="submit"
                  value="Registrar"
                  className="p-1 w-full border-0 rounded-full cursor-pointer text-lg text-black bg-white"
                />

                <div
                  onClick={handleDeleteUsers}
                  className="flex justify-center gap-x-1 cursor-pointer text-white hover:duration-500 hover:text-red"
                >
                  <Trash />
                  <p className="text-sm">Deletar Registro</p>
                </div>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
