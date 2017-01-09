import React, { Component, PropTypes } from 'react';
import { timeSince } from '../lib/date';

class MessageRow extends Component {
  static propTypes = {
    sender: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    viewed: PropTypes.bool,
    onViewed: PropTypes.func.isRequired,
  }

  state = {
    viewing: false,
  }

  componentDidMount() {
    // Preload our image
    const { message } = this.props;
    const img = new Image();
    img.src = message.getPhotoUrl();
  }

  componentWillUnmount() {
    if (this.viewTimer) {
      clearInterval(this.viewTimer);
    }
  }

  stopViewing() {
    clearInterval(this.viewTimer);
    this.setState({
      viewing: false,
    });
  }

  startViewing() {
    const SECONDS_TO_VIEW = 15; // seconds to view our photos

    // Immediately mark as viewed
    this.props.onViewed();

    // Tell component we're viewing the photo
    this.setState({
      viewing: true,
      secondsLeft: SECONDS_TO_VIEW - 1, // detract 1 due to interval not running immediately
    });

    // Countdown timer
    this.viewTimer = setInterval(() => {
      const { secondsLeft } = this.state;

      if (secondsLeft === 0) {
        this.stopViewing();
        return;
      }

      this.setState({ secondsLeft: this.state.secondsLeft - 1 });
    }, 1000);
  }

  viewPhoto = () => {
    if (this.props.viewed) {
      return;
    }

    this.setState({ viewing: true });
    this.startViewing();
  }

  renderClickToView() {
    if (this.props.viewed || this.state.viewing) {
      return null;
    }

    return <button className="btn btn-sm btn-mediumgray-outline" onClick={this.viewPhoto}>View Photo</button>;
  }

  renderPhoto(message) {
    if (!this.state.viewing) {
      return null;
    }

    return (
      <div className="message-photo">
        <img src={message.getPhotoUrl()} role="presentation" />
      </div>
    );
  }

  render() {
    const { sender, message, viewed } = this.props;
    const messageClasses = `message ${viewed ? 'message-viewed' : 'message-unviewed'}`;

    return (
      <article className={messageClasses}>
        <header className="row collapsed-xs">
          <h3 className="message-username">{sender.getUsername()}</h3>
          <div className="col-xs" />
          <time className="message-timestamp">{timeSince(message.get('createdAt'))}</time>
        </header>

        <div className="message-body">
          {message.get('text')}
        </div>

        {this.renderClickToView()}

        {this.renderPhoto(message)}

      </article>
    );
  }
}

export default MessageRow;
