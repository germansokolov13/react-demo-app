import react, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import PostsList from '../components/posts-list';

import { postingsListStore } from '../stores/postings-list';

export default function Search() {
  const [ query, setQuery ] = useState<string>('');
  const search = postingsListStore(state => state.search);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const fetchData = () => {
    const { query } = this.state;
    if (!query || query.replaceAll(/\s/g, '').length === 0) {
      return;
    }
    search(query);
  };

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
        <input className="control-element" value={query} onChange={handleQueryChange} />
        <button className="button" onClick={fetchData}>Search</button>
      </div>
      <PostsList />
    </div>
  );
}