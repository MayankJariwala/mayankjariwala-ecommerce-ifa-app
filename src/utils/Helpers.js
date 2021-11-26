import React from "react";

export function validateEmail(email: string) {
	const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	return reg.test(email);
}

export function validateContact(contact: string) {
	const reg = /^\d{10}$/;
	return reg.test(contact);
}

export function admin_url(url: string) {
	return `/admin/${url}`;
}

export function validatePassword(password: string) {
	const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
	return passwordRegex.test(password);
}

export function validateUrl(url: string) {
	const reg = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
	return reg.test(url);
}


export function requiredMarked() {
	return (
		<span className={"text-danger"}>(*)</span>
	);
}


export function getAuthHeaders(model: any) {
	return {
		"session-token": (model.admin_model !== null && model.admin_model.hasOwnProperty("session_token")) ? model.admin_model.session_token : "",
		"uuid": (model.admin_model !== null && model.admin_model.hasOwnProperty("uuid")) ? model.admin_model.uuid : ""
	};
}

export function getVisitorHeader() {
	return {
		"visitor-token": "8a965ba5-2e11-483d-aa74-a9a27792f49e"
	};
}
