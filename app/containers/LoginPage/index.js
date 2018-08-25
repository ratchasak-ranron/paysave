/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import { InputItem, List } from 'antd-mobile';
import styled from 'styled-components';
import logoImg from 'images/logo_pay_save.png';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { showFullScreen } from '../App/actions';

const Wrapper = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 20px;
  padding-right: 20px;
`;

const LogoText = styled.div`
  padding-bottom: 20px;
  font-size: 1.4em;
  color: black;
`;

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(showFullScreen());
  }

  login() {
    this.props.dispatch(push('/tutorial'));
  }

  renderHeader() {
    return (
      <div style={{ textAlign: 'center' }}>
        <img
          alt="logo"
          src={logoImg}
          style={{
            height: '150px',
            width: '140px',
            paddingBottom: '20px',
          }}
        />
        <LogoText>Pay Save</LogoText>
      </div>
    );
  }

  render() {
    return (
      <Wrapper>
        <List renderHeader={() => this.renderHeader()}>
          <InputItem placeholder="Username">
            <div
              style={{
                backgroundImage:
                  'url(https://image.flaticon.com/icons/svg/149/149071.svg)',
                backgroundSize: 'cover',
                height: '22px',
                width: '22px',
              }}
            />
          </InputItem>
          <InputItem placeholder="Password">
            <div
              style={{
                backgroundImage: `url(https://image.flaticon.com/icons/svg/179/179543.svg)`,
                backgroundSize: 'cover',
                height: '22px',
                width: '22px',
              }}
            />
          </InputItem>
          <List.Item>
            <div
              style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
              onClick={() => this.login()}
            >
              Login
            </div>
          </List.Item>
        </List>
      </Wrapper>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
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

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
