const _ = require('lodash');

const requireLogin = require('../middlewares/requireLogin');
const Order = require('../models/order');

module.exports = app => {
	app.get('/api/orders', requireLogin, async (req, res) => {
		try {
			const { _id: userId } = req.user;

			const orders = await Order.find({ _id: userId });

			res.send({ orders });
		} catch (err) {
			res.status(500).send();
		}
	});

	app.delete('/api/orders/:id', requireLogin, async (req, res) => {
		try {
			const { id: orderId } = req.params;

			const order = await Order.findByIdAndRemove(orderId);

			res.send({ order });
		} catch (err) {
			res.status(500).send();
		}
	});

	app.patch('/api/orders/:id', requireLogin, async (req, res) => {
		try {
			const { id: orderId } = req.params;
			const body = _.pick(req.body, ['status']);

			const order = await Order.findByIdAndUpdate(
				orderId,
				{
					$set: body
				},
				{
					new: true
				}
			);

			res.send({ order });
		} catch (err) {
			res.status(500).send();
		}
	});

	app.post('/api/orders', requireLogin, async (req, res) => {
		try {
			const { _id: userId } = req.user;
			const body = _.pick(req.body, ['status', 'cost', 'type', 'files']);

			const order = await new Order(
				Object.assign({}, body, { _creator: userId })
			).save();

			res.send({ order });
		} catch (err) {
			res.status(500).send();
		}
	});

	app.get('/order', (req, res) => {
		res.render('order', { user: req.user });
	});

	app.get('/order/make', (req, res) => {
		res.render('makeorder', { user: req.user });
	});
};
