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

  componentDidMount() {
    this.getListOfPokemon();
  }

  getListOfPokemon() {
    let names = [] as any;
    fetch(baseAPI).then((res) => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      }
      res.json().then((data) => {
        data.results.map((name: any) => {
          names.push(name.name);
        });
        this.setState({ error: false });
        this.getDetailsOfPokemon(names);
      });
    });
  }

  getDetailsOfPokemon(names: any) {
    let listOfPokemon = [] as any;
    names.map((name: any) => {
      fetch(`${baseAPI}${name}`).then((res) => {
        if (res.status !== 200) {
          this.setState({ error: true });
          return;
        }
        res.json().then((data) => {
          listOfPokemon.push(data);
          this.setState({
            error: false,
            listOfPokemon: listOfPokemon,
            isLoaded: false,
          });
        });
      });
    });
  }

  deleteHandler = (index: number): void => {
    const items = [...this.state.listOfPokemon];
    items.splice(index, 1);
    this.setState({ listOfPokemon: items });
  };

  changeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value }: any = e.target;
    console.log(" inchange ", value);
    this.setState({
      search: value.toLowerCase(),
    });
  };

  // searchClick = (
  //   e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  // ): void => {
  //   let listOfPokemon = [] as any;
  //   const inputValue = this.state.search;
  //   fetch(`${baseAPI}${inputValue}`).then((res) => {
  //     this.setState({ isLoaded: true });
  //     if (res.status !== 200) {
  //       this.setState({
  //         error: true,
  //         isLoaded: false,
  //         listOfPokemon: [],
  //       });
  //       return;
  //     }
  //     res.json().then((data) => {
  //       listOfPokemon.push(data);
  //       this.setState({
  //         error: false,
  //         isLoaded: false,
  //         listOfPokemon: listOfPokemon,
  //       });
  //     });
  //   });
  // };

  render(): JSX.Element {
    let { listOfPokemon } = this.state;

    let searchItem = listOfPokemon.filter((search: any) => {
      return (
        search.id.toString().indexOf(this.state.search) !== -1 ||
        search.name.indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    return (
      <div className="App">
        <div style={{ fontSize: 30, color: "black", fontWeight: "bold" }}>
          <span> Find your favorite </span> <br />
          <span> Pokemon </span> <br />
        </div>
        <SearchBar
          changeHandler={this.changeHandler}
          search={this.state.search}
          // searchButton={this.searchClick}
        />

        <ErrorMessage error={this.state.error} loading={this.state.isLoaded} />
        {listOfPokemon.length !== 0 && (
          <Lists
            key={StringUtils.GenUUID()}
            searchItem={searchItem}
            deleteHandler={this.deleteHandler}
          />
        )}
      </div>
    );
  }
}

export default Home;
