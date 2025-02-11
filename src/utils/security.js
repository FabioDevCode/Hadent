import xss from "xss";

export const sanitizeBody = (body) => {
	if (typeof body === "string") {
		return xss(body);
	}
	if (Array.isArray(body)) {
		return body.map(sanitizeBody);
	}
	if (typeof body === "object" && body !== null) {
		const sanitizedObject = {};
		for (const key in body) {
			// biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
			if (body.hasOwnProperty(key)) {
				sanitizedObject[key] = sanitizeBody(body[key]);
			}
		}
		return sanitizedObject;
	}
	return body;
};
