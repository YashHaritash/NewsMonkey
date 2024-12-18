import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  articles = [];
  constructor() {
    super();
    console.log("Hello I am a constructor from News Component");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=57f1029c0d784b5f82b7b64937b17043&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrev = async () => {
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=57f1029c0d784b5f82b7b64937b17043&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1, // Corrected here
      loadin: false,
    });
  };

  handleNext = async () => {
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=57f1029c0d784b5f82b7b64937b17043&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1, // Corrected here
      loading: false,
    });
  };

  //   componentDidMount() {
  //     fetch(
  //       "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=57f1029c0d784b5f82b7b64937b17043"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         this.setState({ articles: data.articles || [] }); // Use a fallback to an empty array
  //       })
  //       .catch((error) => console.error("Error fetching data:", error));
  //   }

  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={
                    element.title
                      ? element.title.slice(0, 45)
                      : "No Title Available"
                  }
                  description={
                    element.description
                      ? element.description.slice(0, 88)
                      : "No Description Available"
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iAVMkmIca.mQ/v0/1200x800.jpg"
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container">
          <button
            type="button"
            className="btn btn-secondary btn-sm mx-2 my-3"
            onClick={this.handlePrev}
            disabled={this.state.page <= 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm mx-2 my-3"
            onClick={this.handleNext}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next
          </button>
          <p>
            <strong className="mx-2 my-3">Page : {this.state.page}</strong>
          </p>
        </div>
      </div>
    );
  }
}

export default News;
