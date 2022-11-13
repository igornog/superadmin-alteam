import {startLambdaServer} from '@yjcapp/api-utils';
import {environment} from './environments/environment';
import express from "express";

export const handler = startLambdaServer(
  express.Router(),
  !environment.production
);
