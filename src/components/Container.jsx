import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import axios from 'axios';


const StyledContainer = styled.div`
  padding: 20px;
  height: 100%;

  nav {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
  }
`;

export default class Container extends React.Component {
  state = {
    person: null,
    error: null,
    loading: false,
  }

  componentDidMount() {
    this.fetchPerson();
  }

  fetchPerson = () => {
    this.startSpinner();
    // fetch('http://demo6368739.mockable.io/')
    //   .then(data => data.json())
    //   .then(this.setPerson)
    //   .catch(this.setError);

    axios.get('http://demo6368739.mockable.io/')
      .then(res => this.setPerson(res.data))
      .catch(this.setError);

    // $.ajax({
    //   url: 'http://demo6368739.mockable.i/',
    //   success: this.setPerson,
    //   error: err => this.setError({ message: err.statusText }),
    // });
  }

  fakeFetchPerson = () => {
    return new Promise((resolve, reject) => {
      if (Math.floor(Math.random * 2) % 2 === 0) {
        resolve({ id: '1', name: 'Samar', age: 25 });
      } else {
        reject(new Error({ message: 'This did not fly' }));
      }
    });
  }

  setPerson = person => {
    this.stopSpinner();
    this.setState({ person });
  }

  setError = error => {
    this.stopSpinner();
    this.setState({ error });
  }

  startSpinner = () => this.setState({ loading: true })

  stopSpinner = () => this.setState({ loading: false })

  render() {
    if (this.state.loading) {
      return (
        <StyledContainer>
          Loading...
        </StyledContainer>
      );
    }

    if (this.state.error) {
      return (
        <StyledContainer>
          Argh! This failed rather miserably. {this.state.error.message}
        </StyledContainer>
      );
    }

    return (
      <StyledContainer>
        {
          this.state.person && (
            <div>
              <div>Name: {this.state.person.name}</div>
              <div>Age: {this.state.person.age}</div>
              <button onClick={this.fetchPerson}>fetch again</button>
            </div>
          )
        }
      </StyledContainer>
    );
  }
}
