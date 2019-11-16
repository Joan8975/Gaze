/* jsx-a11y/no-static-element-interactions */
import React, { Component,Fragment } from 'react'
import './Collection.css';
import Masonry from 'react-masonry-css'


export class Collection extends Component {
  state={
    data:[],
  }
  componentDidMount() {
    fetch(
      'http://localhost:8080/gaze/api/list.php?email=joan8975@email.com'
    ).then(res => res.json())
      .then(data => {
        console.log(data[0].content)
        this.setState({data})
      })
  }
  render() {
    const {data} =this.state
    const breakpointColumnsObj = {
      default: 3,
      1100: 2,
      700: 1
    };
    return (
      <div className="container">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
        <ul>
          {data.map((item, index) => {
              return (
                <Fragment>
                    <li key={data[index].imgId} role="presentation" >
                      <div className="preview">
                        <img src={data[index].content} alt="" />
                      </div>
                    </li>
                </Fragment>
              );
            }
            )
          }
        </ul>
        </Masonry>
      </div>
    )
  }
}

export default Collection
