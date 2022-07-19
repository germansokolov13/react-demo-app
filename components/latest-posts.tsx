import React, { useEffect } from 'react';
import PostsList from './posts-list';
import { postingsListStore } from '../stores/postings-list';
import { postingService } from '../services/posting-service';

export default function LatestPosts() {
  const postingsList = postingsListStore((state) => state.postingsList);
  const loadLatest = postingsListStore((state) => state.loadLatest);

  useEffect(() => {
    loadLatest();
  }, []);

  const deletePosting = async (postingId: string): Promise<void> => {
    await postingService.deletePosting(postingId);
    loadLatest();
  };

  return (
    <PostsList
      itemsList={postingsList}
      handleRemove={deletePosting}
    />
  );
}
