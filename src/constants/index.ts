import * as Production from "./apiEndpoints/production";
import * as Staging from "./apiEndpoints/staging";
import { isProduction } from "./config";
export const USERSERVICE_API_URL = isProduction
  ? Production.USERSERVICE_API_URL
  : Staging.USERSERVICE_API_URL;

export const react_query_stale_time = 60 * 1000 * 50; //50 min
