import { useState } from "react";

function OrderForm({ addOrder }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const newOrder = {
      id: Date.now(),
      name,
      ingredients,
    };

    addOrder(newOrder);
    clearInputs();
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const addIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={() => addIngredient(ingredient)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button type="submit">Submit Order</button>
    </form>
  );
}

export default OrderForm;
