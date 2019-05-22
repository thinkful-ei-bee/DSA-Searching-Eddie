import React from 'react';

export default class SearchForm extends React.Component{
  state={
    array: [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5],
    message:'',
    search: -1,
    searchType: 'Linear',
    sortedArray: [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5].sort(),
  }

  linearSearch(num){
    for (let i = 0; i < this.state.array.length; i++) {
      if (this.state.array[i] === num) {
        return i + 1;
      }
    }
    return -1;
  }

  binarySearch(value, start, end, tries=0) {
    tries++;
    start = start === undefined ? 0 : start;
    end = end === undefined ? this.state.sortedArray.length : end;
  
    if (start > end) {
      return [tries];
    }
  
    const index = Math.floor((start + end) / 2);
    const item = this.state.sortedArray[index];
    console.log('item:',item,'value:',value);
    console.log(start, end);
    
    if (item === value) {
      console.log('returning:',tries);
      return tries;
    }
    else if (item < value) {
      return this.binarySearch(value, index + 1, end, tries);
    }
    else if (item > value) {
      return this.binarySearch(value, start, index - 1, tries);
    }else{
      return [tries];
    }
  }

  handleSearch= (e) => {
    e.preventDefault();
    if (this.state.searchType === 'Linear'){
      const value = this.linearSearch(this.state.search);
      let message = '';
      if (value === -1){
        message = `Could not find ${this.state.search} and it took ${this.state.array.length} tries to find out`;
      }else{
        message=`Using Linear Search it took ${value} tries to find ${this.state.search}`
      }
      this.setState({
        message,
        search:'',
      })
    }else{
      const value = this.binarySearch(this.state.search);
      let message='';
      console.log('value:',value);
      if (typeof value === 'object'){
        message = `Could not find ${this.state.search} and it took ${value[0]} tries to find out`;
      }else{
        message = `Using Binary Search it took ${value} tries to find ${this.state.search}`
      }
      this.setState({
        message,
        search:'',
      })
    }
  }

  handleInputChange = (search)=>{
    this.setState({
      search: parseInt(search),
    })
  }

  handleSearchType = (searchType)=>{
    this.setState({
      searchType,
    })
  }

  render(){
    return(
      <>
        <p>{this.state.message}</p>
        <form onSubmit={this.handleSearch}>
          <select name="searchType" onChange={e=>this.handleSearchType(e.target.value)}>
            <option value="Linear">Linear</option>
            <option value="Binary">Binary</option>
          </select>
          <input onChange={e=>this.handleInputChange(e.target.value)} type='text'></input>
          <button type='submit'>search</button>
        </form>
      </>
    )
  }
}