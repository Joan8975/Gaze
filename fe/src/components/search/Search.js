/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-boolean-value */

import React, { Component, Fragment }  from 'react';
import './Search.css';
import Loading from '../loading/Loading';


class Search extends Component {

  handleChange = (e) => {
    const {query} = this.props;
    query(e.target.value)
  }

  handleKeyPress = (e) => {
    const {history,queryTxt,handleSearchTxt} = this.props;
    if(e.key === 'Enter') {
      handleSearchTxt(queryTxt)
      history.push('/search/'+ queryTxt);
    }
  }

  handleSyn(item) {
    const {query} = this.props;
    query(item)
    const {history,handleSearchTxt} = this.props;
    handleSearchTxt(item)
    history.push('/search/'+ item);
  }


  render() {
    const {queryTxt,syn} = this.props
    let status;
    if (queryTxt !== '') {
      if(syn === undefined){
        status=''
      } else {
        status=(
          syn.map((item, index) => {
            if (index < 6 ) {
              return (
                <Fragment>
                  <li className="synonum" onClick={() => this.handleSyn(item)}>{item}</li>
                </Fragment>
              );
            }
          })
        )
      }
    } else {
      status=(
        <Fragment>
          <li className="synonum" onClick={() => this.handleSyn('animal')}>animal</li>
          <li className="synonum" onClick={() => this.handleSyn('texture')}>texture</li>
          <li className="synonum" onClick={() => this.handleSyn('fashion')}>fashion</li>
          <li className="synonum" onClick={() => this.handleSyn('nature')}>nature</li>
          <li className="synonum" onClick={() => this.handleSyn('architecture')}>architecture</li>
          <li className="synonum" onClick={() => this.handleSyn('food')}>food</li>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <div className="search_bar">
          <input type="text" className="search_input" name="query" placeholder="Search..."
          value={queryTxt}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          />
        </div>
        <ul className="syn_group">
        {status}
        </ul>
      </Fragment>
    )
  }
};

export default Search;


