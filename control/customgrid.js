var virtualData=[{code:1,name:'janury'},{code:2,name:'february'},{code:3,name:'march'},{code:4,name:'april'},{code:5,name:'may'},{code:6,name:'june'},{code:7,name:'july'}]


var CustomGridBox=React.createClass({
		getInitialState:function () {
			return{
				filterText:"",
			};
		},
		handlePanelToggle:function () {
			this.refs.listPanel.toggle();
		},
		
		render:function () {
			return(
					<div className="list-hold">
						<ListContainer data={this.props.data} handlePanelToggle={this.handlePanelToggle} />
						<ListPanel data={this.props.data} ref="listPanel" />
					</div>
				)
		}

})

var ListContainer=React.createClass({
	render:function () {
		return(
			<div className="list-hold-container">
				<div className="list-holder tab-title">名称：</div>
       			<div className="list-holder selected-list"></div>
        		<span className="glyphicon glyphicon-plus add-btn" onClick={this.props.handlePanelToggle} ></span>
			</div>
			)
	}
})
var ListPanel=React.createClass({
	getInitialState:function () {
		return{
			filterText:"",
		};
	},
	onInputChange:function (state) {
		this.setState(state);
	},
	toggle:function () {
		$(this.refs.panel).fadeToggle()
	},
	render:function () {
		return(
		<div className="list-panel" ref="panel">
			<PanelHeader handlePanelToggle={this.toggle} onInputChange={this.onInputChange}/>
			<PanelList data={this.props.data} filterText={this.state.filterText}/>
			<div className="tab-footer"><span id="confirm" className="btn-delayering btn-info" onClick={this.toggle}>确认</span></div>
		</div>
			)
	}
})
var PanelHeader=React.createClass({
	handleInputOnChange:function (name,event) {
		var newState={};
		newState[name]=event.target.value;
		this.props.onInputChange(newState);
	},
	render:function () {
		return(
        <div className="tab-header">
        	<span  className="glyphicon glyphicon-remove delete-btn" onClick={this.props.handlePanelToggle}></span>
            <input type="text"  className="normal-txt" onChange={this.handleInputOnChange.bind(this,"filterText")}/>
            <input type="button"  value="搜索" className="item-btn" />
            <input type="button"  value="全选" className="item-btn" />
            <input type="button"  value="清除" className="item-btn" />
        </div>
			)
	}
})
var PanelList=React.createClass({
	render:function () {
		var items=[];
		this.props.data.forEach(function (item) {
			if (item.name.indexOf(this.props.filterText)<0) {
				return;
			}
			items.push(
				<DataItem item={item} key={item.code}/>
				)
		}.bind(this))
		return(
        <div className="tab-scoller">
            <ul className="search-list">
                {items}
            </ul>
        </div>
			)
	}
})

var DataItem=React.createClass({
		getInitialState:function(){
			return{isChecked:false}
		},
		handleItemClick:function(){
			if (this.state.isChecked) {
				this.setState({isChecked:false})
			}else{
				this.setState({isChecked:true})
			}
		},
		render:function(){
			return(
				<li title={this.props.item.name}  ref="single" onClick={this.handleItemClick} className={this.state.isChecked?'select':''}>
				{this.props.item.name}
				<span className="selected-logo-container"><span className="selected-logo glyphicon glyphicon-ok"></span></span>
                </li>
                )
			}

})
var SelectItem=React.createClass({
		render:function(){
			return(
				<label title="血" class="condition-selected" code="1">血<span class="delete-logo"></span></label>
				)
		}	
})

ReactDOM.render(<CustomGridBox data={virtualData}/>,document.getElementById('container'))