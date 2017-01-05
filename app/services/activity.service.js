import Parse from 'parse';
import Activity from '../models/activity.model';

/**
 * Fetches all activities the current user has received
 * @return {Promise} - resolves to array of activities
 */
export function getCurrentUserActivities() {
  return new Promise((resolve, reject) => {
    const query = new Parse.Query(Activity);

    query
      .equalTo('actee', Parse.User.current())
      .include('message')
      .include('actor')
      .descending('createdAt');

    query.find({
      success: resolve,
      error: reject,
    });
  });
}

/**
 * Creates new message activities
 * @param  {[Parse.User]} recipients - list of users to create activities for
 * @param  {Parse.Object} message    - the message that was sent
 * @return {Parse.Object} Activity
 */
export function createNewMessageActivity(recipient, message) {
  const activity = new Activity();
  // const activityACL = new Parse.ACL();
  // const currentUser = Parse.user.current();
  //
  // activityACL.setReadAccess(currentUser);
  // activityACL.setReadAccess(recipient);
  // activityACL.setWriteAccess(currentUser);
  // activityACL.setWriteAccess(recipient);

  activity.set('actor', Parse.User.current());
  activity.set('actee', recipient);
  activity.set('message', message);
  activity.set('type', 'message');
  activity.set('action', 'sent');
  activity.set('viewed', false);

  return activity;
}

export default {
  getCurrentUserActivities,
  createNewMessageActivity,
};
