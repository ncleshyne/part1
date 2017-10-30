import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    //Initialize Data by setting up an empty state
    this.state = {
      responseData: {},
      data: []
    }
  }
   // One of React's lifecycle: componentWillMount is used to fetch data
  componentDidMount(){
    return fetch("http://api.demo.muulla.com/cms/merchant/all/active/10/1", {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NGQxOTY4MGI1MWMxNTI2MGI5NDRmZDUiLCJpc3N1ZV9kYXRlIjoiMjAxNS0wOS0wOVQwNToxMzo1My40NThaIn0.Hk2XypA_KMUnIKdSVYnwq3Rn3QyMNSQ-e80-sZsA9bY'
    }
      })//Make a request: get data from server
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState(
        { responseData: responseJson }, () => {
          this.setState(
            { data: this.state.responseData.data }
          )
        }
      )
    })//showResult Method
    .catch(error => {
      console.error(error);
    });
  }
  render() {
    const result = this.state.data.map((res, index) => {
      return (
        <div className="container">
        <div className="row show-grid">
          <div className="col-md-3 offset-md-2">
            <img
              src={ res.logo.path_to_file }
              alt={ `${ res.display_name } logo` }
            />
          </div>
          <div className="col-md-8 info">
            <h2>{ res.display_name }</h2>
            <button className="btn-info">Status: { res.status }</button>
            <p>Contact info: { res.email } | { res.phone }</p>
            <p>Address:
              { res.address.address1 }
              { res.address.address2 ? `, ${res.address.address2}` : null }
              { res.address.address3 ? `, ${res.address.address3}` : null }
            </p>
          </div>
        </div>
        <hr />
      </div>
      )
    });

    return (
      <div>
        {result}
      </div>
    );
  }
}
