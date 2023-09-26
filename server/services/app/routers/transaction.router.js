const Transaction = require('../controllers/transaction.controller');
const authAdmin = require('../middlewares/auth.admin');
const router = require('express').Router();

router.post('/', authAdmin, Transaction.createTransaction);

module.exports = router;
