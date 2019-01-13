require('dotenv').config();
const path = require('path');

module.exports = function emailService(sendAPI){
  return {
    sendPDF(data, cb) {
      // TODO: Wrap in a promise & properly handle error
      sendAPI.messages().send(data, function(error, body){
        if(error){
          throw error;
        }
        
        cb(body);
      })
    },

    createKindleData(user, title){
      let { firstName, lastName, email, kindleEmail } = user;
      let filepath = path.join(__dirname, `../results/${title}.pdf`);
      let fromLine = `${firstName} ${lastName} <${email}>`;
    
      return {
        from: fromLine,
        to: kindleEmail,
        subject: "Convert",
        text: "Sending article to Kindle",
        attachment: filepath
      };
    }
  };
};
