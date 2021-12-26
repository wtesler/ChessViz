import s from './SurveyEditContent.module.css';
import {withModule} from "react-hoc-di";
import {useCallback, useEffect, useMemo, useState} from "react";
import BasicLoading from "../../Loading/BasicLoading";
import {
  ADD_SECTION,
  ADDING_SURVEY_SECTION, DELETING_SURVEY_SECTION,
  FAILED_ADD_SURVEY_SECTION, FAILED_DELETE_SURVEY_SECTION,
  FAILED_LOAD_SURVEY, FAILED_REORDER_SECTION, REORDERING_SECTION
} from "../../../../Constants/i18n";
import SectionItem from "../Item/SectionItem";
import {Icon} from "react-basic-icon";
import withSubscription from "../../../../Subscriptions/shared/withSubscription";
import plusImage from "../../../../Images/plus.svg";
import SetSectionModal from "../SetSection/SetSectionModal";

const SurveyEditContent = props => {
  const {module, requests} = props;
  const {toastRelay, dialogRelay, serverClient, surveyManager} = module;
  const [survey, setSurvey] = useState(null);

  const onSurveyUpdate = useCallback((survey) => {
    setSurvey(survey);
  }, []);

  useEffect(() => {
    surveyManager.addListener(onSurveyUpdate);

    return () => {
      surveyManager.removeListener(onSurveyUpdate);
    }
  }, [surveyManager, onSurveyUpdate]);

  const readSurvey = useCallback(async () => {
    try {
      await surveyManager.readSurvey();
    } catch (e) {
      console.error(e);
      toastRelay.show(FAILED_LOAD_SURVEY, false, 5000);
    }
  }, [surveyManager, toastRelay]);

  const onNewSectionSubmit = useCallback(async (title) => {
    try {
      toastRelay.show(ADDING_SURVEY_SECTION, true);
      await serverClient.setSurveySection({title: title}, requests); // Add new section
      toastRelay.show(null);
      readSurvey();
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show(FAILED_ADD_SURVEY_SECTION, false, 5000);
    }
  }, [readSurvey, toastRelay, serverClient, requests]);

  const onRenameSectionSubmit = useCallback(async (sectionId, title) => {
    try {
      toastRelay.show('Updating Section Name', true);
      await serverClient.setSurveySection({id: sectionId, title: title}, requests); // Update section name
      toastRelay.show(null);
      readSurvey();
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show('Failed to update section name', false, 5000);
    }
  }, [readSurvey, toastRelay, serverClient, requests]);

  const onAddSectionClick = useCallback(() => {
    dialogRelay.show(
      <SetSectionModal onSubmit={onNewSectionSubmit} headerText={'Add Section'}/>,
      true,
      null
    );
  }, [dialogRelay, onNewSectionSubmit]);

  const onRenameSectionClick = useCallback((section) => {
    dialogRelay.show(
      <SetSectionModal
        onSubmit={title => onRenameSectionSubmit(section.id, title)}
        headerText={'Rename Section'}
        initialValue={section.title}
      />,
      true,
      null
    );
  }, [dialogRelay, onRenameSectionSubmit]);

  const onReorderClick = useCallback(async (evt, isUp, chosenSection) => {
    evt.stopPropagation();

    let ourIndex;
    let otherIndex;
    for (let i = 0; i < survey.length; i++) {
      const section = survey[i];
      if (section.id === chosenSection.id) {
        ourIndex = i;
      }
      otherIndex = isUp ? ourIndex - 1 : ourIndex + 1;
      if (otherIndex < 0) {
        return;
      } else if (otherIndex > survey.length - 1) {
        return;
      }
    }

    const ourSection = survey[ourIndex];
    const otherSection = survey[otherIndex];

    try {
      toastRelay.show(REORDERING_SECTION, true);
      await serverClient.swapSurveySectionIndices(ourSection, otherSection, requests);
      toastRelay.show(null);
      readSurvey();
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show(FAILED_REORDER_SECTION, false, 5000);
    }
  }, [toastRelay, requests, serverClient, survey, readSurvey]);

  const onDeleteSectionClick = useCallback(async (evt, section) => {
    evt.stopPropagation();

    const shouldDelete = window.confirm(`ARE YOU SURE YOU WANT TO REMOVE THE SECTION? YOU CANNOT UNDO THIS.`);
    if (!shouldDelete) {
      return;
    }

    try {
      toastRelay.show(DELETING_SURVEY_SECTION, true);
      await serverClient.deleteSurveySection(section, requests);
      toastRelay.show(null);
      readSurvey();
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      toastRelay.show(FAILED_DELETE_SURVEY_SECTION, false, 5000);
    }
  }, [readSurvey, toastRelay, serverClient, requests]);

  const addItemElement = useMemo(() => {
    return (
      <div className={s.addItemOuter} onClick={onAddSectionClick} key={'AddItem'}>
        <div className={s.addItemInner}>
          <div className={s.addItemTitle}>
            {ADD_SECTION}
          </div>
          <Icon className={s.addItemIcon} src={plusImage}/>
        </div>
      </div>
    );
  }, [onAddSectionClick]);

  const mainContent = useMemo(() => {
    if (!survey) {
      return <BasicLoading/>;
    }

    const itemElements = [];
    for (let i = 0; i < survey.length; i++) {
      const section = survey[i];
      itemElements.push(<SectionItem section={section} i={i} key={section.id} onReorder={onReorderClick}
                              onDelete={onDeleteSectionClick} onRename={onRenameSectionClick}/>);
    }

    itemElements.push(addItemElement);

    return (
      <div className={s.bodyOuter}>
        <div className={s.body}>
          <div className={`${s.header} ThemeHeader`}>
            {'Sections'}
          </div>
          <div className={s.itemsContainer}>
            {itemElements}
          </div>
        </div>
      </div>
    );
  }, [survey, addItemElement, onReorderClick, onDeleteSectionClick, onRenameSectionClick]);

  return (
    <>
      {mainContent}
    </>
  );
}

export default withSubscription(withModule(SurveyEditContent));
