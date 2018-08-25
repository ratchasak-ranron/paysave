/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import TutorialPage from 'containers/TutorialPage/Loadable';
import GoalPage from 'containers/GoalPage/Loadable';
import SettingPage from 'containers/SettingPage/Loadable';

import { Drawer, List, NavBar, Icon, TabBar } from 'antd-mobile';

import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCurrentUser,
  makeSelectFullScreen,
  makeSelectNavBarTitle,
} from './selectors';

const AppWrapper = styled.div`
  height: 100%;

  & .am-tab-bar {
    height: auto !important;
  }
`;

const CustomDrawer = styled(Drawer)`
  position: relative !important;
  overflow: auto !important;
  -webkit-overflow-scrolling: touch !important;

  & .am-drawer-sidebar {
    background-color: #fff !important;
    overflow: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }

  & .am-drawer-sidebar .am-list {
    width: 300px !important;
    padding: 0 !important;
  }

  & .am-drawer-content {
    overflow: initial !important;
    //background-color: #ffffff !important;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docked: false,
      fullScreen: true,
      pathname: '/',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pathname: nextProps.history.location.pathname,
    });
  }

  componentDidMount() {
    // const provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('user_birthday');
    // provider.setCustomParameters({
    //   display: 'popup',
    // });
    // firebase
    //   .auth()
    //   .signInWithPopup(provider)
    //   .then(result => {
    //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //     const token = result.credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     // ...
    //   })
    //   .catch(error => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     const credential = error.credential;
    //     // ...
    //   });
  }

  onDock(d) {
    this.setState({
      [d]: !this.state[d],
    });
  }

  redirectTo(path, isHideDock = true) {
    this.props.dispatch(push(path));
    if (isHideDock) {
      this.onDock('docked');
    }
  }

  render() {
    const { fullScreen, navBarTitle } = this.props;

    const sidebar = (
      <List>
        <List.Item
          key={2}
          thumb="https://image.flaticon.com/icons/svg/145/145867.svg"
          onClick={() => this.redirectTo('/login')}
        >
          โปรไฟล์
        </List.Item>
        <List.Item
          key={2}
          thumb="https://image.flaticon.com/icons/svg/248/248930.svg"
          onClick={() => this.redirectTo('/login')}
        >
          ออกจากระบบ
        </List.Item>
      </List>
    );

    return (
      <AppWrapper>
        {!fullScreen && (
          <NavBar
            icon={
              <img
                src="https://image.flaticon.com/icons/svg/149/149187.svg"
                width={24}
                height={24}
                style={{
                  position: 'relative',
                  filter: 'invert(100%)',
                }}
              />
            }
            onLeftClick={() => this.onDock('docked')}
            rightContent={[
              <img
                src="https://image.flaticon.com/icons/svg/1058/1058992.svg"
                width={24}
                height={24}
                style={{
                  position: 'relative',
                  filter: 'invert(100%)',
                }}
              />,
            ]}
          >
            {navBarTitle}
          </NavBar>
        )}
        <CustomDrawer
          style={{
            minHeight: fullScreen
              ? document.documentElement.clientHeight
              : document.documentElement.clientHeight - 45 - 50,
          }}
          contentStyle={{
            color: '#A6A6A6',
            width: '100%',
          }}
          sidebarStyle={{ border: '1px solid #ddd' }}
          sidebar={sidebar}
          docked={this.state.docked}
        >
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/tutorial" component={TutorialPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/goal" component={GoalPage} />
            <Route path="/setting" component={SettingPage} />
          </Switch>
        </CustomDrawer>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={fullScreen}
          noRenderContent
        >
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            title="Home"
            key="Transaction"
            dot
            selected={this.state.pathname === '/'}
            onPress={() => {
              this.redirectTo('/', false);
            }}
            data-seed="logId1"
          />
          <TabBar.Item
            icon={{
              uri:
                'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
            }}
            selectedIcon={{
              uri:
                'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
            }}
            title="My Saving"
            key="goal"
            selected={this.state.pathname === '/goal'}
            onPress={() => {
              this.redirectTo('/goal', false);
            }}
          />
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            title="Setting"
            key="setting"
            selected={this.state.pathname === '/setting'}
            onPress={() => {
              this.redirectTo('/setting', false);
            }}
          />
        </TabBar>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool,
  history: PropTypes.any,
  navBarTitle: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  fullScreen: makeSelectFullScreen(),
  navBarTitle: makeSelectNavBarTitle(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(App);
