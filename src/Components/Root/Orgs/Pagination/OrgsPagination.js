import s from './OrgsPagination.module.css';
import {withModule} from "react-hoc-di";
import {useCallback, useMemo} from "react";
import pagination_arrow from "../../../../Images/pagination_arrow.svg";
import {Icon} from "react-basic-icon";

const OrgsPagination = props => {
  const {profiles, onPaginate, hasCleared} = props;

  // const START = 'start';
  // const MIDDLE = 'middle';
  // const END = 'end';

  // const [lastPaginateDirection, setLastPaginateDirection] = useState(undefined); // true or false (forward or backward)
  // const [position, setPosition] = useState(START);

  const onPaginateClick = useCallback((isForward) => {
    let pageToken;
    if (profiles.length === 0) {
      pageToken = 1;  // Special signal to backend to indicate that we want to wrap around.
    } else {
      pageToken = isForward ? profiles[profiles.length - 1].data : profiles[0].data; // Page Token is profile data.
    }
    // setLastPaginateDirection(isForward);
    onPaginate(pageToken, isForward);
  }, [profiles, onPaginate]);

  // useEffect(() => {
  //   if (!profiles) {
  //     return;
  //   }
  //   if (lastPaginateDirection === undefined) {
  //     return;
  //   }
  //   if (profiles.length === 0) {
  //     if (lastPaginateDirection === true) { // Forward
  //       setPosition(END);
  //     } else if (lastPaginateDirection === false) { // Backward
  //       setPosition(START);
  //     }
  //   } else {
  //     setPosition(MIDDLE);
  //   }
  // }, [profiles, lastPaginateDirection]);

  const content = useMemo(() => {
    if (!profiles || hasCleared) {
      return null;
    }

    // let backwardElement = null;
    // if (position === MIDDLE || position === END) {
    //   backwardElement = <div onClick={() => onPaginateClick(false)}>Left</div>;
    // }
    //
    // let forwardElement = null;
    // if (position === START || position === MIDDLE) {
    //   forwardElement = <div onClick={() => onPaginateClick(true)}>Right</div>;
    // }

    return (
      <div className={s.outer}>
        <Icon className={`${s.image} ${s.imageBackward}`} src={pagination_arrow} onClick={() => onPaginateClick(false)}>Left</Icon>
        <Icon className={`${s.image} ${s.imageForward}`} src={pagination_arrow} onClick={() => onPaginateClick(true)}>Right</Icon>
      </div>
    );
  }, [onPaginateClick, profiles, hasCleared]);

  return (
    <>
      {content}
    </>
  );
}

export default withModule(OrgsPagination);
