'use strict';
import express from 'express';
import parameterCreator from '../../utils/util/parameterCreator.js';
import getConst from '../../utils/util/const.js';
import { queryBody } from '../../utils/VISA/queryBody.js';

const router = express.Router();

router.post('/', async (req, res) => {
	// 已付款成功
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
	// doSomething in database
	if (creator.data.TSResultContent.Status == 'S') {
		//console.log('pay success!');
	} else {
		//console.log('pay error!');
	}
	res.status(200).json({
		Status: 'S',
	});
});

export default router;
