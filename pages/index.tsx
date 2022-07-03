import react, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import { getPostingsListBothSides } from '../services/posting-service';
import PostsList, { PostsListProps } from '../components/posts-list';
import AddPostingButton from '../components/add-posting-button';
import Login from '../components/login';

export async function getServerSideProps(): Promise<{ props: PostsListProps }> {
  return {
    props: {
      postingsList: await getPostingsListBothSides()
    },
  }
}

export default class Home extends Component<PostsListProps, PostsListProps> {
  constructor(props) {
    super(props);
    this.state = {
      postingsList: props.postingsList,
    };
  }

  update = () => {
    getPostingsListBothSides()
      .then((postingsList) => {
        this.setState( { postingsList });
      });
  }

  render() {
    const { postingsList } = this.state;

    return <>
      <div className="container">
        <Head>
          <title>React Demo App (by Gherman Sokolov)</title>
        </Head>

        <Login />

        <h1>React Demo App (by Gherman Sokolov)</h1>
        <Link href="/search">
          <a className="link">Full-text Search</a>
        </Link>
        <AddPostingButton onAddPosting={this.update} />
        <PostsList postingsList={postingsList} />
      </div>
    </>;
  }
};

