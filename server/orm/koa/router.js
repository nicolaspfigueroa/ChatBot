const KoaRouter = require('koa-router');
const message = require('./controllers/messageController');

const router = new KoaRouter();

router.get('/messages', message.getAll);
router.post('/messages', message.postMessage);

module.exports = router;