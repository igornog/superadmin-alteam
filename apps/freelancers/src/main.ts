import {startLambdaServer} from "@yjcapp/api-utils";
import {freelancerRouter} from "./freelancerRouter";
import {environment} from "./environments/environment";

startLambdaServer(freelancerRouter, !environment.production);
