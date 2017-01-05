import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

class SignInOrUp extends Component {
  componentDidMount() {
    console.log(this.state, this.props);
  }

  handleSelect() {
    // possibly change url
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">WebSnap</h1>
        <Tabs
          onSelect={this.handleSelect}
          selectedIndex={0}
          forceRenderTabPanel
        >
          <TabList>
            <Tab>Sign In</Tab>
            <Tab>Sign Up</Tab>
          </TabList>

          <TabPanel>
            <SignInForm />
          </TabPanel>
          <TabPanel>
            <SignUpForm />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(SignInOrUp);
