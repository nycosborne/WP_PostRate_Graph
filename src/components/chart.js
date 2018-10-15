import React, { Component } from 'react';
import _ from 'lodash';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchWpData } from '../actions';


class Chart extends Component {
  constructor(props){
    super(props);
    this.returnGraph = this.returnGraph.bind(this);
  }
  componentDidMount(){
    this.props.fetchWpData();
  }

  convertDatePerMonth(dateAsString){
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
    console.log(postRate);
    return postRate;
  }

  postMost(date){
    if (this.convertDatePerMonth(date)[this.convertDatePerMonth(date).length - 1] < 4) {
      return(<h1>Post Most</h1>);
    }else {
      return(<h1>Post Enough</h1>);
    }
  }

returnGraph(postsData){
    const date = postsData.map(i => i.date);
  return(
      <div key={date}>
        <Sparklines height={20} width={40} data={this.convertDatePerMonth(date)}>
            <SparklinesLine color={'red'}/>
            <SparklinesReferenceLine type="avg" />
        </Sparklines>
        <h1>Post Rate {this.convertDatePerMonth(date)[this.convertDatePerMonth(date).length - 1]}</h1>
        <h1>{this.convertDatePerMonth(date).length}</h1>
        {this.postMost(date)}
      </div>
    );
  }


  render() {
    return(
      <div>
        {this.props.posts.map(this.returnGraph)}
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
