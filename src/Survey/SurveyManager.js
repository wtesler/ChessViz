import Manager from "../Manager/Manager";

export class SurveyManager extends Manager {
  constructor(serverClient) {
    super();

    this.serverClient = serverClient;

    this.setReadFunc(() => this.serverClient.readSurvey(this.getRequests()));
  }
}
