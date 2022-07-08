import react from 'react';
import { postingsListStore } from '../stores/postings-list';

export default function PostsList() {
  const postingsList = postingsListStore(state => state.postingsList);
  const isLoading = postingsListStore(state => state.isLoading);

  return (
    <div>
      {isLoading && (
        <div>
          Loading...
        </div>
      )}

      {postingsList.map(posting => (
        <article className="posting" key={posting._id}>
          {posting.s3Key ? (
            <>
              <img className="posting-image" src={`http://127.0.0.1:9000/image-upload-results/${posting.s3Key}`} />
              <div>{posting.createdAt}</div>
            </>
          ) : (
            <>
              <h2 className="posting-title">{posting.title}</h2>
              <div>{posting.content}</div>
              <div>{posting.createdAt}</div>
            </>
          )}
        </article>
      ))}
      {postingsList.length === 0 && (
        <div>No records</div>
      )}
    </div>
  );
}
