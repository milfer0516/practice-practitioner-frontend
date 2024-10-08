import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserRegistrationForm } from "../../types/index";
import ErrorMessage from "../../components/ErrorMessage";
import { createAccount } from "../../api/AuthAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterView() {
	const initialValues: UserRegistrationForm = {
		username: "",
		email: "",
		password: "",
		password_confirmation: "",
	};
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<UserRegistrationForm>({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: createAccount,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			console.log(data);
			toast.success(data);
			// Reset the form after successful registration.
			reset();
		},
	});

	const password = watch("password");

	const handleRegister = (formData: UserRegistrationForm) => {
		// Implement your registration logic here.
		// Example: axios.post('/register', formData).then(response => console.log(response)).catch(error => console.error(error));
		//console.log('Datos formulario de Registro: ', formData)
		mutate(formData); // Call the mutation function with the form data.
		setTimeout(() => {
			// Redirect to confirm account page after 10 seconds.
			navigate("/auth/confirm-account");
			// Reset the form after successful registration.
			reset();
		}, 10000);
	};

	return (
		<>
			<h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
			<p className="text-2xl font-light text-white mt-5">
				Llena el formulario para {""}
				<span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
			</p>

			<form
				onSubmit={handleSubmit(handleRegister)}
				className="space-y-8 p-10  bg-white mt-10"
				noValidate
			>
				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl" htmlFor="email">
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Email de Registro"
						className="w-full p-3  border-gray-300 border"
						{...register("email", {
							required: "El Email de registro es obligatorio",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "E-mail no válido",
							},
						})}
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>

				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl">Nombre</label>
					<input
						type="name"
						placeholder="Nombre de Registro"
						className="w-full p-3  border-gray-300 border"
						{...register("username", {
							required: "El Nombre de usuario es obligatorio",
						})}
					/>
					{errors.username && (
						<ErrorMessage>{errors.username.message}</ErrorMessage>
					)}
				</div>

				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl">Password</label>

					<input
						type="password"
						placeholder="Password de Registro"
						className="w-full p-3  border-gray-300 border"
						{...register("password", {
							required: "El Password es obligatorio",
							minLength: {
								value: 6,
								message: "El Password debe ser mínimo de 6 caracteres",
							},
						})}
					/>
					{errors.password && (
						<ErrorMessage>{errors.password.message}</ErrorMessage>
					)}
				</div>

				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl">Repetir Password</label>

					<input
						id="password_confirmation"
						type="password"
						placeholder="Repite Password de Registro"
						className="w-full p-3  border-gray-300 border"
						{...register("password_confirmation", {
							required: "Repetir Password es obligatorio",
							validate: (value) =>
								value === password || "Los Passwords no son iguales",
						})}
					/>

					{errors.password_confirmation && (
						<ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
					)}
				</div>

				<input
					type="submit"
					value="Registrarme"
					className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
				/>
			</form>
			<nav className="mt-10 flex flex-col space-y-4 text-white">
				<Link
					to={"/auth/login"}
					className="text-center text-gray-300 font-normal"
				>
					Ya tienes Cuenta ? Inicia Sesión
				</Link>
			</nav>
			<ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
		</>
	);
}
