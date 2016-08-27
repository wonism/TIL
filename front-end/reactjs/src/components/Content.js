import React from 'react';

class Content extends React.Component {
  render() {
    return (
      <div>
        <h2>{ this.props.title }</h2>
        <p>{ this.props.content }</p>
      </div>
    );
  }
}

Content.propTypes = {
  title: React.PropTypes.string,
  content: React.PropTypes.string.isRequired
};

export default Content;

