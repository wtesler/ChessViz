import s from './ProfileInputImage.module.css';
import {useCallback, useEffect, useRef, useState} from 'react';
import ImageCompressor from '../../../../../Compression/ImageCompressor';
import {FAILED_SAVE_PHOTO, SAVING, UPLOAD_IMAGE} from '../../../../../Constants/i18n';
import withSubscription from '../../../../../Subscriptions/shared/withSubscription';
import {withModule} from "react-hoc-di";
import {SignedIcon} from "react-basic-icon";

const ProfileInputImage = props => {
  const {module, requests, profile} = props;
  const {toastRelay, serverClient} = module;

  const [resetInputFlag, setResetInputFlag] = useState(Number.MIN_SAFE_INTEGER);
  const [signedUrl, setSignedUrl] = useState(null);
  const [src, setSrc] = useState(null); // Used when setting image locally.

  const inputRef = useRef();

  useEffect(() => {
    setSignedUrl(profile.imageSignedUrl);
  }, [profile])

  const onCompressionFinished = useCallback(async (objectUrl, dataUrl) => {
    const base64Image = dataUrl.replace(/^data:image\/(png|jpg);base64,/, '');
    toastRelay.show(SAVING, true);
    try {
      await serverClient.updateProfileImage(base64Image, requests);
      setSrc(base64Image);
      toastRelay.show(null);
    } catch (e) {
      toastRelay.show(FAILED_SAVE_PHOTO, false, 4000);
    }
  }, [toastRelay, requests, serverClient]);

  const onImageInputChange = useCallback((event) => {
    const files = event.target.files;

    if (files.length === 0) {
      return;
    }

    const file = files[0];

    ImageCompressor.compressFile(file, 500, 500, 0.8, false, onCompressionFinished);

    setResetInputFlag(resetInputFlag + 1);
  }, [resetInputFlag, onCompressionFinished]);

  const onUploadClick = useCallback(() => {
    inputRef.current.click();
  }, []);

  return (
    <div className={s.outer}>
      <div className={s.title}>
        {'Company Photo'}
      </div>
      <SignedIcon className={s.icon} signedUrl={signedUrl} src={src}/>
      <div className={s.button} onClick={onUploadClick}>
        {UPLOAD_IMAGE}
      </div>
      <input
        ref={inputRef}
        style={{display: 'none'}}
        type='file'
        multiple={false}
        accept='image/png, image/jpeg'
        onChange={onImageInputChange}
        key={resetInputFlag}
      />
    </div>
  );
}

export default withSubscription(withModule(ProfileInputImage));
