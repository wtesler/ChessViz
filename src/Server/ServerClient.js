import config from './Config/CloudConfig.js';
import toResilient from './Helpers/toResilient';
import toSuccessResponse from './Helpers/toSuccessResponse';
import errorThrowsBody from './Helpers/errorThrowsBody';
import {CloudHelper} from './Helpers/CloudHelper';
import toAuthorized from './Helpers/toAuthorized';
import {LoginManager} from 'firebase-login-manager';

const request = require('superagent');

export default class ServerClient {
  HOST = config.main;
  READ_PROFILE = 'readProfileAuthorized';
  READ_PROFILE_EVALUATION = 'readProfileForEvaluationAuthorized';
  READ_PROFILES = 'readProfilesOpen';
  UPDATE_PROFILE = 'updateProfileAuthorized';
  UPDATE_PROFILE_IMAGE = 'updateProfileImageAuthorized';
  READ_USERS = 'readUsersAuthorized';
  READ_USERS_WITH_PROFILES = 'readUsersWithProfilesAuthorized';
  SET_SURVEY_SECTION = 'setSurveySectionAuthorized';
  SET_SURVEY_META_SECTIONS = 'setSurveyMetaSectionsAuthorized';
  READ_SURVEY = 'readSurveyOpen';
  READ_SURVEY_SECTION = 'readSurveySectionOpen';
  DELETE_SURVEY_SECTION = 'deleteSurveySectionAuthorized';
  SWAP_SURVEY_SECTION_INDICES = 'swapSurveySectionIndicesAuthorized';
  READ_USER_SURVEY_PROGRESS = 'readUserSurveyProgressAuthorized';
  UPDATE_USER_QUESTION_PROGRESS = 'updateUserQuestionProgressAuthorized';
  READ_FILE = 'readFileAuthorized';
  UPDATE_FILE = 'updateFileAuthorized';
  DELETE_FILE = 'deleteFileAuthorized';
  READ_FILES = 'readFilesAuthorized';
  UPDATE_EVALUATOR_QUESTION_PROGRESS = 'updateEvaluatorQuestionProgressAuthorized';
  READ_EVALUATORS = 'readEvaluatorsAuthorized';
  READ_LIASONS = 'readLiasonsAuthorized';
  ADD_EVALUATOR = 'addEvaluatorAuthorized';
  ADD_LIASON = 'addLiasonAuthorized';
  DELETE_EVALUATOR = 'deleteEvaluatorAuthorized';
  DELETE_LIASON = 'deleteLiasonAuthorized';
  CREATE_SUBMISSION = 'createSubmissionAuthorized';
  CREATE_SUBMISSION_EVALUATION = 'createSubmissionEvaluationAuthorized';
  READ_PLAN = 'readPlanAuthorized';
  UPDATE_PLAN = 'updatePlanAuthorized';
  RESET_SUBMISSION_STATUS = 'resetSubmissionStatusAuthorized';
  ASSIGN_LIASON = 'assignLiasonAuthorized';
  REMOVE_LIASON = 'removeLiasonAuthorized';

  constructor() {
    this.loginManager = new LoginManager(false, null);
  }

  destruct() {
    this.loginManager.destruct();
  }

  async readProfile(uid=null, requests) {
    const data = {
      uid: uid
    };
    const serverResponse = await this._hitEndpoint(this.READ_PROFILE, 'get', data, true, null, requests);
    return serverResponse.profile;
  }

  async readProfileForEvaluation(uid, requests) {
    const data = {
      uid: uid
    };
    const serverResponse = await this._hitEndpoint(this.READ_PROFILE_EVALUATION, 'get', data, true, null, requests);
    return serverResponse.profile;
  }

  async updateProfile(profile, requests) {
    const data = {
      profile: profile
    };
    await this._hitEndpoint(this.UPDATE_PROFILE, 'post', data, true, null, requests);
  }

  async updateProfileImage(base64Image, requests) {
    const data = {
      image: base64Image
    };
    await this._hitEndpoint(this.UPDATE_PROFILE_IMAGE, 'post', data, true, null, requests);
  }

