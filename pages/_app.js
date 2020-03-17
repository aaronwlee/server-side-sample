import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import configureStore from '../reducers/store';
import { loginAction } from '../reducers/user';
import isServer from '../utils/isServer';

export default withRedux(configureStore, { debug: false })(
  class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
      const { store: { getState, dispatch } } = ctx;
      if(isServer) {
        await dispatch(loginAction());
      }
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      );
    }
  }
);