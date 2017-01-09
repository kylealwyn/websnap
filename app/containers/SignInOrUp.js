import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

Tabs.setUseDefaultStyles(false);

class SignInOrUp extends Component {
  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="text-center">
            <h1>WebSnap</h1>
          </div>

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
      </div>
    );
  }
}

export default withRouter(SignInOrUp);
