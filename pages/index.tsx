import react, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import PostsList from '../components/posts-list';
import AddPostingButton from '../components/add-posting-button';
import Login from '../components/login';
import { loginStore } from '../stores/user-profile';
import SendFile from '../components/send-file';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { postingsListStore } from '../stores/postings-list';

export default function Home() {
  const loadData = postingsListStore(state => state.loadLatest);
  useEffect(() => {
    loadData();
  }, []);

  const user = loginStore(state => state.user);

  return <>
    <div className="container">
      <Head>
        <title>React Demo App (by Gherman Sokolov)</title>
      </Head>

      <Login />

      <h1>React Demo App (by Gherman Sokolov)</h1>

      <div className="links-block">
        <Link href="/search">
          <a className="link">Full-text Search</a>
        </Link>
      </div>

      {user ? (
        <Tabs>
          <TabList>
            <Tab>Text Message</Tab>
            <Tab>Send Image</Tab>
          </TabList>

          <TabPanel>
            <AddPostingButton />
          </TabPanel>
          <TabPanel>
            <SendFile />
          </TabPanel>
        </Tabs>
      ) : (
        <div className="text-block">
          (Log in to post text message or image)
        </div>
      )}

      <PostsList />
    </div>
  </>;
}