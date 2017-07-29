"use strict";


const {Table, Column, Cell} = FixedDataTable;

//thanks to https://github.com/facebook/fixed-data-table/blob/master/examples/ObjectDataExample.js
//for a good example on how to use the api

const RankingCell = function ({rowIndex, data, col, startRow, ...props}) {
    return (<Cell {...props}>{rowIndex+1}</Cell>)
}

const TextCell = function ({rowIndex, data, col, startRow, ...props}) {
  return (<Cell {...props}>{data[rowIndex + startRow][col]}</Cell>);
}

const AvatarCell = function ({rowIndex, data, col, startRow, ...props}) {
  return (<Cell {...props}><a href={"http://www.freecodecamp.com/" + data[rowIndex+startRow].username}><img src={data[rowIndex + startRow].img} width="25" height="25"/>{data[rowIndex+startRow].username}</a></Cell>);
}

const DateCell = function ({rowIndex, data, col, startRow, ...props}) {
  //need to delete dot and two numbers afterwards
    var dateToParse = data[rowIndex+startRow][col].slice(0, 19);
    var currentdate = new Date();
    var newdate = new Date(Date.parse(dateToParse));
    var difference = Math.floor((currentdate - newdate)/1000);
    var differencestring = "I don't know";
    var classname="notoutofdate";
    if (difference < 60) {
        var s = Math.floor(difference);
        differencestring = s + " second" + ((s === 1)?"":"s") + " ago";
    }
    else if (difference < 60*60) {
        var m = Math.floor(difference/60);
        differencestring = m + " minute" + ((m === 1)?"":"s") + " ago";
    }
    else if (difference < 24*60*60){
        var h = Math.floor(difference/(60*60));
        differencestring = h + " hour" + ((h === 1)?"":"s") + " ago";
    }
    else {
        var d = Math.floor(difference/(24*60*60));
        differencestring = d + " day" + ((d === 1)?"":"s") + " ago";
        if (d >= 15) {
            classname = "outofdate";
        }
    }
    return (<Cell {...props}><span className={classname}>{differencestring}</span></Cell>)
}

class CamperLeaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dataList:this.props.dataList, startRow:this.props.startRow}; 
  }
  sortBy30Days() {
    this.setState({startRow:0});
  }
  sortByAllTime() {
    this.setState({startRow:100});
  }
  render() {
    console.log(this.state)
    if (this.state === null){
      return <div />}
    var {dataList} = this.state.dataList;
    var {startRow} = this.state;
    console.log(startRow)
    //need to use bindings for clickable elements that change state, otherwise react will call the function...
    return (
      <Table rowHeight={50} headerHeight={50} rowsCount={100} width={1000} height={500}
        {...this.props}>
        <Column
            header={<Cell className='align-center'>#</Cell>}
            cell={<RankingCell className='align-center' startRow={startRow} data={dataList} col="img"/>}
            fixed={true}
            startRow={100}
            width={50}
        />
        <Column
            header={<Cell className='align-center'>Avatar</Cell>}
            cell={<AvatarCell startRow={startRow} data={dataList} col="img"/>}
            fixed={true}
            startRow={100}
            width={200}
        />
        <Column
            header={<Cell className='align-center'><a onClick={this.sortByAllTime.bind(this)}>All-Time Score</a></Cell>}
            cell={<TextCell className='align-center' startRow={startRow} data={dataList} col="alltime" />}
            fixed={true}
            startRow={100}
            width={200}
        />
        <Column
            header={<Cell className='align-center'><a className='align-center' onClick={this.sortBy30Days.bind(this)}>Last 30 Days Score</a></Cell>}
            cell={<TextCell className='align-center' startRow={startRow} data={dataList} col="recent" />}
            fixed={true}
            startRow={100}
            width={200}
        />
        
        <Column
            header={<Cell className='align-center'>Last Updated</Cell>}
            cell={<DateCell className='align-center' startRow={startRow} data={dataList} col="lastUpdate" text-align="center"/>}
            fixed={true}
            startRow={100}
            width={200}
        />
      </Table>

    )
  }
}
//sort by recent then all time
$.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent", function (result) {
    $.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime", function (result2) {
          var all_results = result.concat(result2).map(JSON.stringify).map(JSON.parse);
        var LeaderboardState = {dataList: all_results}
        ReactDOM.render(<CamperLeaderboard startRow={100} dataList={LeaderboardState}/>, document.getElementById('content'));
    });
});

