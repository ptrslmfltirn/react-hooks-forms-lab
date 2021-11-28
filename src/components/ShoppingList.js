import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [Search, setName] = useState("")
  const [itemArray, setItemArray] = useState (items)

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  
  function onSearchChange(event) {
    setName(event.target.value)
  }

  function onItemFormSubmit (element){
    setItemArray([...itemArray, element])
  }

  const itemsToDisplay = itemArray.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });
  const displayedItems = itemsToDisplay.filter((item) => {
    if (Search.length < 1) return true;
    return item.name.includes(Search);
  })

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={onSearchChange} nameSearch={Search}/>
      <ul className="Items">
        {displayedItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
