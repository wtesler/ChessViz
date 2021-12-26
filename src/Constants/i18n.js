export let ACCOUNT_EXISTS = 'Profiles exists. Use an alternate login method.';
export let ADD_ANSWER = 'Add Answer';
export let ADD_QUESTION = 'Add Question';
export let ADD_SECTION = 'Add Section';
export let ADDING_SURVEY_QUESTION = 'Adding question...';
export let ADDING_SURVEY_SECTION = 'Adding survey section...';
export let ANSWERS = 'Answers';
export let DASHBOARD = 'Dashboard';
export let DATA = 'Data';
export let DELETING = 'Deleting...';
export let DELETING_SURVEY_QUESTION = 'Deleting Survey Question...';
export let DELETING_SURVEY_SECTION = 'Deleting Survey Section...';
export let DIRECTORY = 'Directory';
export let DOCUMENTS = 'Documents';
export let EMAIL_ADDRESS = 'Email Address';
export let EMAIL_SENT = "Click the link that was just sent to your email. You may close this window.";
export let FAILED_ADD_SURVEY_QUESTION = 'Failed to add survey question. Please try again.';
export let FAILED_ADD_SURVEY_SECTION = 'Failed to add survey section. Please try again.';
export let FAILED_DELETE_SURVEY_QUESTION = 'Failed to delete survey question. Please try again.';
export let FAILED_DELETE_SURVEY_SECTION = 'Failed to delete survey section. Please try again.';
export let FAILED_LOAD_PROFILE = 'Failed to load profile. Try reloading the page.';
export let FAILED_LOAD_SPREADSHEET = 'Failed to load spreadsheet. Try reloading the page.';
export let FAILED_LOAD_SPREADSHEETS = 'Failed to load spreadsheets.';
export let FAILED_LOAD_SURVEY_SECTION = 'Failed to load survey section.';
export let FAILED_LOAD_SURVEY = 'Failed to load survey. Try reloading the page.';
export let FAILED_LOAD_USERS = 'Failed to load users.';
export let FAILED_REORDER_QUESTION = 'Failed to reorder question. Please try again.';
export let FAILED_REORDER_SECTION = 'Failed to reorder section. Please try again.';
export let FAILED_SAVE_PHOTO = 'Failed to save photo. Please try again.';
export let FAILED_SAVE_PROFILE = 'Failed to save profile. Please try again.';
export let FAILED_UPDATE_SURVEY_SECTION = 'Failed to update survey section. Please try again.';
export let FAILED_UPDATE_QUESTION_PROGRESS = 'Failed to save progress. Please try again.';
export let HOME = 'Home';
export let LOADING = 'Loading...';
export let LOGIN_PROMPT = 'Select an option below to sign in or to create a new account.';
export let LOGOUT = 'Log out';
export let NO_RESULTS = 'No Results';
export let PAGE_NOT_FOUND = 'Page not found';
export let PROFILE = 'Profile';
export let PROGRESS = 'Progress';
export let REORDERING_QUESTION = 'Reordering survey question...';
export let REORDERING_SECTION = 'Reordering survey section...';
export let SAVE = 'Save';
export let SAVE_CHANGES = 'Save Changes';
export let SAVING = 'Saving...';
export let SECTION = 'Section';
export let SIGN_IN_GOOGLE = 'Sign in with Google';
export let SIGN_IN_EMAIL = 'Sign in with Email';
export let SURVEY = 'Survey';
export let TITLE = 'MIVIE';
export let TITLE_LONG = 'Minority Impact Value Indicator for Equity';
export let UPDATING_SURVEY_SECTION = 'Updating Survey Section...';
export let UPDATING_QUESTION_PROGRESS = 'Saving... ';
export let UPLOAD = 'Upload';
export let UPLOAD_IMAGE = 'Upload an Image';
export let UPLOAD_PDF = 'Upload PDF';
export let UPLOAD_SPREADSHEET = 'Upload Spreadsheet';

function localize(code) {
  if (code.startsWith('zh')) {

  } else if (code.startsWith('es')) {

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
