'use strict';
import express from 'express';
const router = express.Router();
import parameterCreator from '../../utils/util/parameterCreator.js';
import getConst from '../../utils/util/const.js';
import { bodyCreate, bodyParse } from '../../utils/VISA/bodyCreator.js';
import { queryBody } from '../../utils/VISA/queryBody.js';

router.post('/purchase', async (req, res) => {
	const { itemName, price } = req.body;
	const creator = new parameterCreator({
		storeNumber: getConst('storeNumber'),
		hash1: getConst('hash1'),
		hash2: getConst('hash2'),
		hash3: getConst('hash3'),
		hash4: getConst('hash4'),
	});
	const body = bodyCreate({
		itemName,
		price,
		storeNumber: creator.storeNumber,
		ReturnURL: getConst('ReturnURL'),
		BackendURL: getConst('BackendURL'),
	});
	await creator.init();
	await creator.sendRequest({ body, bodyStr: bodyParse(body) }, 'OrderCreate');
	await creator.getResponse();
	res.redirect(creator.data.CardParam.CardPayURL);
});
router.post('/pollingAsk', async (req, res) => {
	const creator = new parameterCreator({
		storeNumber: getConst('storeNumber'),
		hash1: getConst('hash1'),
		hash2: getConst('hash2'),
		hash3: getConst('hash3'),
		hash4: getConst('hash4'),
	});
	const body = req.body;
	await creator.init();
	await creator.sendRequest(
		{ body, bodyStr: queryBody(body) },
		'OrderPayQuery'
	);
	await creator.getResponse();
	if (creator.data.TSResultContent.Status == 'S') {
		res.status(200).json({
			Status: 'S',
		});
	} else {
		res.status(200).json({
			Status: 'E',
		});
	}
});

export default router;
