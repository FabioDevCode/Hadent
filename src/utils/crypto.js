import { KEY_ONE, KEY_TWO } from "../config/keys.json" assert { type: "json" };
import CryptoJS from "crypto-js";

class Crypt {
    encryptObject(object) {
		const data = JSON.stringify(object);
		return Buffer.from(
			CryptoJS.AES.encrypt(data, KEY_ONE, { iv: KEY_TWO }).toString(),
		).toString("Hex");
	}

	decryptObject(object) {
		const buffer = Buffer.from(object, "Hex").toString();
		const bytes = CryptoJS.AES.decrypt(buffer, KEY_ONE, { iv: KEY_TWO });
		return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	}

	encryptString(string) {
		return CryptoJS.AES.encrypt(string, KEY_ONE, { iv: KEY_TWO }).toString();
	}

	decryptString(string) {
		return CryptoJS.AES.decrypt(string, KEY_ONE, { iv: KEY_TWO }).toString(
			CryptoJS.enc.Utf8,
		);
	}
};

export default new Crypt();