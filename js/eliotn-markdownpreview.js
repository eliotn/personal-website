marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
var MarkdownOutput = React.createClass({
  displayName: "MarkdownOutput",
  render: function () {
    return (
      React.createElement('p', {className: 'markdownOutput'}, this.props.value)
    );
  }
});
var MarkdownInput = React.createClass({
  displayName: "MarkdownInput",
  getInitialState: function() {
    return {state: "HELLO\n=="};
  },
  handleChange: function(event) {
    console.log("CHANGED!");
    this.setState({value: event.target.value, state: event.target.value})
  },
  markdownHTML: function() {
    return { __html:marked(this.state.state)}; 
  },
  render: function () {
    return (
      React.createElement('div', {id:this.markdownHTML()}, 
        React.createElement('textarea', {cols: "40",type: "text", value: this.state.state, onChange: this.handleChange, className: "markdownInput"}, null),
        React.createElement('div', {dangerouslySetHTML:this.markdownHTML()}, null),
	React.createElement('div', null, '')
      )
    )
  }
});
ReactDOM.render(React.createElement(MarkdownInput, {state: "HELLO\n=="})
, document.getElementById('content')
 );
