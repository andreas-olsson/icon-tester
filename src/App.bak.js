// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

// CSS
import './App.css';

// Images
import cat from './img/cat.jpg';
import dog from './img/dog.jpg';
import duck from './img/duck.jpg';
import horse from './img/horse.jpg';

// Variables
var buttons = [];
var animals = [
  [cat, "cat"],
  [dog, "dog"],
  [horse, "horse"],
  [duck, "duck"]
];

var folder = [];

var next_button = animals[0][1];



var App = React.createClass({

  render: function() {
    /*for (var i=0; i<animals.length; i++) {
      buttons.push(
        <button className={animals[i][1]} onClick={this.RenderMessage.bind(null, animals[i][1])}> <img src={animals[i][0]} /></button>
      );
    }
    next_button = animals[Math.floor(Math.random() * animals.length)][1];*/
    return (
      <div id="root" className="App">
      <div>
           <Dropzone onDrop={this.onDrop}>
             <div>Try dropping some files here, or click to select files to upload.</div>
           </Dropzone>
         </div>


      /*{buttons}
      <div id="message" className="Message">
      <p>Please click on the <strong>{next_button}</strong></p>
      </div>*/
      </div>
    )
  },
  onDrop: function (files) {

      for ( var i=0; i<files.length; i++ ) {
          folder.push(
            <li><img src={files[i].preview} alt={files[i].name} /></li>
          );

      }

      return (
        ReactDOM.render(
          <ul>{folder}</ul>,
          document.getElementById('message')
        )
      );


    },

  RenderMessage: function(message) {
    if (message === next_button) {

      next_button = animals[Math.floor(Math.random() * animals.length)][1];
      return (
        ReactDOM.render(
          <p className="message-success">Good job! You clicked on the <strong>{message}</strong>, now click on the <strong>{next_button}</strong></p>,
          document.getElementById('message')
        )
      );

    } else {
      return (
        ReactDOM.render(
          <p className="message-fail">Wrong button! Please click on the <strong>{next_button}</strong></p>,
          document.getElementById('message')
        )
      );
    }
  }

});

export default App;
