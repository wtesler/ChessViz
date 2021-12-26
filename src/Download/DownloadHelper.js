/**
 * Static helpers which make it easier to download files.
 */
export class DownloadHelper {

  static downloadFromUrl = async(signedUrl, filename, suffix) => {
    const link = document.createElement('a');
    link.target = '_blank';

    document.body.appendChild(link);

    let path = `${filename}`;
    if (suffix) {
      path += `.${suffix}`;
    }

    link.setAttribute('href', signedUrl);
    link.setAttribute('download', path);
    link.click();

    document.body.removeChild(link);
  };
}
