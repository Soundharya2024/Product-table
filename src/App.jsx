import { useState } from "react";

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStock, setInStock] = useState(false);

  function handleCheckboxChange() {
    setInStock((prevState) => !prevState);
  }

  function handleSearchTextChange(newSearchText) {
    setFilterText(newSearchText);
  }

  return (
    <>
      <SearchBar
        filterText={filterText}
        inStock={inStock}
        handleCheckboxChange={handleCheckboxChange}
        handleSearchTextChange={handleSearchTextChange}
      />
      <ProductTable
        filterText={filterText}
        inStock={inStock}
        products={products}
      />
    </>
  );
}

function SearchBar({
  filterText,
  inStock,
  handleCheckboxChange,
  handleSearchTextChange,
}) {
  return (
    <div>
      <input
        type="text"
        name="SearchProducts"
        id="SearchProducts"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => handleSearchTextChange(e.target.value)}
      />
      <br />
      <div className="checkboxInput">
        <input
          type="checkbox"
          name="filterProducts"
          id="filterProducts"
          checked={inStock}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="filterProducts" className="inline">
          Only show products in stock
        </label>
      </div>
    </div>
  );
}

function ProductTable({ filterText, inStock, products }) {
  const productCategories = products.reduce((acc, curr) => {
    !acc.includes(curr.category) && acc.push(curr.category);
    return acc;
  }, []);
  let rows = [];
  productCategories.forEach((category) => {
    products
      .filter((product) => product.category === category)
      .filter((categorisedProduct) =>
        inStock ? categorisedProduct.stocked : true
      )
      .filter((searchedProduct) =>
        searchedProduct.name.toLowerCase().includes(filterText.toLowerCase())
      )
      .forEach((filteredProduct, index) => {
        index === 0 && rows.push(<ProductCategoryRow category={category} />);
        rows.push(<ProductRow product={filteredProduct} />);
      });
  });

  return (
    <table>
      <thead>
        {rows.length > 0 ? (
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        ) : (
          <tr>No products to display</tr>
        )}
      </thead>
      <tbody>{rows.length > 0 && rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  return (
    <tr>
      <td style={product.stocked ? {} : { color: "red" }}>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];
