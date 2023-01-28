import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Form, TextArea } from 'semantic-ui-react';
import { Button, Segment, Label } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-ini";
import "ace-builds/src-noconflict/theme-github";

import './App.css';

const defaultInput = '[{ "value": 1 }, {"value":2}]';
const defaultScript = `# EZS script
[use]
plugin = basics

[debug]
ezs = false

[JSONParse]
separator = *

[assign]
path = label
value = static value

[debug]
text = before generating an identifier per object

[identify]

[dump]
indent = true
  `;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      script: '',
      output: '',
      log: '',
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeScript = this.handleChangeScript.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeInput(event) {
    const { value } = event.target;
    this.setState({ input: value });
  }
  handleChangeScript(value) {
      this.setState({ script: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { input, script } = this.state;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, script })
    };
    fetch('/', requestOptions)
      .then(response => response.json())
      .then(({ output, log }) => this.setState({ output, log }));
  }

  render() {
    return (
      <div className="App">
        <Header as='h2' icon textAlign='center'>
          <img src="https://inist-cnrs.github.io/ezs/_media/icon.svg" className="App-logo" alt="logo" />
            <Header.Content><a href="https://inist-cnrs.github.io/ezs/#/">EZS</a> Playground</Header.Content>
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Segment padded>
                  <br />
                  <TextArea
                    name='input'
                    placeholder='input'
                    height="360px"
                    rows='20'
                    value={defaultInput}
                    onChange={this.handleChangeInput}
                  />
                  <Label
                    attached='top right'
                  >Input</Label>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment attached>
                  <AceEditor
                    mode="ini"
                    theme="github"
                    height="360px"
                    defaultValue={defaultScript}
                    onChange={this.handleChangeScript}
                    name="script-input"
                    enableBasicAutocompletion={false}
                    enableLiveAutocompletion={false}
                    enableSnippets={false}
                  />
                  <Label
                    attached='top right'
                  >Script</Label>
                </Segment>
                <Button
                  attached='bottom'
                  onClick={this.handleSubmit}
                >Click here</Button>
              </Grid.Column>
              <Grid.Column>
                <Segment padded>
                  <br />
                  <TextArea
                    rows='20'
                    value={this.state.output}
                  />
                  <Label
                    attached='top right'
                  >Output</Label>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment padded>
            <pre>
              {this.state.log}
            </pre>
            <Label
              attached='top right'
            >Log</Label>
          </Segment>
        </Form>
      </div>
    );
  }
}
export default App;
