import s from './Footer.module.css';
import {Icon} from "react-basic-icon";
import {useMemo} from "react";
import {ABSOLUTE_HOME} from "../../../Constants/routes";
import {withCms} from "react-cms-firestore";

const Footer = props => {
  const {cms} = props;
  const {footer, logo, legal} = cms;

  const {
    title_long,
    firstColumnLinks,
    secondColumnLinks,
    firstColumnHeader,
    secondColumnHeader,
    thirdColumnHeader,
    socialHeader,
    socialLinks,
    copyright,
  } = footer;

  const {logoSecondaryLightUrl} = logo;
  const {termsLink, privacyLink} = legal;

  const thirdColumnLinks = useMemo(() => {
    return [
      {key: 'Privacy Policy', link: privacyLink},
      {key: 'Terms of Service', link: termsLink},
    ]
  }, [privacyLink, termsLink]);

  const partSecondColumns = useMemo(() => {
    const partSecondColumnClass = s.partSecondColumn;
    const partHeaderClass = s.partHeader;
    const partSecondItemClass = s.partSecondItem;

    const toColumn = (links, header, whichColumn) => {
      const items = [];
      items.push((
        <div className={`${partHeaderClass} ThemeHeader`} key={`${header} ${whichColumn}`}>
          {header}
        </div>
      ));
      let i = 0;
      for (const link of links) {
        const title = link.key;
        const url = link.link;
        items.push((
          <div className={partSecondItemClass} key={`${i} ${whichColumn}`}>
            <a href={url}>{title}</a>
          </div>
        ));
        i++;
      }

      return (
        <div className={partSecondColumnClass} key={`Second Part Column ${whichColumn}`}>
          {items}
        </div>
      );
    }

    const columnFirst = toColumn(firstColumnLinks, firstColumnHeader, 'First');
    const columnSecond = toColumn(secondColumnLinks, secondColumnHeader, 'Second');
    const columnThird = toColumn(thirdColumnLinks, thirdColumnHeader, 'Third');

    return [columnFirst, columnSecond, columnThird];
  }, [
    firstColumnLinks,
    secondColumnLinks,
    thirdColumnLinks,
    firstColumnHeader,
    secondColumnHeader,
    thirdColumnHeader
  ]);

  const partThirdColumn = useMemo(() => {
    const partThirdColumnClass = s.partThirdColumn;
    const partHeaderClass = s.partHeader;
    const partThirdItemClass = s.partThirdItem;

    const items = [];
    items.push((
      <div className={`${partHeaderClass} ${s.partHeaderThird} ThemeHeader`} key={`PartThirdHeader`}>
        {socialHeader}
      </div>
    ));

    let i = 0;
    for (const link of socialLinks) {
      const imageUrl = link.image;
      const url = link.link;
      items.push((
        <div className={partThirdItemClass} key={i}>
          <a href={url}>
            <Icon src={imageUrl} />
          </a>
        </div>
      ));
      i++;
    }

    return (
      <div className={partThirdColumnClass}>
        {items}
      </div>
    );
  }, [socialHeader, socialLinks]);

  return (
    <div className={s.outer}>
      <div className={`${s.partFirst} ${s.part}`}>
        <div>
          <a href={ABSOLUTE_HOME}>
            <Icon className={s.partFirstImage} src={logoSecondaryLightUrl}/>
          </a>
        </div>
        <div className={s.partFirstTextContent}>
          <div>{title_long}</div>
          <div className={s.partFirstLine}/>
          <div><strong>© </strong>{copyright}</div>
        </div>
      </div>
      <div className={`${s.partSecond} ${s.part}`}>
        {partSecondColumns}
      </div>
      <div className={`${s.partThird} ${s.part}`}>
        {partThirdColumn}
      </div>
    </div>
  )
}

export default withCms(Footer, ['footer', 'logo', 'legal']);
