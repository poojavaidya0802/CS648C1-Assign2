
const cNode = document.getElementById('contents');

function ProductTable(props) {
    const productRows = props.prods.map(prod => React.createElement(ProductRow, { key: prod.id, prod: prod }));
    const borderedStyle = { border: "1px solid black", padding: 6, 'text-align': 'left' };
    return React.createElement(
        'table',
        { style: { 'margin-bottom': 15, borderCollapse: "collapse" } },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    { style: borderedStyle },
                    'Name'
                ),
                React.createElement(
                    'th',
                    { style: borderedStyle },
                    'Price'
                ),
                React.createElement(
                    'th',
                    { style: borderedStyle },
                    'Category'
                ),
                React.createElement(
                    'th',
                    { style: borderedStyle },
                    'ImageURL'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            productRows
        )
    );
}

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAdd;
        const prod = {
            name: form.name.value, price: form.price.value, category: form.category.value, imageURL: form.imageURL.value
        };
        this.props.createProduct(prod);
        form.name.value = "";
        form.price.value = "$";
        form.category.value = "";
        form.imageURL.value = "";
    }
    render() {
        const subHead = { 'font-size': 22, 'margin-bottom': 15, 'border-bottom': "1px solid black", padding: 4 };
        const formFields = { width: "40%", float: "left", margin: 20 };
        const pstyle = { padding: 0, margin: 0, 'font-size': '14pt' };
        const fieldWidth = { width: '55%' };
        const btnStyle = { 'margin-left': '20px', height: 30, 'margin-top': 10, width: 184,
            'font-weight': 70,
            'background-color': 'white' };
        return React.createElement(
            'form',
            { name: 'productAdd', onSubmit: this.handleSubmit },
            React.createElement(
                'section',
                null,
                React.createElement(
                    'div',
                    { style: subHead },
                    React.createElement(
                        'span',
                        null,
                        'Add a new product to inventory'
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { style: formFields },
                        React.createElement(
                            'p',
                            { style: pstyle },
                            'Category'
                        ),
                        React.createElement(
                            'select',
                            { style: fieldWidth, id: 'list', name: 'category' },
                            React.createElement(
                                'option',
                                { value: 'Shirts' },
                                'Shirts'
                            ),
                            React.createElement(
                                'option',
                                { value: 'Jeans' },
                                'Jeans'
                            ),
                            React.createElement(
                                'option',
                                { value: 'Jackets' },
                                'Jackets'
                            ),
                            React.createElement(
                                'option',
                                { value: 'Sweaters' },
                                'Sweaters'
                            ),
                            React.createElement(
                                'option',
                                { value: 'Accessories' },
                                'Accessories'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: formFields },
                        React.createElement(
                            'p',
                            { style: pstyle },
                            'Price Per Unit'
                        ),
                        React.createElement('input', { style: fieldWidth, type: 'text', name: 'price', defaultValue: '$' })
                    ),
                    React.createElement(
                        'div',
                        { style: formFields },
                        React.createElement(
                            'p',
                            { style: pstyle },
                            'Product Name'
                        ),
                        React.createElement('input', { style: fieldWidth, type: 'text', name: 'name' })
                    ),
                    React.createElement(
                        'div',
                        { style: formFields },
                        React.createElement(
                            'p',
                            { style: pstyle },
                            'Image URL'
                        ),
                        React.createElement('input', { style: fieldWidth, type: 'text', name: 'imageURL' })
                    )
                )
            ),
            React.createElement(
                'section',
                null,
                React.createElement(
                    'button',
                    { style: btnStyle },
                    'Add Product'
                )
            )
        );
    }
}
function ProductRow(props) {
    const borderedStyle = { border: "1px solid black", padding: 4, 'font-size': ' 17px' };
    const prod = props.prod;
    let link;
    if (prod.imageURL) {
        link = React.createElement(
            'a',
            { href: prod.imageURL, target: '_blank' },
            'View'
        );
    } else {
        link = React.createElement(
            'span',
            null,
            'No Image Url added'
        );
    }
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            { style: borderedStyle },
            prod.name
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            prod.price
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            prod.category
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            link
        )
    );
}
class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { prods: [] };
        this.createProduct = this.createProduct.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        setTimeout(() => {
            this.setState({ prods: [] });
        }, 500);
    }
    createProduct(newprod) {
        const newprods = this.state.prods.slice();
        newprod.id = this.state.prods.length + 1;
        newprods.push(newprod);
        this.setState({ prods: newprods });
    }
    render() {
        const subHead = { 'font-size': 22, 'margin-bottom': 15, 'border-bottom': "1px solid black", padding: 4 };
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'My Company Inventory'
            ),
            React.createElement(
                'div',
                { style: subHead },
                React.createElement(
                    'span',
                    null,
                    'Showing all available products'
                )
            ),
            React.createElement(ProductTable, { prods: this.state.prods }),
            React.createElement(ProductAdd, { createProduct: this.createProduct })
        );
    }
}

ReactDOM.render(React.createElement(ProductList, null), cNode);