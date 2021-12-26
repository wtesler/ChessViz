import s from './FileExists.module.css';
import React, {useCallback, useEffect, useMemo} from 'react';
import {withModule} from "react-hoc-di";
import {Icon} from "react-basic-icon";
import downloadImage from "../../../../../../../../../Images/download.svg";
import removeImage from "../../../../../../../../../Images/close.svg";
import {DownloadHelper} from "../../../../../../../../../Download/DownloadHelper";

const FileExists = ({choice, onFileChange, suffix, image, module}) => {
  const {toastRelay, serverClient, userSurveyManager} = module;

  useEffect(() => {
    return () => {
      toastRelay.show(null);
    }
  }, [toastRelay]);

  const onDownloadClick = useCallback(async() => {
    const filename = choice.filename;
    try {
      toastRelay.show('Downloading...', true);
      const uid = userSurveyManager.getUid();
      const signedUrl = await serverClient.readFile('files', filename, suffix, uid);
      await DownloadHelper.downloadFromUrl(signedUrl, filename, suffix);
      toastRelay.show(null);
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show('Failed to download file. Please try again.', false, 5000);
    }
  }, [choice, serverClient, toastRelay, suffix, userSurveyManager]);

  const onDeleteClick = useCallback(async() => {
    const shouldDelete = window.confirm(`Are you sure you want to delete the file? This cannot be undone.`);
    if (!shouldDelete) {
      return;
    }

    const filename = choice.filename;
    try {
      toastRelay.show('Deleting...', true);
      await serverClient.deleteFile('files', filename, suffix);
      toastRelay.show(null);
      onFileChange(false);
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show('Failed to delete file. Please try again.', false, 5000);
    }
  }, [toastRelay, serverClient, onFileChange, choice, suffix]);

  const deleteElement = useMemo(() => {
    if (userSurveyManager.isEvaluation()) {
      return null;
    }
    return (
      <Icon src={removeImage} className={`${s.remove} ${s.button}`} onClick={onDeleteClick} />
    );
  }, [userSurveyManager, onDeleteClick]);

  return (
    <div className={s.outer}>
      <Icon src={image} className={s.image} />
      <div className={s.title}>
        {`${choice.filename}`}
      </div>
      <Icon src={downloadImage} className={`${s.download} ${s.button}`} onClick={onDownloadClick} />
      {deleteElement}
    </div>
  );
}

export default withModule(FileExists);
