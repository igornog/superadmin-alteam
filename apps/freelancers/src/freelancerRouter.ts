import express from "express";
import {param} from "express-validator";
import {createFreelancer, retrieve} from "./freelancerService";
import {sendPromise} from "../../../libs/api-utils/src/util";

export const freelancerRouter = express.Router();
freelancerRouter.use(express.json());
freelancerRouter.get(
  '/freelancers/:id',
  param('id')
    .isNumeric(),
  (req, res, next) => {
    sendPromise(retrieve(req.params.id), res, next)

  },
);
freelancerRouter.post('/freelancers', (req, res, next) => {
  sendPromise(createFreelancer(req.body), res, next)
})
