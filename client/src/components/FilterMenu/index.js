import React, { useEffect, useSyncExternalStore } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_FILTERS, UPDATE_CURRENT_FILTER } from "../../utils/actions";
import { QUERY_FILTERS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function FilterMenu() {
  const [state, dispatch] = useStoreContext();

  const { filters } = state;

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
  };

  return(
    <div>
      {filters.map((item) => (
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
  )
}

export default FilterMenu;