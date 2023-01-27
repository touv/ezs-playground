import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Form, TextArea } from 'semantic-ui-react';
import { Button, Segment, Label } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '[{ "value": 1 }, {"value":2}]',
      script: `# EZS script
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
text = avant génération d'un identifiant

[identify]

[dump]
indent = true
      `,
      output: '',
      log: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    console.log({ name, value });
    if (name === 'input') {
      this.setState({ input: value });
    }
    if (name === 'script') {
      this.setState({ script: value });
    }
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
          <Header.Content>EZS Playground</Header.Content>
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
                    rows='20'
                    value={this.state.input}
                    onChange={this.handleChange}
                  />
                  <Label
                    attached='top right'
                  >Input</Label>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment attached>
                  <br />
                  <TextArea
                    name='script'
                    placeholder='script'
                    rows='20'
                    value={this.state.script}
                    onChange={this.handleChange}
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
