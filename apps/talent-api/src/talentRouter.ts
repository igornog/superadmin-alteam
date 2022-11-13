import express from 'express';

export const talentRouter = express.Router();
talentRouter.use(express.json());
// talentRouter.get(
//   '/prod/freelancers/:id',
//   param('id').isNumeric(),
//   (req, res, next) => {
//     sendPromise(retrieve(req.params.id), res, next);
//   }
//);
talentRouter.post('/talent/webflow/webhook', (req, res, next) => {
  console.log('Webflow webhook', req.body);
});
