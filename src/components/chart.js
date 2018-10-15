import React, { Component } from 'react';
import _ from 'lodash';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchWpData } from '../actions';


class Chart extends Component {
  constructor(props){
    super(props);
    this.calc = this.calc.bind(this);
  }
  componentDidMount(){
    this.props.fetchWpData();
  }

  convertDate(dateAsString){
    const epocArray = [];
    const postRate = [0];
    const oneMonth =  2592000000;
    var addOne = 1;
    const blackList = [];

    for (var i = 0; i < dateAsString.length; i++) {
      epocArray.push(Date.parse(dateAsString[i]));
    }
    epocArray.reverse();
    // The Rang of Month and length of the Array that will be pass to the Graph

    const arrayLeng = Math.ceil(((Math.max(...epocArray)) - (Math.min(...epocArray))) / oneMonth );
    const arrayLimiter = [epocArray[0]];
    for (var i = 0; i < arrayLeng - 1; i++) {
        arrayLimiter[i+1] = (arrayLimiter[i] + oneMonth);
    }
    console.log("arrayLimiter" , arrayLimiter);



    for (var i = 0; i < arrayLeng; i++) {
      for (var j = 0; j < epocArray.length + 1; j++) {
        if (epocArray[j] == arrayLimiter[i] || Math.abs((epocArray[j] - arrayLimiter[i])) < oneMonth) {
            if (!blackList.includes(epocArray[j])) {
              blackList.push(epocArray[j]);
              postRate[i] = addOne;
              addOne++;
            }
        }

      }

      addOne = 1;
    }
    for (var i = 0; i < postRate.length; i++) {
      if (!postRate[i])
      postRate[i] = 0;
    }

    console.log("postRate " , postRate);
    return postRate;
  }



calc(postsData){
    const date = postsData.map(i => i.date);
    // const epocTime = Date.parse('01 July 1970 00:00:00 GMT');
  //   const temp = postsData.list.map(weather => weather.main.temp);
  //   const Pressures = postsData.list.map(weather => weather.main.pressure);
  //   const Humidites = postsData.list.map(weather => weather.main.humidity);
  //
  // const Pressures = cityData.list.map(weather => weather.main.pressure);
  return(
      <div key={date}>
        {/* {this.convertDate(date)}
        <Sparklines height={20} width={80} data={[45, 46]}> */}
        <Sparklines height={20} width={80} data={this.convertDate(date)}>
            <SparklinesLine color={'red'}/>
            {/* <SparklinesReferenceLine type="mean" /> */}
            <SparklinesReferenceLine type="avg" />
        </Sparklines>
        <div> avg </div>
        <h1>{date}</h1>
        <h1>Date </h1>
      </div>
    );
  }


  render() {
    return(
      <div>
        {console.log(this.props.posts)}
        {this.props.posts.map(this.calc)}
    </div>
    );
  }
}

function mapStateToProps({posts}) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWpData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
