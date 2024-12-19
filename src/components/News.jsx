import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "science",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [];
  constructor(props) {
    super(props);
    console.log("Hello I am a constructor from News Component");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = this.capitalizeWord(`${this.props.category} - NewsMonkey`);
  }
  capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  async updateNews() {
    this.props.setProgress(10);
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrev = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNext = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1; // Calculate the next page
    this.setState({ page: nextPage }); // Update the state first

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    // Append new articles to the existing articles array
    this.setState({
      articles: [...this.state.articles, ...parsedData.articles],
      totalResults: parsedData.totalResults,
    });
  };



  render() {
    return (
      <>
        <h2 className="my-3">
          NewsMonkey - Top {this.capitalizeWord(`${this.props.category}`)}{" "}
          Headlines
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="continer">
            <div className="row">
              {this.state.articles.map((element) => {
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
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container">
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
        </div> */}
      </>
    );
  }
}

export default News;
