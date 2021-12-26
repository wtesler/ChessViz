import toResilient from "../Helpers/toResilient";
const superagent = require("superagent");

export class ImageClient {

  static async getZippedImagesAtUrl(url, requests) {
    let req = superagent
      .get(url)
      .responseType('blob')
      .set('Content-Type', 'application/octet-stream')
      .use(toResilient());
    requests.add(req);
    return req;
  }

  static async putZippedImagesAtSignedUrl(zippedBlob, signedUrl, requests) {
    let req = superagent
      .put(signedUrl)
      .set('Content-Type', 'application/octet-stream')
      .send(zippedBlob)
      .use(toResilient());
    requests.add(req);
    return req;
  }

  static async getBase64ImageAtSignedUrl(signedUrl, requests) {
    let req = superagent
      .get(signedUrl)
      .set('Content-Type', 'text/plain')
      .use(toResilient());
    requests.add(req);
    return req;
  }

  static async putBase64ImageAtSignedUrl(signedUrl, base64Image, requests) {
    let req = superagent
      .put(signedUrl)
      .set('Content-Type', 'text/plain')
      .send(base64Image)
      .use(toResilient());
    requests.add(req);
    return req;
  }

  static async getBlobImageAtSignedUrl(signedUrl, requests) {
    let req = superagent
      .get(signedUrl)
      .responseType('blob')
      .set('Content-Type', 'application/octet-stream')
      .use(toResilient());
    requests.add(req);
    return req;
  }

  static async putBlobImageAtSignedUrl(signedUrl, blobImage, requests) {
    let req = superagent
      .put(signedUrl)
      .set('Content-Type', 'application/octet-stream')
      .send(blobImage)
      .use(toResilient());
    requests.add(req);
    return req;
  }
}
