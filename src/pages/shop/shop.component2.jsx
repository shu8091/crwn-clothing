import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import './shop.styles.scss';


const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();

    // move to shop.actions 
    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection('collections');

    //get data from firebase
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
    //   // console.log(snapshot);
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   // console.log(collectionsMap);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // })

    // get data from firebase 
    // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-934b4/databases/(default)/documents/collections')
    //   .then(resp => resp.json())
    //   .then(collections => console.log(collections));

    //other ways to get data from firebase
    // collectionRef.get().then(
    //   snapshot => {
    //     // console.log(snapshot);
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     // console.log(collectionsMap);
    //     updateCollections(collectionsMap);
    //     this.setState({ loading: false });
    //   }
    // );

  }

  render() {
    const { match, isCollectionsFetching, isCollectionsLoaded } = this.props;

    return (
      <div className='shop-page'>
        <Route
          exact path={`${match.path}`}
          render={props => <CollectionOverviewWithSpinner isloading={isCollectionsFetching} {...props} />}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => <CollectionPageWithSpinner isloading={!isCollectionsLoaded} {...props} />}
        />
      </div>
    )
  }
};

const mapStateToProps = createStructuredSelector({
  isCollectionsFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);