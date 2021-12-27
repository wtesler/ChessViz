export let HELLO_MESSAGE = 'Hello!';
export let HOME = 'Home';
export let PAGE_NOT_FOUND = 'Page not found';

function localize(code) {
  if (code.startsWith('zh')) { // Chinese

  } else if (code.startsWith('es')) { // Spanish

  }
}

class i18n {
  constructor() {
    try {
      const languageCode = window.navigator.language;
      localize(languageCode);
    } catch (e) {
      console.warn('Localization Failed');
      console.warn(e);
    }
  }
}

const i18nInstance = new i18n();

export default i18nInstance;
