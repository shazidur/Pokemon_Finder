import React from "react";
import "./SearchBar.css";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
  changeHandler: Function;
  search: any;
  searchButton: any;
}

class SearchBar extends React.Component<SearchBarProps> {
  render() {
    return (
      <Input
        prefix={<SearchOutlined style={{ color: "#c9c9c9" }} />}
        className={"searchBar"}
        placeholder="Search by Pokedex ID"
        onChange={(event: any) => this.props.changeHandler(event)}
        type="text"
        value={this.props.search}
        suffix={
          <span onClick={this.props.searchButton} className={"searchButton"}>
            SEARCH
          </span>
        }
      />
    );
  }
}
export default SearchBar;
