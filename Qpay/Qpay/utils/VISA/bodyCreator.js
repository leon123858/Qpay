const bodyCreate = ({
	itemName,
	price,
	storeNumber,
	ReturnURL,
	BackendURL,
}) => {
	const date = new Date();
	return {
		ShopNo: storeNumber,
		OrderNo: parseInt(date.getSeconds()),
		Amount: price,
		CurrencyID: 'TWD',
		PayType: 'C',
		CardParam: { AutoBilling: 'Y' },
		PrdtName: itemName,
		ReturnURL: ReturnURL,
		BackendURL: BackendURL,
	};
};

const bodyParse = ({
	ShopNo,
	OrderNo,
	Amount,
	CurrencyID,
	PayType,
	PrdtName,
	ReturnURL,
	BackendURL,
}) => {
	const str =
		`Amount=${Amount}&BackendURL=${BackendURL}&` +
		`CurrencyID=${CurrencyID}&OrderNo=${OrderNo}&PayType=${PayType}&` +
		`PrdtName=${PrdtName}&ReturnURL=${ReturnURL}&ShopNo=${ShopNo}`;
	return str;
};

export { bodyCreate, bodyParse };
