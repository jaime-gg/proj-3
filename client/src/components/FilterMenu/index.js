import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_FILTERS, UPDATE_CURRENT_FILTER } from "../../utils/actions";
import { QUERY_FILTERS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { Link } from "react-router-dom";

function FilterMenu() {
  const [state, dispatch] = useStoreContext();

  const { filters, books } = state;

  const { loading, data: filterData } = useQuery(QUERY_FILTERS);

  useEffect(() => {
    if (filterData) {
      dispatch({
        type: UPDATE_FILTERS,
        filters: filterData.filters,
      });
      filterData.filters.forEach((filter) => {
        idbPromise("filters", "put", filter);
      });
    } else if (!loading) {
      idbPromise("filters", "get").then((filters) => {
        dispatch({
          type: UPDATE_FILTERS,
          filters: filters,
        });
      });
    }
  }, [filterData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_FILTER,
      currentFilter: id,
    });

    console.log(id);
  };

  return (
    <div className="underNav">
      {/* <ul> */}
      {/* <li><Link to="/">All</Link></li> */}
      <button
        className="filter-btn"
        onClick={() => {
          handleClick();
        }}
      >
        All
      </button>
      {filters.map((item) => (
        // <li>
        <button
          className="filter-btn"
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
        // </li>
      ))}
      {/* </ul> */}
    </div>
  );
}

export default FilterMenu;
