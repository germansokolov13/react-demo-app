import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { postingsListStore } from '../stores/postings-list';
import SearchResults from '../components/search-results';
import Login from '../components/login';

export default function Search() {
  const empty = postingsListStore((state) => state.empty);
  useEffect(() => {
    empty();
  }, []);

  const [query, setQuery] = useState<string>('');
  const search = postingsListStore((state) => state.search);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const fetchData = () => {
    if (!query || query.replaceAll(/\s/g, '').length === 0) {
      return;
    }
    search(query);
  };

  const handleInputKey = (event) => {
    const ENTER_KEY = 13;
    if (event.keyCode === ENTER_KEY) {
      fetchData();
    }
  };

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>

      <div className="container">
        <Login />
        <h1>Search</h1>
        <div className="links-block">
          <Link href="/">
            <a className="link">Home</a>
          </Link>
        </div>
        <div className="form">
          <input className="control-element" value={query} onChange={handleQueryChange} onKeyUp={handleInputKey} />
          <button type="button" className="button" onClick={fetchData}>Search</button>
        </div>
        <SearchResults />
      </div>
    </>
  );
}
