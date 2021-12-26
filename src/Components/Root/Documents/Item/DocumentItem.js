import s from './DocumentItem.module.css';
import React, {useCallback, useMemo} from 'react';
import spreadsheetImage from '../../../../Images/spreadsheet.svg';
import pdfImage from '../../../../Images/pdf.svg';
import downloadImage from '../../../../Images/download.svg';
import {Icon} from "react-basic-icon";
import {withModule} from "react-hoc-di";
import {DownloadHelper} from "../../../../Download/DownloadHelper";

const DocumentItem = ({name, module}) => {

  const {serverClient, toastRelay} = module;

  const iconElement = useMemo(() => {
    const image = name.endsWith('.xlsx') ? spreadsheetImage : pdfImage;
    return (<Icon className={s.image} src={image}/>);
  }, [name]);

  const titleElement = useMemo(() => {
    return (
      <div className={s.titleOuter}>
        {name}
      </div>
    )
  }, [name]);

  const onDownloadClick = useCallback(async() => {
    try {
      toastRelay.show('Downloading...', true);
      const signedUrl = await serverClient.readFile('files', name, null, null);
      await DownloadHelper.downloadFromUrl(signedUrl, name, null);
      toastRelay.show(null);
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show('Failed to download file. Please try again.', false, 5000);
    }
  }, [name, serverClient, toastRelay]);

  const downloadElement = useMemo(() => {
    return (
      <Icon className={s.downloadButton} src={downloadImage} onClick={onDownloadClick}/>
    );
  }, [onDownloadClick]);

  // const onClick = useCallback(() => {
  //   history.push(`${ROUTE_SPREADSHEET}/${name}`);
  // }, [history, name]);

  return (
    <div className={s.outer}>
      <div className={s.inner}>
        {iconElement}
        {titleElement}
        {downloadElement}
      </div>
    </div>
  );
}

export default withModule(DocumentItem);
