import s from './BasicLoading.module.css';
import {useEffect, useState} from "react";

const BasicLoading = props => {
  const {className, baseColor, highlightColor, size, thickness, delayMs} = props;

  const [innerStyle, setInnerStyle] = useState({});
  const [isShowing, setIsShowing] = useState(false);

  const DEFAULT_BASE_COLOR = '#1a2147';
  const DEFAULT_HIGHLIGHT_COLOR = '#f15b2a';
  const DEFAULT_SIZE = '90px';
  const DEFAULT_THICKNESS_PX = 8;
  const DEFAULT_DELAY_MS = 300;

  useEffect(() => {
    const _size = size ? size : DEFAULT_SIZE;
    const base = baseColor ? baseColor : DEFAULT_BASE_COLOR;
    const highlight = highlightColor ? highlightColor : DEFAULT_HIGHLIGHT_COLOR;
    const _thickness = thickness ? thickness : DEFAULT_THICKNESS_PX;

    const baseBorder = `${_thickness}px solid ${base}`;
    const highlightBorder = `${_thickness}px solid ${highlight}`;

    setInnerStyle({
      width: _size,
      height: _size,
      borderTop: highlightBorder,
      borderRight: baseBorder,
      borderBottom: baseBorder,
      borderLeft: baseBorder,
    });
  }, [baseColor, highlightColor, size, thickness]);

  useEffect(() => {
    let timeout;
    const _delay = delayMs ? delayMs : DEFAULT_DELAY_MS;
    if (_delay) {
      timeout = setTimeout(() => {
        setIsShowing(true);
      }, _delay);
    } else {
      setIsShowing(true);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, [delayMs]);

  if (isShowing) {
    return (
      <div className={`${s.outer} ${className ? className : ''}`}>
        <div className={s.inner} style={innerStyle}/>
      </div>
    )
  } else {
    return null;
  }
}

export default BasicLoading;
