// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

// CSS
import './css/style.css';

// Variables
var folder = [];
var question = [];
var next_button;
var q_time;
var ans_time;

var answers = {}

var App = React.createClass({
  render: function() {
    return (
      <div id="appcontainer" className="App">
        <div id="dz" className="dropzone-container">
           <Dropzone className="dropzone-button" activeClassName="dropzone-button-active" onDrop={this.onDrop}></Dropzone>
        </div>
        <div id="folder">
        </div>
        <div id="message">
        </div>
        <div id="testview">
        </div>
      </div>
    )
  },
  onDrop: function (files) {

      for ( var i=0; i<files.length; i++ ) {
          var filename = files[i].name.substring(0, files[i].name.length - 4);


          if (files[i].type === "image/svg+xml") {
            var img_height = 40;
            var img_width = 40;
          } else {
            var img_height = 'auto';
            var img_width = 'auto';
          }


          folder.push(
            <li className="thumbnail" key={i}>
              <button onClick={this.RenderMessage.bind(null, filename)}>
                <img src={files[i].preview} alt={filename} width={img_width} height={img_height} />
              </button>
            </li>
          );
          question.push(
            filename
          );

          //Add array
          answers[filename] = [];
      }
      return (
        ReactDOM.render(
          <div>
            <ul>{folder}</ul>
            <div>
              <button className="deploy-button" onClick={this.RenderTestView}>Start test</button>
            </div>
          </div>,
          document.getElementById('folder'),

        ),
        document.getElementById('dz').className += ' used'
      );
    },
    RenderMessage: function(message) {



      // Correct answer
      if (message === next_button) {

        // Save answer time
        ans_time = new Date().getTime();

        // current_answer[message] = (ans_time - q_time)
        // answers.push(ans_time - q_time);

        answers[message].push(ans_time - q_time)

        console.log(answers);

        // Start new question timer
        q_time = new Date().getTime();

        // Randomize next button
        next_button = question[Math.floor(Math.random() * question.length)];

        return (
          ReactDOM.render(

            <p className="message-success">Good job! You clicked on the <strong>{message}</strong>, now click on the <strong>{next_button}</strong></p>,
            document.getElementById('message')
          )
        );

      // Wrong answer
      } else {
        return (
          ReactDOM.render(
            <p className="message-fail">Wrong button! Please click on the <strong>{next_button}</strong></p>,
            document.getElementById('message')
          )
        );
      }
    },
    RenderTestView: function() {


      q_time = new Date().getTime();


      return (
        next_button = question[0],
        // ReactDOM.render(
        //   <div>
        //     <h1>Test view</h1>
        //     <ul>{folder}</ul>
        //   </div>,
        //   document.getElementById('testview')
        // ),
        ReactDOM.render(
          <p>Please click on {next_button}</p>,
          document.getElementById('message')
        )
      );
    }
});

export default App;
