import Parse from 'parse';
import Message from '../models/message.model';
import { createNewMessageActivity } from './activity.service';

/**
 * Sends a new message
 * @param  {[Parse.User]} recipients - array of users who will receive message
 * @param  {String}       text       - content of message
 * @param  {Parse.File}   photo      - disappearing photo
 * @return {Promise}
 */
export function sendMessage(recipients, text, photo) {
  return new Promise((resolve, reject) => {
    const objectsToSave = [];
    const message = new Message();
    const messageACL = new Parse.ACL();

    message.set('text', text);
    message.set('photo', photo);
    message.set('sender', Parse.User.current());

    // create activities for all recipients and only allow these
    // users to view the message
    recipients.forEach((recipient) => {
      const activity = createNewMessageActivity(recipient, message);
      objectsToSave.push(activity);
      messageACL.setReadAccess(recipient, true);
      messageACL.setWriteAccess(recipient, false);
    });

    message.setACL(messageACL);

    objectsToSave.push(message);

    Parse.Object.saveAll(objectsToSave, {
      success: resolve,
      error: reject,
    });
  });
}

export default {
  sendMessage,
};
