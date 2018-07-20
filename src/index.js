import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import distance from 'geo-distance';

const app = new Koa();
const router = new Router();

app.use(cors({
  origin: '*',
  expose: [
    'Location',
    'Upload-Offset',
    'Upload-Length',
    'Content-Disposition',
    'Content-Length',
    'Content-Type',
  ],
  methods: [
    'GET',
    'POST',
  ],
}));

app.use(bodyParser({
  enableTypes: ['text'],
}));


router.get('/', async (ctx, next) => {
  ctx.body = 'boom shaka laka';
  await next();
});


router.post('/', async (ctx, next) => {

});

app.use(router.routes(), router.allowedMethods());
app.listen(3000);
