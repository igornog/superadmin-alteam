import {startLambdaServer} from "@yjcapp/api-utils";
import {freelancerRouter} from "./freelancerRouter";
import {environment} from "./environments/environment";

export const handler = startLambdaServer(freelancerRouter, !environment.production);
