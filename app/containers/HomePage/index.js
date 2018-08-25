/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Card, List, WhiteSpace, WingBlank } from 'antd-mobile';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { hideFullScreen, loadRepos, setNavBarTitle } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fromJS } from 'immutable';
import line1Img from '../../images/line1.png';
import line2Img from '../../images/line2.png';
import line3Img from '../../images/line3.png';
import NumberFormat from 'react-number-format';

const Section = styled.div`
  color: rgb(0, 0, 0);
  font-size: 16px;
  line-height: 16px;
  height: 16px;
  font-weight: bolder;
  position: relative;
  padding: 15px 0px 9px 15px;
`;

const Section2 = styled.div`
  color: rgb(0, 0, 0);
  font-size: 16px;
  line-height: 16px;
  height: 16px;
  font-weight: normal;
  position: relative;
  padding: 15px 0px 9px 15px;
`;

const CustomHeader = styled(Card.Header)`
  color: #fff;
  background-color: rgb(78, 188, 160);

  & .am-card-header-extra {
    color: #fff;
  }

  & .am-card-header-content {
    color: #fff;
  }

  & .am-card-header-content img {
    height: 50px;
    width: 50px;
  }
`;

const CustomTransactionHeader = styled(Card.Header)`
  & .am-card-header-content img {
    height: 50px;
    width: 50px;
  }
`;

const CustomList = styled(List)`
  & .am-list-header {
    padding-top: 0;
  }
`;

const CustomCard = styled(Card)`
  min-height: 0;
`;

const CustomCardHeader = styled(CustomCard)`
  padding-bottom: 0px !important;
`;

const Item = List.Item;
const Brief = Item.Brief;

const CustomBrief = styled.div`
  color: #888;
  font-size: 15px;
  line-height: 1.5;
  margin-top: 6px;
`;

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isGoalMore: false,
      justForYou: fromJS([
        {
          icon: 'https://image.flaticon.com/icons/svg/1052/1052773.svg',
          name: 'Extra Care',
          desc: 'ส่วนลด 20% ของเบี้ยประกัน',
        },
        {
          icon: 'https://image.flaticon.com/icons/svg/864/864501.svg',
          name: 'Extra Accident',
          desc: 'ส่วนลด 10% ของเบี้ยประกัน',
        },
      ]),
      goals: fromJS([
        {
          icon: 'https://image.flaticon.com/icons/svg/125/125271.svg',
          name: 'iPad (+iHope)',
          current: 15000,
          goal: 20000,
          image: line1Img,
          show: true,
        },
        {
          icon: 'https://image.flaticon.com/icons/svg/189/189081.svg',
          name: 'การลงทุน',
          current: 12000,
          goal: 1000000,
          image: line3Img,
          show: false,
        },
        {
          icon: 'https://image.flaticon.com/icons/svg/816/816710.svg',
          name: 'การเกษียร',
          current: 10000,
          goal: 5000000,
          image: line2Img,
          show: false,
        },
      ]),
    };
  }
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.dispatch(hideFullScreen());
    this.props.dispatch(setNavBarTitle('Pay Save'));

    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  toggleGoalMore() {
    let goals = this.state.goals;
    let isGoalMore = this.state.isGoalMore;
    if (this.state.goals.getIn([1, 'show'])) {
      goals = goals.setIn([1, 'show'], false);
      goals = goals.setIn([2, 'show'], false);
      isGoalMore = false;
    } else {
      goals = goals.setIn([1, 'show'], true);
      goals = goals.setIn([2, 'show'], true);
      isGoalMore = true;
    }
    this.setState({ goals, isGoalMore });
  }

  render() {
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <Section>
          <img
            src="https://image.flaticon.com/icons/svg/1039/1039327.svg"
            width={24}
            height={24}
            style={{ marginRight: '5px', position: 'relative', top: '-2px' }}
          />
          Nearest Goal
          <span
            style={{
              float: 'right',
              fontWeight: 'normal',
              fontSize: '0.9em',
              textDecoration: 'underline',
            }}
            onClick={() => this.toggleGoalMore()}
          >
            more / add
          </span>
        </Section>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        {this.state.goals.map(
          (data, i) =>
            data.get('show') && (
              <div>
                <Card>
                  <CustomTransactionHeader
                    title={data.get('name')}
                    thumb={data.get('icon')}
                    extra={
                      <span style={{ color: '#4ebca0' }}>
                        <div style={{ color: '#888', fontSize: '15px' }}>
                          เป้าหมาย
                        </div>
                        <NumberFormat
                          value={data.get('goal')}
                          displayType="text"
                          thousandSeparator
                        />{' '}
                        บาท
                      </span>
                    }
                  />
                  <Card.Body>
                    <img
                      src={data.get('image')}
                      alt=""
                      width="100%"
                      height={20}
                    />
                    <div
                      style={{
                        paddingTop: '5px',
                      }}
                    >
                      <span>
                        <NumberFormat
                          value={data.get('current')}
                          displayType="text"
                          thousandSeparator
                        />
                        &nbsp; ปัจจุบัน
                      </span>
                      <span
                        style={{
                          float: 'right',
                          fontWeight: 'normal',
                        }}
                      >
                        เหลือ&nbsp;
                        <NumberFormat
                          value={data.get('goal') - data.get('current')}
                          displayType="text"
                          thousandSeparator
                        />
                      </span>
                    </div>
                  </Card.Body>
                </Card>
                <WhiteSpace size="lg" />
              </div>
            ),
        )}
        {this.state.isGoalMore && (
          <Button
            icon={
              <img
                src="https://image.flaticon.com/icons/svg/148/148764.svg"
                alt=""
                width={20}
                height={20}
              />
            }
          >
            New Goal
          </Button>
        )}

        <Section2>
          <img
            src="https://image.flaticon.com/icons/svg/610/610333.svg"
            width={24}
            height={24}
            style={{ marginRight: '10px', position: 'relative', top: '-2px' }}
          />
          Your Reward
        </Section2>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <CustomCard>
          <Card.Body>
            <span>บัตรจับมือเชอปราง BNK48</span>
            <img
              src="https://image.flaticon.com/icons/svg/320/320416.svg"
              width={30}
              height={30}
              style={{ float: 'right', position: 'relative', top: '5px' }}
            />
            <CustomBrief>เนื่องจากคุณออมครบ 5,000 บาท</CustomBrief>
          </Card.Body>
        </CustomCard>
        <WhiteSpace size="lg" />
        <Section2>
          {/* <img */}
          {/* src="https://image.flaticon.com/icons/svg/1029/1029183.svg" */}
          {/* width={24} */}
          {/* height={24} */}
          {/* style={{ marginRight: '10px', position: 'relative', top: '-2px' }} */}
          {/* /> */}
          Just For You
        </Section2>
        <WhiteSpace size="lg" />
        {this.state.justForYou.map((data, i) => (
          <CustomList renderHeader={() => ''} className="my-list">
            <Item
              thumb={data.get('icon')}
              multipleLine
              onClick={() => {
                const isExpand = data.get('isExpand');
                this.setState(({ transactions }) => ({
                  transactions: transactions.setIn([i, 'isExpand'], !isExpand),
                }));
              }}
              platform="ios"
            >
              {data.get('name')}
              <Brief>{data.get('desc')}</Brief>
            </Item>
          </CustomList>
        ))}
        <WhiteSpace size="lg" />
      </WingBlank>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
