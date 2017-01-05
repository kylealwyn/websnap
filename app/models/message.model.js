import Parse from 'parse';

class Message extends Parse.Object {
  constructor() {
    super('Message');
  }

  getPhotoUrl() {
    // Make sure image requests are served over http
    return this.get('photo')._url.replace('http://', 'https://'); // eslint-disable-line no-underscore-dangle
  }
}

// If you want objects returned from queries to use your subclass of Parse.Object,
// you will need to register the subclass, similar to what we do on other platforms.
Parse.Object.registerSubclass('Message', Message);

export default Message;
