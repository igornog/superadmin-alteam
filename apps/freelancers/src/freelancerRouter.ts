import express from "express";

export const freelancerRouter = express.Router();
freelancerRouter.use(express.json());
freelancerRouter.get(
  '/freelancers/:id',
  param('userId')
    .isString(),
  usingParam('userId', service.getUserAnimals),
);
freelancerRouter.post('/freelancers', body()
  .isArray(), validate(), usingBody(service.getAllAnimals));
