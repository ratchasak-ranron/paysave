/**
 *
 * TutorialPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import { Button, Carousel, WingBlank } from 'antd-mobile';
import styled from 'styled-components';

import tutorial1Img from 'images/tutorial1.png';
import tutorial2Img from 'images/tutorial2.png';
import tutorial3Img from 'images/tutorial3.png';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTutorialPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { showFullScreen } from '../App/actions';

const Wrapper = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: #ffffff;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

/* eslint-disable react/prefer-stateless-function */
export class TutorialPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [tutorial1Img, tutorial2Img, tutorial3Img],
      imgHeight: document.documentElement.clientHeight - 100,
      slideIndex: 0,
      buttonText: 'Next',
    };
  }

  componentDidMount() {
    this.props.dispatch(showFullScreen());
  }

  next() {
    const nextIndex = this.state.slideIndex + 1;

    if (nextIndex > 2) {
      this.props.dispatch(push('/'));
      return;
    }

    this.setState({ slideIndex: nextIndex });
  }

  afterChange(index) {
    if (index >= 2) {
      this.setState({ slideIndex: index, buttonText: 'Go' });
    } else {
      this.setState({ slideIndex: index, buttonText: 'Next' });
    }
  }

  render() {
    return (
      <Wrapper>
        <WingBlank>
          <Carousel
            autoplay={false}
            selectedIndex={this.state.slideIndex}
            beforeChange={(from, to) =>
              console.log(`slide from ${from} to ${to}`)
            }
            afterChange={index => this.afterChange(index)}
          >
            {this.state.data.map(val => (
              <a
                key={val}
                href="http://www.alipay.com"
                style={{
                  display: 'inline-block',
                  width: '100%',
                  height: this.state.imgHeight,
                }}
              >
                <img
                  src={`${val}`}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                  }}
                />
              </a>
            ))}
          </Carousel>
        </WingBlank>
        <Button type="primary" onClick={() => this.next()}>
          {this.state.buttonText}
        </Button>
      </Wrapper>
    );
  }
}

TutorialPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorialpage: makeSelectTutorialPage(),
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

const withReducer = injectReducer({ key: 'tutorialPage', reducer });
const withSaga = injectSaga({ key: 'tutorialPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TutorialPage);
