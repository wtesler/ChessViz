import {Requests} from "../Subscriptions/shared/Requests";
import FollowUpTypes from "../Choice/FollowUpTypes";
import {URLHelper} from "../URL/URLHelper";

export class UserSurveyManager {
  constructor(surveyManager, serverClient) {
    this.onSurveyUpdate = this.onSurveyUpdate.bind(this);

    this.surveyManager = surveyManager;
    this.serverClient = serverClient;

    this.requests = new Requests();

    this.progressListeners = [];

    this.surveyListener = null;

    this.progress = null;
    this.survey = null;
    this.stats = null;

    this.evaluation = false;
  }

  destruct() {
    this.requests.unmount();
    if (this.surveyListener) {
      this.surveyManager.removeListener(this.surveyListener);
    }
  }

  initWithLocation(user, location) {
    this.user = user;
    const egoUid = user.uid;
    const params = URLHelper.getSearchObject(location);
    const paramsUid = params.uid;
    const paramsSid = params.sid; // Submission Id
    this.uid = paramsUid ? paramsUid : egoUid;
    this.sid = paramsSid;
    this.evaluation = paramsUid && paramsSid;
  }

  getUid() {
    return this.uid;
  }

  getSid() {
    return this.sid;
  }

  isEvaluation() {
    return this.evaluation;
  }

  onSurveyUpdate(survey) {
    this.survey = survey;
    this.combineSurveyWithProgress();
  }

  async readUserSurveyProgress() {
    this.loadingProgress = true;
    this.progress = await this.serverClient.readUserSurveyProgress(this.uid, this.sid, this.requests);
    if (!this.progress.meta || this.isEvaluation()) {
      this.progress.meta = {};
      this.progress.meta.isReviewing = false;
    }
    this.loadingProgress = false;
    this.combineSurveyWithProgress();
  }

  combineSurveyWithProgress() {
    if (!this.progress || !this.survey) {
      return;
    }
    this.stats = this.computeStats();
    for (const listener of this.progressListeners) {
      listener(this.survey, this.progress, this.stats);
    }
  }

  addListener(listener) {
    this.progressListeners.push(listener);
    if (this.progress) {
      if (this.stats && this.survey) {
        listener(this.survey, this.progress, this.stats);
      }
    } else {
      this.surveyListener = this.onSurveyUpdate;
      this.surveyManager.addListener(this.surveyListener);
      if (!this.loadingProgress) {
        this.readUserSurveyProgress();
      }
    }
  }

  removeListener(listener) {
    this.progressListeners = this.progressListeners.filter(x => x !== listener);
  }

  computeStats() {
    const stats = {
      sections: {
      }
    };

    for (const section of this.survey) {
      const sectionId = section.id;
      const questions = section.questions;
      const numQuestions = questions.length;
      let numCompletedQuestions = 0;
      if (sectionId in this.progress) {
        const sectionProgress = this.progress[sectionId];
        for (const question of questions) {
          const questionId = question.id;
          if (questionId in sectionProgress) {
            const questionProgress = sectionProgress[questionId];
            const isQuestionComplete = this.isEvaluation()
              ? this._hasEvaluatorCompletedQuestion(question, questionProgress)
              : this._hasUserCompletedQuestion(question, questionProgress);
            if (isQuestionComplete) {
              numCompletedQuestions++;
            }
          }
        }
      }

      const ratioProgress = numCompletedQuestions / (numQuestions > 0 ? numQuestions : 1);

      stats.sections[sectionId] = {
        numQuestions: numQuestions,
        numCompletedQuestions: numCompletedQuestions,
        completedRatio: ratioProgress
      }
    }

    return stats;
  }

  _hasUserCompletedQuestion(question, questionProgress) {
    const {choiceId, longResponse, hasFile} = questionProgress;
    if (!choiceId) {
      return false; // Hasn't selected a choice yet.
    }
    const choice = this._getChoiceById(question, choiceId);
    if (!choice) {
      console.log('Choice not valid');
      return false; // Choice no longer valid.
    }
    const followUpType = choice.followUpType;
    switch (followUpType) {
      case FollowUpTypes.LONG_RESPONSE:
        if (!longResponse) {
          return false;
        }
        break;
      case FollowUpTypes.BRIEF_RESPONSE:
        break;
      case FollowUpTypes.UPLOAD_PDF:
      case FollowUpTypes.UPLOAD_SPREADSHEET:
        if (!hasFile) {
          return false;
        }
        break;
      case FollowUpTypes.MULTIPLE_CHOICE:
        break;
      default:
        break;
    }
    return true; // Question is complete.
  }

  _hasEvaluatorCompletedQuestion(question, questionProgress) {
    const {evaluation} = questionProgress;
    const userEvaluation = evaluation[this.user.uid];
    if (!userEvaluation) {
      return false;
    }
    const {status} = userEvaluation;
    return Boolean(status);
  }

  _getChoiceById(question, choiceId) {
    for (const choice of question.choices) {
      if (choice.id === choiceId) {
        return choice;
      }
    }
    return null;
  }
}
