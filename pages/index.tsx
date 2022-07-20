import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
 Tab, TabList, TabPanel, Tabs,
} from 'react-tabs';
import AddPostingForm from '../components/add-posting-form';
import Login from '../components/login';
import { loginStore } from '../stores/login';
import SendFile from '../components/send-file';
import LatestPosts from '../components/latest-posts';

export default function Home() {
  const user = loginStore((state) => state.user);

  return (
    <>
      <Head>
        <title>React Demo App (by Gherman Sokolov)</title>
      </Head>

      <div className="container">
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
              <AddPostingForm />
            </TabPanel>
            <TabPanel>
              <SendFile />
            </TabPanel>
          </Tabs>
        ) : (
          <div className="text-block">
            Log in to post a text message or an image
          </div>
        )}

        <LatestPosts />
      </div>
    </>
  );
}
