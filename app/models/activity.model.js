import Parse from 'parse';

class Activity extends Parse.Object {
  constructor() {
    super('Activity');
  }
}

// If you want objects returned from queries to use your subclass of Parse.Object,
// you will need to register the subclass, similar to what we do on other platforms.
Parse.Object.registerSubclass('Activity', Activity);

export default Activity;
