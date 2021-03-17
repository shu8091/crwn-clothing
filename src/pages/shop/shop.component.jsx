import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import './shop.styles.scss';


const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  state = { loading: true };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

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
    collectionRef.get().then(
      snapshot => {
        // console.log(snapshot);
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        // console.log(collectionsMap);
        updateCollections(collectionsMap);
        this.setState({ loading: false });
      }
    );

  };

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className='shop-page'>
        <Route
          exact path={`${match.path}`}
          render={props => <CollectionOverviewWithSpinner isloading={loading} {...props} />}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => <CollectionPageWithSpinner isloading={loading} {...props} />}
        />
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);