var Product = React.createClass({
  getInitialState: function() {
    return {
      qty: 0
    };
  },
  buy: function() {
    this.setState({qty: this.state.qty + 1}); 
    this.props.handleTotal(this.props.price);
  },
  show: function() {
    this.props.handleShow(this.props.name);
  },
  render: function() {
    return (
      <div>
        <p>{this.props.name} - £{this.props.price}</p>
        <button onClick={this.buy}>Buy</button>
        <button onClick={this.show}>Show</button>
        <p>Quantity: {this.state.qty} item{this.state.qty>1 ? 's': ''}</p>
      </div>
    )
  }
});

var Total = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Total Cash: £{this.props.total}</h3>
      </div>
    );
  }
});

var ProductForm = React.createClass({
  submit: function(e) {
    e.preventDefault();
    var product = {
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value)
    };
    this.props.handleAddProduct(product);
    this.refs.name.value = "";
    this.refs.price.value = 0;
  },
  render: function() {
    return (
      <form onSubmit={this.submit}>
        <input type="text" placeholder="Product Name" ref="name" /> -
        <input type="text" placeholder="Product Price" ref="price" />
        <br/>
        <button>Create Product</button>
      </form>
    );
  }
});

var ProductList = React.createClass({
  getInitialState: function() {
    return {
      total: 0,
      productList: [
        {name: "Samsung", price: 189.99},
        {name: "iPhone", price: 199.99},
        {name: "Nokia", price: 200.99}
      ]
    };
  },
  createProduct: function(product) {
    this.setState({
      productList: this.state.productList.concat(product)
    });
  },
  calculateTotal: function(price) {
    this.setState({total: this.state.total + price});
  },
  showProduct: function(name) {
    alert("You selected " + name);
  },
  render: function() {
    var component = this;
    var products = this.state.productList.map(function(product) {
      return (
        <Product name={product.name} 
        price={product.price} 
        handleShow={component.showProduct} 
        handleTotal={component.calculateTotal} />
      );
    });
    return (
      <div>
        <ProductForm handleAddProduct={this.createProduct} />
        {products}
        <Total total={this.state.total} />
      </div>
    );
  }
});

React.render(<ProductList/>, document.getElementById("root"));