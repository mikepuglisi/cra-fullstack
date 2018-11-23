import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { Query } from 'react-apollo'
import  { gql } from 'apollo-boost'

import logo from './logo.svg';

import './App.css';

const client = new ApolloClient({ uri: '/graphql' })

const SCHEMA_QUERY = gql`{
  __schema {
    types {
      name
    }
  }
}`

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <ApolloProvider client={client}>
      {console.log('client', client)}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{this.state.response}</h1>
          <Query query={SCHEMA_QUERY}>
        {({ data, loading, error, refetch }) => {
          if (loading) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading ...</div>
              </div>
            )
          }

          if (error) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>An unexpected error getting graphql data.</div>
              </div>
            )
          }

          return (
            <>
              <h1>GraphQL Server reports {data.__schema.types.length} data types!</h1>
            </>
          )
        }}
      </Query>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;