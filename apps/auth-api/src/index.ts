import {startLambdaServer} from "@yjcapp/api-utils";
import express from "express";
import {environment} from "./environments/environment";

const router = express.Router().use(express.json())
  .post('/auth/login', (req, res) => {
    const {email, password} = req.body
    if (email === 'admin@alteam.io' && password === 'bestappoftheworld') {
      res.sendStatus(200);
    } else {
      res.sendStatus(403)
    }
  })
export const handler = startLambdaServer(router, !environment.production);

