import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { userStoreContext, useStoreContext } from "../../utils/GlobalState";

function CategoryMenu() {
  //call upon useStoreContext to retrieve the current state from global state object and use dispatch to update state
  const [state, dispatch] = useStoreContext();

  //destructure categories out of the state returned by the storecontext
  const { categories } = state;

  // dont actually have any data in state, so we need to use categoryData that returns and use the dispatch method to set our global state
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    //if categoryData exists or has changed from the response of useQuery, then run dispatch
    if (categoryData) {
      // execute our dispath function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
    }
  }, [categoryData, dispatch]);

  //update the click handler to update global state instead of using the function we recieve as a prop form the home component
  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };
  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
