import path from 'path'
import http from "http";
import https from "https";
// httpGet
const httpGet = (url) => {
  return new Promise((resolve, reject) => {
    // https and http
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, (res) => {
      const {statusCode} = res;

      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed. Status Code: ' + statusCode);
      }
      if (error) {
        res.resume();
        return reject(error);
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          resolve(rawData);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
}

const camelCase = (str) =>
  str
    .replace(/[-_/]([a-z0-9])/gi, (_, c) => c.toUpperCase()) // also capture digits
    .replace(/[-_/]/g, ""); // remove any leftover separators
const trimPrefix = (str, prefix) => str?.startsWith(prefix) ? str.slice(prefix.length) : str

export   {
  httpGet,
  camelCase,
  trimPrefix,
}