  async readUsers(pageToken=undefined, email=null, claim=null, count=40, requests) {
    const query = {
      pageToken: pageToken,
      email: email,
      claim: claim,
      count: count,
    }
    const serverResponse = await this._hitEndpoint(this.READ_USERS, 'get', query, true, null, requests);
    return serverResponse;
  }

  async readUsersWithProfiles(pageToken=undefined, email=null, claim=null, count=40, requests) {
    const query = {
      pageToken: pageToken,
      email: email,
      claim: claim,
      count: count,
    }
    const serverResponse = await this._hitEndpoint(this.READ_USERS_WITH_PROFILES, 'get', query, true, null, requests);
    return serverResponse;
  }

  async readProfiles(filter=undefined, type=undefined, pageToken=undefined, pageForwards=true, count=2, requests) {
    const body = {
      filter: filter,
      type: type,
      pageToken: pageToken,
      pageForwards: pageForwards,
      count: count,
    }
    const serverResponse = await this._hitEndpoint(this.READ_PROFILES, 'post', body, true, null, requests);
    const profiles = serverResponse.profiles;
    return profiles;
  }

  async setSurveySection(section, requests) {
    const body = {
      section: section
    };
    const serverResponse = await this._hitEndpoint(this.SET_SURVEY_SECTION, 'post', body, true, null, requests);
    return serverResponse.id;
  }

  async readSurvey(requests) {
    const serverResponse = await this._hitEndpoint(this.READ_SURVEY, 'get', {}, false, null, requests);
    return serverResponse.survey;
  }

  async readSurveySection(id, requests) {
    const query = {
      id: id
    }
    const serverResponse = await this._hitEndpoint(this.READ_SURVEY_SECTION, 'get', query, false, null, requests);
    return serverResponse.section;
  }

  async deleteSurveySection(section, requests) {
    const body = {
      section: section
    };
    await this._hitEndpoint(this.DELETE_SURVEY_SECTION, 'post', body, true, null, requests);
  }

  async swapSurveySectionIndices(sectionA, sectionB, requests) {
    const body = {
      sectionA: sectionA,
      sectionB: sectionB,
    };
    await this._hitEndpoint(this.SWAP_SURVEY_SECTION_INDICES, 'post', body, true, null, requests);
  }

  async readUserSurveyProgress(uid, sid, requests) {
    const data = {
      uid: uid,
      sid: sid,
    };
    const serverResponse = await this._hitEndpoint(this.READ_USER_SURVEY_PROGRESS, 'get', data, true, null, requests);
    return serverResponse.progress;
  }

  async updateUserQuestionProgress(sectionId, questionId, questionProgress, requests) {
    const data = {
      sectionId: sectionId,
      questionId: questionId,
      questionProgress: questionProgress,
    };
    await this._hitEndpoint(this.UPDATE_USER_QUESTION_PROGRESS, 'post', data, true, null, requests);
  }

  async readFile(folder, filename, suffix, uid, requests) {
    const data = {
      folder: folder,
      filename: filename,
      suffix: suffix,
      uid: uid
    }
    const serverResponse = await this._hitEndpoint(this.READ_FILE, 'get', data, true, null, requests);
    return serverResponse.signedUrl;
  }

  async updateFile(folder, file, filename, suffix, requests) {
    const formData = new FormData();
    formData.append('folder', folder);
    formData.append('file', file);
    formData.append('name', filename);
    formData.append('suffix', suffix);
    const serverResponse = await this._hitEndpoint(this.UPDATE_FILE, 'post', formData, true, null, requests);
    return serverResponse;
  }

  async deleteFile(folder, filename, suffix, requests) {
    const data = {
      folder: folder,
      filename: filename,
      suffix: suffix,
    };
    await this._hitEndpoint(this.DELETE_FILE, 'post', data, true, null, requests);
  }

  async readFiles(uid, requests) {
    const data = {
      uid: uid
    }
    const serverResponse = await this._hitEndpoint(this.READ_FILES, 'get', data, true, null, requests);
    return serverResponse.shortNames;
  }

