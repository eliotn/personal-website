
var MarkdownInput = React.createClass({
  displayName: "MarkdownInput",
  render: function () {
    return (
      React.createElement('input', {type: "text", value: "HELLO", className: "markdownInput"}, null)
    );
  }
});
ReactDOM.render(React.createElement(MarkdownInput, null)
, document.getElementById('content')
 );
