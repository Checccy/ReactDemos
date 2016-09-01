var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.name.indexOf(this.props.filterState.filterText)<0||(!product.stocked&&this.props.filterState.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    }.bind(this));
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
	  handleInputOnchange:function (name,event) {
    var filterState={};
    filterState[name]=name=='filterText'?event.target.value:event.target.checked;
    this.props.onInputChange(filterState);
  },
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Search..." value={this.props.filterState.filterText}  onChange={this.handleInputOnchange.bind(this,'filterText')}/>
        <p>
          <input type="checkbox" checked={this.props.filterState.inStockOnly} onChange={this.handleInputOnchange.bind(this,'inStockOnly')} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

var FilterableProductTable = React.createClass({
  getInitialState:function () {
    return{
      filterText:'',
      inStockOnly:false,
    }
  },
  handleInputOnchange:function (filterState) {
    this.setState(filterState);
  },
  render: function() {
    return (
      <div>
        <SearchBar filterState={this.state} onInputChange={this.handleInputOnchange}/>
        <ProductTable products={this.props.products} filterState={this.state} />
      </div>
    );
  }
});


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