  async updateEvaluatorQuestionProgress(sid, sectionId, questionId, status, note, requests) {
    const data = {
      sid: sid,
      sectionId: sectionId,
      questionId: questionId,
      status: status,
      note: note,
    };
    await this._hitEndpoint(this.UPDATE_EVALUATOR_QUESTION_PROGRESS, 'post', data, true, null, requests);
  }

  async readEvaluators(requests) {
    const serverResponse = await this._hitEndpoint(this.READ_EVALUATORS, 'get', {}, true, null, requests);
    return serverResponse.evaluators;
  }

  async readLiasons(requests) {
    const serverResponse = await this._hitEndpoint(this.READ_LIASONS, 'get', {}, true, null, requests);
    return serverResponse.liasons;
  }

  async addEvaluator(email, requests) {
    const data = {
      email: email,
    };
    await this._hitEndpoint(this.ADD_EVALUATOR, 'post', data, true, null, requests);
  }

  async addLiason(email, requests) {
    const data = {
      email: email,
    };
    await this._hitEndpoint(this.ADD_LIASON, 'post', data, true, null, requests);
  }

  async deleteEvaluator(uid, requests) {
    const data = {
      uid: uid,
    };
    await this._hitEndpoint(this.DELETE_EVALUATOR, 'post', data, true, null, requests);
  }

  async deleteLiason(uid, requests) {
    const data = {
      uid: uid,
    };
    await this._hitEndpoint(this.DELETE_LIASON, 'post', data, true, null, requests);
  }

  async createSubmission(requests) {
    await this._hitEndpoint(this.CREATE_SUBMISSION, 'post', {}, true, null, requests);
  }

  async createSubmissionEvaluation(uid, sid, requests) {
    const data = {
      uid: uid,
      sid: sid
    }
    await this._hitEndpoint(this.CREATE_SUBMISSION_EVALUATION, 'post', data, true, null, requests);
  }

  async readPlan(uid, requests) {
    const data = {
      uid: uid
    }
    const serverResponse = await this._hitEndpoint(this.READ_PLAN, 'get', data, true, null, requests);
    return serverResponse.plan;
  }

  async updatePlan(uid, plan, requests) {
    const data = {
      uid: uid,
      plan: plan,
    }
    await this._hitEndpoint(this.UPDATE_PLAN, 'post', data, true, null, requests);
  }

  async resetSubmissionStatus(uid, requests) {
    const data = {
      uid: uid
    }
    await this._hitEndpoint(this.RESET_SUBMISSION_STATUS, 'post', data, true, null, requests);
  }

  async assignLiason(uid, liasonId, requests) {
    const data = {
      uid: uid,
      liasonId: liasonId,
    }
    await this._hitEndpoint(this.ASSIGN_LIASON, 'post', data, true, null, requests);
  }

  async removeLiason(uid, requests) {
    const data = {
      uid: uid
    }
    await this._hitEndpoint(this.REMOVE_LIASON, 'post', data, true, null, requests);
  }

  async _hitEndpoint(endpoint, type='get', data={}, isAuthorized=false, contentType=null, requests=null) {
    const dataAction = type === 'get' ? 'query' : 'send';

    let req = request
      [type](this.HOST + endpoint)
      [dataAction](data);

    if (contentType) {
      req = req.set('Content-Type', contentType);
    } else {
      req = req.set('Content-Type', 'application/json');
    }

    return await this._finalizeRequest(req, endpoint, isAuthorized, requests);
  }

  async _finalizeRequest(req, endpoint, isAuthorized, requests) {
    req = req.use(toResilient());

    if (isAuthorized) {
      const idToken = await CloudHelper.getIdToken(this.loginManager);
      req = req.use(toAuthorized(idToken));
    }

    if (requests) {
      requests.add(req);
    }

    try {
      const networkResponse = await req;
      const serverResponse = toSuccessResponse(networkResponse);
      return serverResponse;
    } catch (e) {
      errorThrowsBody(endpoint, e);
    }
  }
}
