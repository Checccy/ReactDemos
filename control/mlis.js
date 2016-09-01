var MlisBox=React.createClass({
	getInitialState:function(){
		return{
			validText:'',
			result:''
		}
	},
	setValue:function(event){
		var value=event.target.value
		value=value==''?0:value;
		if (value>this.state.validText) {
			this.setState({result:'敏感'})
		}else{
			this.setState({result:'耐药'})
		}
	},
	validChange:function(event){
		var value=event.target.value;
		this.setState({validText:value})
	},
	render:function () {
		return(
		<div>
		<FirstInput validChange={this.validChange}/>
		<SecondInput setValue={this.setValue}/>
		<ThirdInput  result={this.state.result}/>
		</div>)
	}

})
var ThirdInput=React.createClass({
	render:function(){
	    return(
	    	<input type="text" value={this.props.result}/>
	    	)
	}

})
var SecondInput=React.createClass({
	render:function(){
	    return(
	    	<input type="text" onChange={this.props.setValue}/>
	    	)
	}
})
var FirstInput=React.createClass({
	render:function(){
	    return(
	    	<input type="text" onChange={this.props.validChange} />
	    	)
	}
})

ReactDOM.render(
  <MlisBox  />,
  document.getElementById('container')
);

