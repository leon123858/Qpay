import nodeFetch from 'node-fetch';
import crypto from 'crypto';
import aes from 'js-crypto-aes';

class parameterCreator {
	constructor({ storeNumber, hash1, hash2, hash3, hash4 }) {
		this.storeNumber = storeNumber;
		this.hash = [hash1, hash2, hash3, hash4];
	}

	init = async () => {
		const { _getNonce, _getHashID, _getIV } = this;
		await _getNonce();
		_getHashID();
		_getIV();
	};

	_getNonce = async () => {
		const response = await nodeFetch(
			'https://sandbox.sinopac.com/QPay.WebAPI/api/Nonce',
			{
				method: 'post',
				body: JSON.stringify({ ShopNo: this.storeNumber }),
				headers: { 'Content-Type': 'application/json' },
			}
		);
		const data = await response.json();
		this.nonce = data.Nonce;
	};
	_getHashID = () => {
		const hash = this.hash;
		let str1 = '',
			str2 = '';
		for (let i in hash[0]) {
			str1 += (
				parseInt(hash[0].charAt(i), 16) ^ parseInt(hash[1].charAt(i), 16)
			).toString(16);
			str2 += (
				parseInt(hash[2].charAt(i), 16) ^ parseInt(hash[3].charAt(i), 16)
			).toString(16);
		}
		this.hashID = str1.toUpperCase() + str2.toUpperCase();
	};
	_getIV = (nonce) => {
		const hash = crypto.createHash('sha256');
		hash.update(nonce || this.nonce);
		const hashResult = hash.digest('hex').toString().toUpperCase();
		this.IV = hashResult.substr(hashResult.length - 16, 16);
		return this.IV;
	};

	sendRequest = async ({ body, bodyStr }, mode) => {
		const { _getSign, _getMsg, storeNumber, nonce } = this;
		const sign = _getSign(bodyStr);
		const msg = await _getMsg(body);
		const postBody = {
			Version: '1.0.0',
			ShopNo: storeNumber,
			APIService: mode,
			Sign: sign,
			Nonce: nonce,
			Message: msg,
		};
		const response = await nodeFetch(
			'https://apisbx.sinopac.com/funBIZ/QPay.WebAPI/api/Order',
			{
				method: 'post',
				body: JSON.stringify(postBody),
				headers: { 'Content-Type': 'application/json' },
			}
		);
		this.response = await response.json();
		return this.response;
	};

	_getSign = (bodyStr) => {
		const hash = crypto.createHash('sha256');
		const { hashID, nonce } = this;
		const tmpSign = bodyStr + nonce + hashID;
		hash.update(tmpSign);
		const hashResult = hash.digest('hex').toString().toUpperCase();
		return hashResult;
	};
	_getMsg = async (body) => {
		const enc = new TextEncoder();
		const str = JSON.stringify(body);
		const msg = enc.encode(str); // arbitrary length of message in Uint8Array
		const key = enc.encode(this.hashID); // 16 bytes or 32 bytes key in Uint8Array
		const iv = enc.encode(this.IV); // 16 bytes IV in Uint8Array for AES-CBC mode
		const encrypted = await aes.encrypt(msg, key, { name: 'AES-CBC', iv });
		const encryptedStr = this._Uint8ToHexString(encrypted).toUpperCase();
		return encryptedStr;
	};

	getResponse = async () => {
		const enc = new TextEncoder();
		const dnc = new TextDecoder();
		const { response, hashID, _getIV, _HexStringToUint8 } = this;
		const iv = enc.encode(_getIV(response.Nonce));
		const key = enc.encode(hashID);
		const msg = _HexStringToUint8(response.Message);
		const decrypted = await aes.decrypt(msg, key, { name: 'AES-CBC', iv });
		const data = dnc.decode(decrypted);
		this.data = JSON.parse(data);
		return this.data;
	};

	// translation
	_HexStringToUint8 = (hexString) =>
		new Uint8Array(
			hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
		);

	_Uint8ToHexString = (bytes) =>
		bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

export default parameterCreator;
