/**
 *
 * SettingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSettingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { hideFullScreen, setNavBarTitle } from '../App/actions';
import {
  Card,
  List,
  Stepper,
  Switch,
  WhiteSpace,
  WingBlank,
} from 'antd-mobile';
import goalChartImg from '../../images/goal_chart.png';
import styled from 'styled-components';

const Section = styled.div`
  color: rgb(0, 0, 0);
  font-size: 16px;
  line-height: 16px;
  height: 16px;
  font-weight: bolder;
  position: relative;
  padding: 15px 0px 9px 15px;
`;

/* eslint-disable react/prefer-stateless-function */
export class SettingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentEnabled: true,
      valPayment: 3,
      dailyEnabled: false,
      valDaily: 20,
      monthlyEnabled: false,
      valMonthly: 2000,
    };
  }

  componentDidMount() {
    this.props.dispatch(hideFullScreen());
    this.props.dispatch(setNavBarTitle('Setting'));
  }

  render() {
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <Section>
          <img
            src="https://image.flaticon.com/icons/svg/138/138338.svg"
            width={24}
            height={24}
            style={{ marginRight: '10px', position: 'relative', top: '-2px' }}
          />
          สัดส่วนการออม
        </Section>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <Card>
          <Card.Body>
            <img
              src={goalChartImg}
              width="100%"
              height={160}
              style={{ marginRight: '5px', position: 'relative', top: '-2px' }}
            />
          </Card.Body>
        </Card>
        <WhiteSpace size="lg" />
        <Section>
          <img
            src="https://image.flaticon.com/icons/svg/138/138280.svg"
            width={24}
            height={24}
            style={{ marginRight: '10px', position: 'relative', top: '-2px' }}
          />
          วิธีการตัดเงินเพื่อออม
        </Section>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <List>
          <List.Item
            wrap
            extra={
              <Stepper
                style={{ width: '100%', minWidth: '100px' }}
                showNumber
                max={10}
                min={1}
                value={this.state.valPayment}
                onChange={value => {
                  this.setState({ valPayment: value });
                }}
              />
            }
          >
            <Switch
              checked={this.state.paymentEnabled}
              onClick={checked => {
                this.setState({ paymentEnabled: checked });
              }}
            />&nbsp; ทุกการใช้จ่าย (%)
          </List.Item>
          <List.Item
            extra={
              <div>
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  max={1000}
                  min={0}
                  step={10}
                  value={this.state.valDaily}
                  onChange={value => {
                    this.setState({ valDaily: value });
                  }}
                />
              </div>
            }
          >
            <Switch
              checked={this.state.dailyEnabled}
              onClick={checked => {
                this.setState({ dailyEnabled: checked });
              }}
            />&nbsp; รายวัน (บาท)
          </List.Item>
          <List.Item
            extra={
              <div>
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  max={20000}
                  min={0}
                  step={1000}
                  value={this.state.valMonthly}
                  onChange={value => {
                    this.setState({ valMonthly: value });
                  }}
                />
              </div>
            }
          >
            <Switch
              checked={this.state.monthlyEnabled}
              onClick={checked => {
                this.setState({ monthlyEnabled: checked });
              }}
            />&nbsp; รายเดือน (บาท)
          </List.Item>
        </List>
      </WingBlank>
    );
  }
}

SettingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settingpage: makeSelectSettingPage(),
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

const withReducer = injectReducer({ key: 'settingPage', reducer });
const withSaga = injectSaga({ key: 'settingPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingPage);
