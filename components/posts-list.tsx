import react, { Component } from 'react';
import { PostingEntity } from '../services/posting-service';

export type PostsListProps = {
  postingsList: PostingEntity[],
};

export default class PostsList extends Component<PostsListProps, {}> {
  render() {
    const { postingsList } = this.props;

    return (
      <div>
        {postingsList.map(posting => (
          <article className="posting" key={posting._id}>
            <h2 className="posting-title">{posting.title}</h2>
            <div>{posting.content}</div>
          </article>
        ))}
        {postingsList.length === 0 && (
          <div>No records</div>
        )}
      </div>
    );
  }
}
