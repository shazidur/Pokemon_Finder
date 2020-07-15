import React from "react";
import List from "./List/List";
import StringUtils from "../Utility/genID";

interface ListsProps {
  searchItem: any;
  deleteHandler: Function;
}

class Lists extends React.Component<ListsProps> {
  render() {
    const searchItem = this.props.searchItem;
    return searchItem.map((item: any, index: any) => {
      return (
        <div key={StringUtils.GenUUID()}>
          <List
            name={item.name}
            img={item.sprites.front_default}
            types={item.types}
            order={item.id}
            click={() => this.props.deleteHandler(index)}
          />
        </div>
      );
    });
  }
}

export default Lists;
