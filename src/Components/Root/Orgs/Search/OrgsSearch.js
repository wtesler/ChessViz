import React from 'react';
import s from './OrgsSearch.module.css';
import {Icon} from "react-basic-icon";
import {useCallback, useMemo, useState} from "react";
import searchImage from "../../../../Images/search.svg";
import closeImage from "../../../../Images/close.svg";
import {InputDropdown} from "react-forms-input";
import sectors from "../../../../Constants/sectors";
import industries from "../../../../Constants/industries";
import companySizes from "../../../../Constants/companySizes";

const OrgsSearch = ({onSearch, onClear}) => {
  const SEARCH_TYPES = ['Name', 'Industry', 'Sector', 'Size', 'Location'];
  const PLACEHOLDERS = [
    'Search for an organization',
    'UNUSED',
    'UNUSED',
    'UNUSED',
    'Search by location',
  ]; // Should match order of types right above. Types which use dropdowns don't need placeholders.

  const [value, setValue] = useState('');
  const [type, setType] = useState(SEARCH_TYPES[0]);

  const onSearchClick = useCallback((val) => {
    val = val ? val : value;
    onSearch(val, type);
  }, [value, type, onSearch]);

  const onInputChange = useCallback(event => {
    const value = event.target.value;
    setValue(value);
  }, []);

  const onInputDropdownChange = useCallback(val => {
    if (val !== value) {
      setValue(val);
      onSearchClick(val);
    }
  }, [onSearchClick, value]);

  const onKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      onSearchClick();
    }
  }, [onSearchClick]);

  const onTypeChange = useCallback(val => {
    if (val !== type) {
      setValue('');
      setType(val);
      onClear();
    }
  }, [type, onClear]);

  const onClearClick = useCallback(() => {
    setValue('');
    onSearch(null, type);
  }, [onSearch, type]);

  const clearElement = useMemo(() => {
    if (!value) {
      return null;
    }
    return <Icon src={closeImage} className={s.clearImage} onClick={onClearClick}/>
  }, [onClearClick, value]);

  const placeHolder = useMemo(() => {
    for (let i = 0; i < SEARCH_TYPES.length; i++) {
      // Search types and placeholders are in the same order.
      if (SEARCH_TYPES[i] === type) {
        return PLACEHOLDERS[i];
      }
    }
    // eslint-disable-next-line
  }, [type]);

  const textInputElement = useMemo(() => {
    return (
      <>
        <div className={s.inputOuter}>
          <input
            className={s.input}
            placeholder={placeHolder}
            onChange={onInputChange}
            value={value}
            onKeyDown={onKeyDown}
          />
          {clearElement}
        </div>
        <div className={s.button} onClick={() => onSearchClick()}>
          <Icon src={searchImage} className={s.buttonImage}/>
        </div>
      </>
    );
  }, [onKeyDown, value, onInputChange, placeHolder, clearElement, onSearchClick]);

  const createDropdownElement = useCallback((options, key) => {
    return (
      <div className={s.inputOuter}>
        <InputDropdown
          className={s.inputDropdown}
          title={null}
          titleClass={s.inputTitleDropdown}
          valueClass={s.inputValueDropdown}
          initialValue={''}
          onChange={onInputDropdownChange}
          maxChars={128}
          options={options}
          key={key}
        />
      </div>
    );
  }, [onInputDropdownChange]);

  /**
   * Input Element is either a Text Search or a Dropdown. That is determined by the type of search.
   */
  const inputElement = useMemo(() => {
    switch (type) {
      case 'Name':
        return textInputElement;
      case 'Industry':
        return createDropdownElement(industries, 'industry');
      case 'Sector':
        return createDropdownElement(sectors, 'sector');
      case 'Size':
        return createDropdownElement(companySizes, 'size');
      case 'Location':
        return textInputElement;
      default:
        throw new Error(`Unexpected Type: ${type}`);
    }
    // eslint-disable-next-line
  }, [type, textInputElement, createDropdownElement]);

  return (
    <div className={s.outer}>
      <InputDropdown
        className={s.inputType}
        titleClass={s.inputTitleType}
        valueClass={s.inputValueType}
        initialValue={SEARCH_TYPES[0]}
        onChange={onTypeChange}
        maxChars={64}
        options={SEARCH_TYPES}
      />
      {inputElement}
    </div>
  );
}

export default OrgsSearch;
