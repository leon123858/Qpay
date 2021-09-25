'use strict';
import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', { title: 'Qpay' });
});

router.post('/payResult', (req, res) => {
	res.json(req.body);
});

export default router;
