/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-boolean-value */

import React, { Component, Fragment }  from 'react';
import './Search.css';


class Search extends Component {
  handleChange = (e) => {
    const {query} = this.props;
    query(e.target.value)
  }

  handleKeyPress = (e) => {
    const {history,getImgsList,page,queryTxt,initImgs,getSynonymList} = this.props;
    if(e.key === 'Enter') {
      initImgs([])
      getImgsList(page, queryTxt);
      getSynonymList(queryTxt)
      history.push('/search/'+ queryTxt);
    }
  }


  handleSyn(item) {
    const {query} = this.props;
    query(item)
    const {history,getImgsList,page,initImgs,getSynonymList} = this.props;
      initImgs([])
      getSynonymList(item)
      getImgsList(page,item);
      history.push('/search/'+ item);
  }


  render() {
    const {queryTxt,syn,isLoadingSynonym} = this.props;
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
          {(!isLoadingSynonym && queryTxt !== '')
            ? syn.map((item, index) => {
              if (index < 6 ) {
                return (
                  <Fragment>
                    <li className="synonum" onClick={() => this.handleSyn(item)}>{item}</li>
                  </Fragment>
                );
              }
            })
            :       
            <Fragment>
            <li className="synonum" onClick={() => this.handleSyn('animal')}>animal</li>
            <li className="synonum" onClick={() => this.handleSyn('texture')}>texture</li>
            <li className="synonum" onClick={() => this.handleSyn('fashion')}>fashion</li>
            <li className="synonum" onClick={() => this.handleSyn('nature')}>nature</li>
            <li className="synonum" onClick={() => this.handleSyn('architecture')}>architecture</li>
            <li className="synonum" onClick={() => this.handleSyn('food')}>food</li>
            </Fragment>}
        </ul>
      </Fragment>
    )
  }
};

export default Search;
