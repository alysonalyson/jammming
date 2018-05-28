import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {term : ''};
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearch() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
      this.setState( {term: event.target.value} );
  }

  handleKeyPress(event)  {
    if(event.keyCode === 'Enter') {
      this.handleSearch();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          onKeyPress= {this.handleKeyPress} />
        <a onClick= {this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}
export default SearchBar;
