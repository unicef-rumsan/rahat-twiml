const somleng = require("../config/somleng.json");

const somlengConfig = {
  api: somleng.apiUrl,
  sid: somleng.auth.sid,
  token: somleng.auth.token,
};

const twilioBaseUrl = `${somlengConfig.api}/${somlengConfig.sid}/Calls`;

const somleng_auth = {
  auth: {
    username: somlengConfig.sid,
    password: somlengConfig.token,
  },
};
const TWIML = {
  AUDIO: somleng.twiml.playAudio,
  IVR: somleng.twiml.playIVR,
  WARD_ONE: somleng.twiml.wardOne,
};

module.exports = {
  twilioBaseUrl,
  somlengConfig,
  somleng_auth,
  TWIML,
};
