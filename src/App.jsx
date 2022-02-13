
const cNode = document.getElementById('contents');

function ProductTable(props) {
        const productRows = props.prods.map(prod => <ProductRow key={prod.id} prod={prod} />);
        const borderedStyle = {border: "1px solid black", padding: 6,'text-align':'left'};
        return (
        <table style={{'margin-bottom': 15,borderCollapse: "collapse"}}>
        <thead>
        <tr>
        <th style={borderedStyle}>Name</th>
        <th style={borderedStyle}>Price</th>
        <th style={borderedStyle}>Category</th>
        <th style={borderedStyle}>ImageURL</th>
        </tr>
        </thead>
        <tbody>
            {productRows}
        </tbody>
        </table>
        );
    }
   
class ProductAdd extends React.Component {
    constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);  
    }
    handleSubmit(e){
        e.preventDefault();
        const form = document.forms.productAdd;
        const prod = {
            name: form.name.value, price: form.price.value, category: form.category.value, imageURL: form.imageURL.value,
        }
        this.props.createProduct(prod);
        form.name.value="";
        form.price.value="$";
        form.category.value="";
        form.imageURL.value="";
    }
    render() {
        const subHead = {'font-size': 22,'margin-bottom': 15, 'border-bottom':"1px solid black", padding: 4};
        const formFields = {width: "40%", float: "left", margin: 20};
        const pstyle= {padding:0,margin:0,'font-size':'14pt'}
        const fieldWidth = {width:'55%'}
        const btnStyle = {'margin-left': '20px', height: 30, 'margin-top': 10,width: 184,
           'font-weight': 70,
            'background-color': 'white'}
        return(
            <form name= "productAdd" onSubmit={this.handleSubmit}>
                <section>
                    <div style={subHead}>
                        <span>Add a new product to inventory</span>
                    </div>
                    <div>
                        <div style={formFields}>
                            <p style={pstyle}>Category</p>
                            <select style={fieldWidth} id="list" name="category">
                                <option value="Shirts">Shirts</option>
                                <option value="Jeans">Jeans</option>
                                <option value="Jackets">Jackets</option>
                                <option value="Sweaters">Sweaters</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                        <div style={formFields}>
                            <p style={pstyle}>Price Per Unit</p>
                            <input style={fieldWidth} type="text" name="price" defaultValue="$"/> 
                        </div>
                        <div style={formFields}>
                            <p style={pstyle}>Product Name</p>
                            <input style={fieldWidth} type="text" name="name"/>
                        </div>
                        <div style={formFields}>
                            <p style={pstyle}>Image URL</p>
                            <input style={fieldWidth} type="text" name="imageURL"/>
                        </div>
                    </div>
                </section>
                <section>
                    <button style={btnStyle}>Add Product</button>
                </section> 
            </form>
        );
    }
   }
   function ProductRow (props) {
    const borderedStyle = {border: "1px solid black", padding: 4,'font-size':' 17px'};
    const prod = props.prod;
    let link;
    if(prod.imageURL){
        link = <a href={prod.imageURL} target="_blank">View</a>
    }else{
        link = <span>No Image Url added</span>
    }
    return (
    <tr>
    <td style={borderedStyle}>{prod.name}</td>
    <td style={borderedStyle}>{prod.price}</td>
    <td style={borderedStyle}>{prod.category}</td>
    <td style={borderedStyle}>{link}</td>
    </tr>
    );
    
   }
class ProductList extends React.Component {
    constructor(){
        super();
        this.state = {prods:[],};
        this.createProduct = this.createProduct.bind(this);
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        setTimeout(()=> {
            this.setState({prods:[]});
        }, 500);
    }
    createProduct(newprod) {
        const newprods = this.state.prods.slice();
        newprod.id = this.state.prods.length + 1;
        newprods.push(newprod);
        this.setState({prods: newprods});
    }
    render() {
        const subHead = {'font-size': 22,'margin-bottom': 15, 'border-bottom':"1px solid black", padding: 4};
        return (
        <div>
            <h1>My Company Inventory</h1>
            <div style={subHead}>
                <span>Showing all available products</span>
            </div>
            <ProductTable prods={this.state.prods} />
            <ProductAdd createProduct={this.createProduct}/>
        </div>
        );
    }
   }
  

   ReactDOM.render(<ProductList />, cNode); 
