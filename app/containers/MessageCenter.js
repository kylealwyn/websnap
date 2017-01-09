import React from 'react';
import { Link } from 'react-router';
import MessageList from '../components/MessageList';

const Home = () => (
  <section className="container">
    <header className="m-b-lg">
      <div className="row align-center-xs collapsed-xs m-b-md">
        <h1 className="m-0">Message Center</h1>
        <div className="col-xs" />
        <Link to="messages/new" className="btn btn-primary">
          Send A Message
        </Link>
      </div>
    </header>

    <MessageList />
  </section>
);

export default Home;
