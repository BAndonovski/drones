import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';

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

const drones = {};
router.post('/', async (ctx, next) => {
  const { body } = ctx.request;

  const id = body.substring(0, 32);
  const timestamp = body.substring(32, 42);
  const geo = body.substring(42).split(',');
  const drone = drones[id];
  let speed = 0;
  if (drone !== undefined) {

  }

  drones[id] = {
    timestamp,
    latitude: geo[0],
    longitude: geo[1],
    speed,
  };

  console.log(drones);
  console.log('\n-----\n');
  ctx.status = 200;
  await next();
});

app.use(router.routes(), router.allowedMethods());
app.listen(3000);
