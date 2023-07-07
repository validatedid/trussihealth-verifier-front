import { Buffer } from "buffer";

export const parseJwt = (token: string) => {
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
};
export const parseBase64 = (cert: string) => {
  var base64Payload = cert;
  var payload = Buffer.from(base64Payload, "base64");
  return payload.toString();
};

export const camelCaseToWords = function (str: any) {
  return str
    .match(/^[a-z]+|[A-Z][a-z]*/g)
    .map(function (x: any) {
      return x[0].toUpperCase() + x.substr(1).toLowerCase();
    })
    .join(" ");
};
