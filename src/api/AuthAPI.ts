import api from "../lib/axios";
import { isAxiosError } from "axios";
import { UserRegistrationForm, TokenConformation } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
	try {
		const url = "/auth/create-account";
		const { data } = await api.post<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error)) {
			throw new Error(error.response?.data.error);
		}
		throw new Error("Hubo un error inesperado al registrar el usuario");
	}
}
export async function confirmAccount(formData: TokenConformation) {
	try {
		const url = "/auth/confirm-account";
		const { data } = await api.post<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error)) {
			throw new Error(error.response?.data.error);
		}
		throw new Error("Hubo un error inesperado al registrar el usuario");
	}
}

//confirm-account
