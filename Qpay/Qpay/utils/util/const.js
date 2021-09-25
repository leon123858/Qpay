const localURL = 'https://d436-61-58-108-100.ngrok.io/';

const getConst = (string) => {
	switch (string) {
		case 'hash1': //A1
			return '86D50DEF3EB7400E';
		case 'hash2': //A2
			return '01FD27C09E5549E5';
		case 'hash3': //B1
			return '9E004965F4244953';
		case 'hash4': //B2
			return '7FB3385F414E4F91';
		case 'storeNumber':
			return 'NA0249_001';
		case 'ReturnURL':
			return localURL + 'payResult';
		case 'BackendURL':
			return localURL + 'webhook/VISA';
		default:
			return null;
	}
};

export default getConst;
