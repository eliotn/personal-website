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
    return {state: "HELLO\n===\nError, the example content didn't load"};
  },
  componentDidMount: function() {
    console.log("HI");
    this.serverRequest = $.get("examplemarkdown.md", function (result) {
	console.log(result);
	this.setState({state: result});
    }.bind(this));
  },
  handleChange: function(event) {
    console.log("CHANGED!");
    this.setState({state: this.refs.textarea.value})
  },
  markdownHTML: function() {
    return { __html:marked(this.state.state)}; 
  },
  render: function () {
    return (
      React.createElement('div', {id:this.markdownHTML().__html}, 
        React.createElement('textarea', {cols: "80", rows: "40", type: "text", value: this.state.state, onChange: this.handleChange, className: "markdownInput", ref:"textarea"}, null),
        React.createElement('div', {dangerouslySetInnerHTML:this.markdownHTML(), id: "mycontent"}, null)
      )
    )
  }
});
ReactDOM.render(React.createElement(MarkdownInput, {state: "HELLO\n=="})
, document.getElementById('content')
 );
