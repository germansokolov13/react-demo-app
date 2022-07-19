import React, { useEffect } from 'react';
import PostsList from './posts-list';
import { postingsListStore } from '../stores/postings-list';
import { postingService } from '../services/posting-service';

export default function SearchResults() {
  const postingsList = postingsListStore((state) => state.postingsList);
  const empty = postingsListStore((state) => state.empty);
  const removeFromList = postingsListStore((state) => state.removeFromList);

  useEffect(() => {
    empty();
  }, []);

  const deletePosting = async (postingId: string): Promise<void> => {
    await postingService.deletePosting(postingId);
    removeFromList(postingId);
  };

  return (
    <PostsList
      itemsList={postingsList}
      handleRemove={deletePosting}
    />
  );
}
