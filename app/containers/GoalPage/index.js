/**
 *
 * GoalPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Card, List, WhiteSpace, WingBlank } from 'antd-mobile';
import styled from 'styled-components';
import { fromJS } from 'immutable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectGoalPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { hideFullScreen, setNavBarTitle } from '../App/actions';

const Section = styled.div`
  color: rgb(0, 0, 0);
  font-size: 16px;
  line-height: 16px;
  height: 16px;
  font-weight: bolder;
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
    height: 40px;
    width: 40px;
    margin-right: 0px;
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
export class GoalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: fromJS([
        {
          type: 'payment',
          name: 'ซื้อกระเป๋า (Lazada)',
          amount: 3000,
          save: 100,
          isExpand: false,
          items: [
            {
              name: 'สำหรับ iPad (+iHope)',
              amount: 45,
            },
            {
              name: 'สำหรับการลงทุน',
              amount: 40,
            },
            {
              name: 'สำหรับการเกษียร',
              amount: 15,
            },
          ],
        },
        {
          type: 'monthly',
          name: 'ออมรายเดือน',
          amount: 1000,
          save: 1000,
          isExpand: false,
          items: [
            {
              name: 'สำหรับ iPad (+iHope)',
              amount: 450,
            },
            {
              name: 'สำหรับการลงทุน',
              amount: 400,
            },
            {
              name: 'สำหรับการเกษียร',
              amount: 150,
            },
          ],
        },
        {
          type: 'payment',
          name: 'บิลค่าน้ำ - ค่าไฟ',
          amount: 1000,
          save: 1000,
          isExpand: false,
          items: [
            {
              name: 'สำหรับ iPad (+iHope)',
              amount: 450,
            },
            {
              name: 'สำหรับการลงทุน',
              amount: 400,
            },
            {
              name: 'สำหรับการเกษียร',
              amount: 150,
            },
          ],
        },
      ]),
    };
  }

  componentDidMount() {
    this.props.dispatch(hideFullScreen());
    this.props.dispatch(setNavBarTitle('My Saving'));
  }

  render() {
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <CustomCardHeader>
          <CustomHeader
            title={<span style={{ paddingLeft: '10px' }}>เงินออมของคุณ</span>}
            thumb="https://image.flaticon.com/icons/svg/639/639364.svg"
            extra={<span>37,000 Baht</span>}
          />
        </CustomCardHeader>
        <WhiteSpace size="lg" />
        <Section>
          <img
            src="https://image.flaticon.com/icons/svg/138/138360.svg"
            width={24}
            height={24}
            style={{ marginRight: '10px', position: 'relative', top: '-2px' }}
          />
          การออมล่าสุด
        </Section>
        <WhiteSpace size="lg" />
        {this.state.transactions.map((data, i) => (
          <CustomList renderHeader={() => ''} className="my-list">
            <Item
              arrow="down"
              thumb={
                data.get('type') === 'payment'
                  ? 'https://image.flaticon.com/icons/svg/138/138239.svg'
                  : 'https://image.flaticon.com/icons/svg/584/584011.svg'
              }
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
              <div
                style={{
                  float: 'right',
                  color: '#4ebca0',
                  position: 'relative',
                }}
              >
                <div
                  style={{ color: '#888', fontSize: '15px', float: 'right' }}
                >
                  ออมเพิ่ม
                </div>
                <br />
                <div style={{ float: 'right' }}>+{data.get('save')} บาท</div>
              </div>
              <Brief>จำนวน {data.get('amount')} บาท</Brief>
            </Item>
            {data.get('isExpand') &&
              data.get('items').map(item => (
                <Item onClick={() => {}}>
                  <div style={{ float: 'right', color: '#4ebca0' }}>
                    +{item.get('amount')} บาท
                  </div>
                  {item.get('name')}
                </Item>
              ))}
          </CustomList>
        ))}
      </WingBlank>
    );
  }
}

GoalPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  goalpage: makeSelectGoalPage(),
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

const withReducer = injectReducer({ key: 'goalPage', reducer });
const withSaga = injectSaga({ key: 'goalPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GoalPage);
