import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Dropzone from 'react-dropzone';
import UserSelect from './UserSelect';
import { uploadFile } from '../services/file.service';
import { sendMessage } from '../services/message.service';
import { createNewMessageActivities } from '../services/activity.service';

class NewMessage extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  state = {
    text: '',
  }

  onFileDrop = (acceptedFiles) => {
    this.setState({
      file: acceptedFiles[0],
    });
  }

  /**
   * Handler for message inputting
   * @param  {[type]} event HTML input event
   */
  handleInput = (event) => {
    // prevent user from inputting more than 140 characters
    if (this.state.text.length < 140) {
      this.setState({ text: event.target.value });
    }
  }

  /**
   * Handles form submission by uploading photo and
   * sending message to selected recipients
   * @param  {[type]} event DOM submit event
   */
  handleSubmit = (event) => {
    event.preventDefault();

    const { file, text, recipients } = this.state;

    uploadFile(file)
      .then(uploadedFile => sendMessage(recipients, text, uploadedFile))
      .then(() => this.props.router.push('/'))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { file } = this.state;

    return (
      <div className="container new-message">
        <header>
          <h1>New Message</h1>
        </header>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="users">Recipients</label>
            <UserSelect
              id="users"
              onSelectionChange={recipients => this.setState({ recipients })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="text">Message</label>
            <textarea
              id=""
              className="form-element"
              placeholder="What do you want to say?"
              onChange={this.handleInput}
              maxLength="140"
            />
          </div>
          <div className="form-group">
            {(() => {
              if (file) {
                return <img role="presentation" src={file.preview} />;
              }

              return (
                <div className="form-group">
                  <label htmlFor="file">Select A Photo</label>
                  <Dropzone
                    onDrop={this.onFileDrop}
                    accept="image/*"
                    multiple={false}
                  >
                    Drop your image here
                  </Dropzone>
                </div>
              );
            })()}
          </div>

          <div className="text-center">
            <input className="btn btn-primary" type="submit" value="Send Message" />
          </div>
        </form>
      </div>

    );
  }
}

export default withRouter(NewMessage);
