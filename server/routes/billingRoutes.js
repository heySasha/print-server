const LiqPay = require('../services/liqpay');
const requireLogin = require('../middlewares/requireLogin');

const liqpay = new LiqPay(process.env.LIQPAY_PUBLIC_KEY, process.env.LIQPAY_PRIVATE_KEY);

module.exports = app => {
    app.get('/api/liqpay', requireLogin, async (req, res) => {
       try {
           const form = liqpay.cnb_form({
               'action'         : 'pay',
               'amount'         : '200',
               'currency'       : 'UAH',
               'description'    : 'description text',
               'order_id'       : 'order_id_1',
               'version'        : '3'
           });

           res.send(form);
       } catch (err) {
           res.status(500).send();
       }
    });
};