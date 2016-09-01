var Box1=React.createClass({
	getInitialState:function(){
		return({
			IsVisible:true,
			children:this.props.data.children
		})
	},
	handleClick:function(){
		this.state.children.forEach(function(item){
			item.name='sssssssssss';
		})

		if (this.state.IsVisible) {
			this.setState({IsVisible:false})
		}else{
			this.setState({IsVisible:true})
		}

	},
	componentWillUpdate:function(){
		console.log('Box1 will be update!')
	},
	render:function(){
		var list=this.state.children.map(function(item){
			return(<Box2  item={item} key={item.code}/>)
		});
		var visible='none';
		if (this.state.IsVisible) {
				visible='block';
		}
		return(
			<div>
			    <h3	  onClick={this.handleClick}>A B C</h3>
			    <input type="text" onChange={this.handleOnChange}/>
				<div  style={{'paddingLeft':'20px','background':'#f8f8f9'}}>
					{list}
				</div>
			</div>
			)
	}
})
var Box2=React.createClass({
	getInitialState:function(){
		return({
			name:this.props.item.name,
			children:this.props.item.children
		})
	},
/*	shouldComponentUpdate(nextProps,nextState){
		return !this.props==nextProps;
	},*/
	componentWillUpdate:function(){
		console.log('Box2 will be update! aa')
	},
	render:function(){
		var list=this.props.item.children.map(function(item){
			return(<Box3 item={item} key={item.code}/>)
		})
		console.log('Box2 will be update! bb')
		return( <div>
					<h3>{this.state.name}</h3>
					<div  style={{'paddingLeft':'20px','background':'#f8f8f9'}}>
					{list}
					</div>
				</div>)
	}
})
var Box3=React.createClass({
	componentWillUpdate:function(){
		console.log('Box3 will be update!')
	},
	render:function(){
		return(
			<div>{this.props.item.name}</div>
			)
	}
})
var DATAS={
	code:'1',
	name:'a',
	children:[
				{code:'11',name:'aa',children:[ {code:'22',name:'AAA'},
												{code:'23',name:'BBB'},
												{code:'24',name:'CCC'}
												]},
				{code:'12',name:'bb',children:[ {code:'33',name:'AAAA'},
												{code:'34',name:'BBBB'},
												{code:'35',name:'CCCC'}
												]},
				{code:'13',name:'cc',children:[ {code:'44',name:'AAAAA'},
												{code:'45',name:'BBBBB'},
												{code:'46',name:'CCCCC'}
												]}
			 ]
		}
ReactDOM.render(
  <Box1  data={DATAS}/>,
  document.getElementById('container')
);
