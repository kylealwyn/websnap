import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Dropzone from 'react-dropzone';
import UserSelect from './UserSelect';
import { uploadFile } from '../services/file.service';
import { sendMessage } from '../services/message.service';

class NewMessage extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  state = {
    text: '',
    loading: false,
  }

  /**
   * Handles HTML5 Files
   * @param  {[File]} acceptedFiles
   */
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
    // Prevent user from inputting more than 140 characters
    const { value: text } = event.target;
    if (text.length <= 140) {
      this.setState({ text });
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

    this.setState({ loading: true });

    uploadFile(file)
      .then(uploadedFile => sendMessage(recipients, text, uploadedFile))
      .then(() => this.props.router.push('/'))
      .catch((error) => {
        this.setState({
          loading: false,
          error,
        });
      });
  }

  isSubmitDisabled() {
    const { file, text, recipients } = this.state;
    return !recipients || !recipients.length || !text || !file;
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
            <div className="row collapsed-xs">
              <label htmlFor="text">Message</label>
              <div className="col-xs" />
              <span>{140 - this.state.text.length} characters left</span>
            </div>

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
                return (
                  <div>
                    <img role="presentation" src={file.preview} />
                    <button
                      className="btn btn-sm btn-danger-outline"
                      onClick={() => this.setState({ file: null })}
                    >
                      Use a different photo
                    </button>
                  </div>
                );
              }

              return (
                <div className="form-group">
                  <label htmlFor="file">Select A Photo</label>
                  <Dropzone
                    className="dropzone"
                    onDrop={this.onFileDrop}
                    accept="image/*"
                    multiple={false}
                  >
                    Click or drag your image here
                  </Dropzone>
                </div>
              );
            })()}
          </div>

          <div className="text-center">
            <input
              className="btn btn-primary"
              type="submit"
              value={this.state.loading ? 'Sending...' : 'Send Message'}
              disabled={this.isSubmitDisabled()}
            />
          </div>
        </form>
      </div>

    );
  }
}

export default withRouter(NewMessage);
