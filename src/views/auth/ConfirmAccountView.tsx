import { useState } from "react";
import { Link } from "react-router-dom";
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from "@tanstack/react-query";
import { TokenConformation } from '@/types/index'
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";
const ConfirmAccountView = () => {
    const [token, setToken] = useState <TokenConformation['token']>("");

    const { mutate } = useMutation({
			mutationFn: confirmAccount,
			onError: (error) => {
				toast.error(error.message);
			},
			onSuccess: (data) => {
				console.log(data);
				toast.success(data);
			},
		});

    const handleChange = (token: TokenConformation["token"]) => {
        setToken(token);
	};

    const handleComplete = (token: TokenConformation["token"]) => {
        // Handle token validation and redirect to dashboard or home page
        console.log("Token validated successfully", token);
        // Redirect to dashboard or home page
        window.location.href = "/"
        mutate({token})
    };

    
  return (
		<>
			<h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
			<p className="text-2xl font-light text-white mt-5">
				Ingresa el código que recibiste {""}
				<span className=" text-fuchsia-500 font-bold"> por e-mail</span>
			</p>
			<form className="space-y-8 p-6 lg:p-8 bg-white mt-10">
				<label className="font-normal text-2xl text-center block">
					Código de 6 dígitos
				</label>
				<div className="flex justify-center gap-5">
					<PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
						<PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
						<PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
						<PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
						<PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
						<PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
						<PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
					</PinInput>
				</div>
			</form>

			<nav className="mt-10 flex flex-col space-y-4">
				<Link
					to="/auth/new-code"
					className="text-center text-gray-300 font-normal"
				>
					Solicitar un nuevo Código
				</Link>
			</nav>
		</>
	);
}

export default ConfirmAccountView
