import React from 'react';
import { withRouter } from 'react-router-dom';
import CollectionItem from '../collection-item/collection-item.component';
import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items, routeName, history, match }) => {
  // console.log(match)
  return (
    <div className='collection-preview'>
      <h1 className='title' onClick={() => history.push(`${match.url}/${routeName}`)} >{title}</h1>
      <div className='preview'>
        {
          items
            .filter((item, idx) => idx < 4)
            .map(item => (
              <CollectionItem key={item.id} item={item} />
            ))
        }
      </div>
    </div>
  )
}

export default withRouter(CollectionPreview);