import React, { Component } from "react";
import Lists from "../Lists/Lists";
import SearchBar from "../Search/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import StringUtils from "../Utility/genID";

const baseAPI = "https://pokeapi.co/api/v2/pokemon/";

interface HomeState {
  error: boolean;
  listOfPokemon: any;
  isLoaded: boolean;
  search: string;
  Test: HomeProps;
}

interface HomeProps {
  name: string;
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      error: false,
      listOfPokemon: [] as any,
      isLoaded: false,
      search: "",
      Test: null,
    };
  }

  // this is the new test for the Jenkins Push

  componentDidMount() {
    // this.getDataFromAPI();
  }

  // async getDataFromAPI() {
  //   let response1 = await fetch(baseAPI);
  //   let json = await response1.json();
  //   let pokemonNames = await json.results;
  //   let names = [] as any;
  //   pokemonNames.map((name: any) => {
  //     names.push(name.name);
  //     this.getDetailsOfPokemon(names);
  //   });
  // }

  // async getDetailsOfPokemon(names: any) {
  //   let listOfPokemon = [] as any;
  //   let getName = names.map((name: string) => {
  //     return name;
  //   });

  //   let response = await fetch(`${baseAPI}${getName} `);
  //   let pokemon = await response.json();
  // }

  deleteHandler = (index: number): void => {
    const items = [...this.state.listOfPokemon];
    items.splice(index, 1);
    this.setState({ listOfPokemon: items });
  };

  changeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value }: any = e.target;
    this.setState({
      search: value.toLowerCase(),
    });
  };

  searchClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ): void => {
    this.getData()
      .then((data) => {
        this.setState({
          listOfPokemon: data,
          isLoaded: false,
          error: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          error: true,
          isLoaded: false,
          listOfPokemon: [],
        });
      });
  };

  async getData() {
    let listOfPokemon = [] as any;
    const inputValue = this.state.search;
    let response = await fetch(`${baseAPI}${inputValue}`);
    let searchItem = [await response.json()];
    return searchItem;
  }

  render(): JSX.Element {
    let { listOfPokemon } = this.state;

    // let searchItem = listOfPokemon.filter((search: any) => {
    //   return (
    //     search.id.toString().indexOf(this.state.search) !== -1 ||
    //     search.name.indexOf(this.state.search.toLowerCase()) !== -1
    //   );
    // });

    return (
      <div className="App">
        <div style={{ fontSize: 30, color: "black", fontWeight: "bold" }}>
          <span> Find your favorite </span> <br />
          <span> Pokemon </span> <br />
        </div>
        <SearchBar
          changeHandler={this.changeHandler}
          search={this.state.search}
          searchButton={this.searchClick}
        />

        <ErrorMessage error={this.state.error} loading={this.state.isLoaded} />
        {listOfPokemon.length !== 0 && (
          <Lists
            key={StringUtils.GenUUID()}
            searchItem={listOfPokemon}
            deleteHandler={this.deleteHandler}
          />
        )}
      </div>
    );
  }
}

export default Home;
