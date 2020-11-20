import { Component } from 'react';
import PostsList from '../components/posts-list';
import { ServiceLocatorContext } from '../services/service-locator';
import { PostingEntity } from '../services/posting-service';
import Head from 'next/head';
import Link from 'next/link';

type SearchState = {
  query: string,
  hits: PostingEntity[],
};

export default class Search extends Component<{}, SearchState> {
  static contextType = ServiceLocatorContext;

  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      query: '',
    };
  }

  handleQueryChange = (event) => {
    this.setState({ query: event.target.value });
  };

  fetchData = () => {
    const { query } = this.state;
    if (!query || query.replaceAll(/\s/g, '').length === 0) {
      return;
    }
    this.context.postingService.search(query)
      .then((hits) => {
        this.setState({ hits });
      });
  };

  render() {
    const { hits, query } = this.state;

    return (
      <div className="container">
        <Head>
          <title>Search</title>
        </Head>
        <h1>Search</h1>
        <Link href="/">
          <a className="link">Home</a>
        </Link>
        <div className="form">
          <input className="control-element" value={query} onChange={this.handleQueryChange} />
          <button className="button" onClick={this.fetchData}>Search</button>
        </div>
        <PostsList postingsList={hits} />
      </div>
    );
  }
}
