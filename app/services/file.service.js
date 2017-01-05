import Parse from 'parse';

/**
 * Uploads a file to Parse Cloud
 * @param  {File} file - a native browser file element
 * @return {Promise}
 */
export function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const parseFile = new Parse.File(file.name, file, file.type);
    parseFile.save().then(() => {
      resolve(parseFile);
    }, (error) => {
      reject(error);
    });
  });
}

export default {
  uploadFile,
};
