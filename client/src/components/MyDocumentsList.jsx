import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import cardimage from '../images/cardimage.jpeg'

const MyDocumentList = ({documents}) => {
  if(documents.length > 0) {
  return (
    <div className= "row">
       <div className="col s2 m2">
       </div>
      {documents.map(document => {
            return (
                <div className="col s6 m3" key={document.id}>
                  <div className="card medium">
                    <div className="card-image">
                      <img src={cardimage}/>
                      <span className="card-title">{document.title}</span>
                    </div>
                    <div className="card-content">
                      <p>{document.content}</p>
                    </div>
                    <div className="card-action">
                      <a href="#">{document.access}</a>
                    </div>
                  </div>
                </div>      
          )
        })
      }
    </div>
    )
  }
  return (
    <div className= "row">
       <div className="col s3 m4">
       </div>
          <div className="col s6 m4">
            <div className="card medium">
              <div className="card-image">
                <img src={cardimage}/>
                <span className="card-title"></span>
              </div>
              <div className="card-content">
                <p>You have no document</p>
              </div>
              <div className="card-action">
              </div>
            </div>
          </div>
          </div>
        );
      }

MyDocumentList.PropTypes = {
  documents: PropTypes.array.isRequired,
};

export default MyDocumentList;