import React, { useState } from 'react';
import { postingService } from '../services/posting-service';
import { postingsListStore } from '../stores/postings-list';

export default function AddPostingForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const loadData = postingsListStore((state) => state.loadLatest);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  const clear = () => {
    setTitle('');
    setContent('');
  };

  const save = async () => {
    if (!title || !content) {
      setErrorMessage('All fields are required');
      return;
    }

    setErrorMessage('');
    await postingService.save({
      title,
      content,
    });
    clear();
    await loadData();
  };

  return (
    <div className="form">
      <div className="form-error">{errorMessage}</div>

      <label className="label" htmlFor="title">Title:</label>
      <input className="control-element" id="title" value={title} onChange={handleChangeTitle} />
      <label className="label" htmlFor="content">Content:</label>
      <textarea className="control-element" id="content" value={content} onChange={handleChangeContent} />

      <button className="button" type="button" onClick={save}>ADD</button>
    </div>
  );
}
