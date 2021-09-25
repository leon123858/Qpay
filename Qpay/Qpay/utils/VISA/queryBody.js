const queryBody = ({ ShopNo, PayToken }) => {
	const str = `PayToken=${PayToken}&ShopNo=${ShopNo}`;
	return str;
};

export { queryBody };
