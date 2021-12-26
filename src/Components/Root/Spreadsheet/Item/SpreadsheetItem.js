import s from './SpreadsheetItem.module.css';
import React, {useMemo} from 'react';
// import {Icon} from "react-basic-icon";

const SpreadsheetItem = ({item}) => {

  const partElements = useMemo(() => {
    const elements = [];
    for (let i = 0; i < item.length; i++) {
      const part = item[i];
      elements.push(
        <div className={s.part} key={i}>
          {part}
        </div>
      );
    }
    return elements;
  }, [item]);

  return (
    <div className={s.outer}>
      <div className={s.inner}>
        {partElements}
      </div>
    </div>
  );
}

export default SpreadsheetItem;
