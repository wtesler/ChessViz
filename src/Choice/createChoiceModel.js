import FollowUpTypes from "./FollowUpTypes";

const generateId = () => {
  const {customAlphabet} = require('nanoid');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const nanoid = customAlphabet(alphabet, 20);
  return nanoid();
}

const create = () => {
  return {
    id: generateId(),
    text: '',
    followUpType: FollowUpTypes.NONE,
    followUpPrompt: '',
    filename: '',
    columns: [],
    selections: [],
    selectionOther: '',
    points: 1,
  }
};

export default create;
