/**
 * Compresses a png/jpeg image to the given constraints.
 */
export default class ImageCompressor {
  static compressObjectUrl(objectUrl, maxWidth, maxHeight, quality, forceCompress, onFinished, onError) {
    ImageCompressor._compress(
      objectUrl,
      null,
      999999999,
      maxWidth,
      maxHeight,
      quality,
      forceCompress,
      onFinished,
      onError
    );
  }

  static compressFile(imageFile, maxWidth, maxHeight, quality, forceCompress, onFinished, onError) {
    const fileSizeBytes = imageFile.size;

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onload = event => {
      ImageCompressor._compress(
        event.target.result,
        imageFile,
        fileSizeBytes,
        maxWidth,
        maxHeight,
        quality,
        forceCompress,
        onFinished,
        onError
      );
    };

    reader.onerror = error => console.error(error);
  }

  static _compress(
    src,
    imageFile,
    fileSizeBytes,
    maxWidth,
    maxHeight,
    quality,
    forceCompress,
    onFinished,
    onError
  ) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;

      let width = naturalWidth;
      let height = naturalHeight;

      if (width > maxWidth) {
        const adjustRatio = maxWidth / width;
        width *= adjustRatio;
        height *= adjustRatio;
      }

      if (height > maxHeight) {
        const adjustRatio = maxHeight / height;
        width *= adjustRatio;
        height *= adjustRatio;
      }

      width = Math.floor(width);
      height = Math.floor(height);

      const element = document.createElement('canvas');
      const canvas = element.getContext('2d');

      element.width = width;
      element.height = height;

      canvas.fillStyle = 'white';
      canvas.fillRect(0, 0, width, height);

      // canvas.globalCompositeOperation = 'destination-in';

      canvas.drawImage(img, 0, 0, width, height);

      canvas.canvas.toBlob(
        blob => {
          let objectUrl = null;
          if (blob.size < fileSizeBytes || forceCompress) {
            objectUrl = URL.createObjectURL(blob);
          } else {
            // We didn't succeed in shrinking image, so just use the original image.
            objectUrl = URL.createObjectURL(imageFile);
          }
          const dataUrl = element.toDataURL('image/jpeg');
          onFinished(objectUrl, dataUrl);
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = e => {
      console.error(e);
      if (onError) {
        onError(e);
      }
    };
  }

  static async resize(src, multiplier, mimeType = 'image/jpeg') {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => {
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;

        let width = Math.floor(naturalWidth * multiplier);
        let height = Math.floor(naturalHeight * multiplier);

        const element = document.createElement('canvas');
        const canvas = element.getContext('2d');

        element.width = width;
        element.height = height;

        canvas.drawImage(img, 0, 0, width, height);

        const dataUrl = element.toDataURL(mimeType);

        resolve(dataUrl);
      };

      img.onerror = e => {
        console.error(e);
        reject(e);
      };
    });
  }
}
