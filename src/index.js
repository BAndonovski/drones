import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import geolib from 'geolib';

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
  const speed = drone !== undefined
    ? Math.abs(geolib.getDistance(
      { latitude: drone.latitude, longitude: drone.longitude },
      { latitude: geo[0], longitude: geo[1] },
    )) / (timestamp - drone.timestamp)
    : 0;

  drones[id] = {
    timestamp,
    latitude: geo[0],
    longitude: geo[1],
    speed,
  };

  ctx.status = 200;
  await next();
});

app.use(router.routes(), router.allowedMethods());
app.listen(3000);
