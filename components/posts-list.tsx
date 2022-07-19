import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { postingsListStore } from '../stores/postings-list';
import { loginStore } from '../stores/login';
import { PostingEntity } from '../services/posting-service';

type PropsType = {
  itemsList: PostingEntity[],
  handleRemove?: (postingId: string) => any,
};

export default function PostsList({ itemsList, handleRemove }: PropsType) {
  const isLoading = postingsListStore((state) => state.isLoading);
  const user = loginStore((state) => state.user);

  const deletePosting = (postingId: string) => async () => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete your posting?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            handleRemove(postingId);
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <div>
      {isLoading && (
        <div>
          Loading...
        </div>
      )}

      {itemsList.map((posting) => (
        <article className="posting" key={posting._id}>
          {posting.s3Key ? (
            <img alt="User posted" className="posting-image" src={`http://127.0.0.1:9000/image-upload-results/${posting.s3Key}`} />
          ) : (
            <>
              <h2 className="posting-title">{posting.title}</h2>
              <div className="posting-content">{posting.content}</div>
            </>
          )}

          <div className="posting-date">{new Date(posting.createdAt).toLocaleString()}</div>
          <div className="posting-user">
            By&nbsp;
            <a className="link" href={`https://github.com/${posting.user.name}`} target="_blank" rel="noreferrer">
              {posting.user.name}
            </a>
            &nbsp;
            <img src={posting.user.avatar} alt="Avatar" width={20} height={20} />
          </div>

          {handleRemove && user && posting.user.id === user.id && (
            <button className="delete-posting-button" type="button" onClick={deletePosting(posting._id)}>&#x274c;</button>
          )}
        </article>
      ))}

      {itemsList.length === 0 && (
        <div>No records</div>
      )}
    </div>
  );
}
