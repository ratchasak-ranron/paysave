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
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { Drawer, List, NavBar, Icon, TabBar } from 'antd-mobile';

import reducer from './reducer';
import saga from './saga';
import { makeSelectCurrentUser } from './selectors';

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
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docked: false,
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    };
  }

  onDock(d) {
    this.setState({
      [d]: !this.state[d],
    });
  }

  redirectTo(path) {
    this.props.dispatch(push(path));
    this.onDock('docked');
  }

  render() {
    const sidebar = (
      <List>
        <List.Item
          key={1}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
          onClick={() => this.redirectTo('/features')}
        >
          Profile
        </List.Item>
        <List.Item
          key={2}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
          onClick={() => this.redirectTo('/')}
        >
          Setting
        </List.Item>
      </List>
    );

    return (
      <AppWrapper>
        <NavBar
          icon={<Icon type="ellipsis" />}
          onLeftClick={() => this.onDock('docked')}
        >
          Pay Save
        </NavBar>
        <CustomDrawer
          style={{ minHeight: document.documentElement.clientHeight - 45 - 50 }}
          contentStyle={{
            color: '#A6A6A6',
            width: '100%',
            paddingTop: '0px',
            paddingRight: '20px',
            paddingBottom: '0px',
            paddingLeft: '20px',
          }}
          sidebarStyle={{ border: '1px solid #ddd' }}
          sidebar={sidebar}
          docked={this.state.docked}
        >
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/features" component={FeaturePage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </CustomDrawer>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
          noRenderContent
        >
          <TabBar.Item
            title="Life"
            key="Life"
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selected={this.state.selectedTab === 'blueTab'}
            badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          />
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
            title="Koubei"
            key="Koubei"
            badge="new"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
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
            title="Friend"
            key="Friend"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
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
            title="My"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          />
        </TabBar>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
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
