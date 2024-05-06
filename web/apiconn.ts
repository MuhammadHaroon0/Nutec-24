import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "~/session";

// const apiUrl = "http://172.26.3.12:5000";
// const apiUrl = "http://192.168.43.188:5000";
const apiUrl = process.env.VITE_API_URL;

export const apiConn = axios.create({
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: apiUrl + "/api/v1",

  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0"
  },

  // `responseType` indicates the type of data that the server will respond with
  responseType: "json",

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 0,

  maxContentLength: 5000,

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 0 // default
});

export async function callApi(req: Request, config: AxiosRequestConfig<any>) {
  let session = await getSession(req);

  let token = session.get('token');

  return await apiConn.request({
    ...config,
    headers: {
      'x-auth-token': token,
      ...config.headers
    }
  });
}
