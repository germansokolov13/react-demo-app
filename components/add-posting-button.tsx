import { Component, useState } from 'react';
import { postingService } from '../services/posting-service';

import 'filepond/dist/filepond.min.css';
import { postingsListStore } from '../stores/postings-list';

export default function AddPostingButton() {
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const loadData = postingsListStore(state => state.loadLatest);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  }

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
  }

  return (
    <div className="form">
      <div>{errorMessage}</div>
      <label className="label" htmlFor="title">Title:</label>
      <input className="control-element" name="title" value={title} onChange={handleChangeTitle} />
      <label className="label" htmlFor="content">Content:</label>
      <textarea className="control-element" name="content" value={content} onChange={handleChangeContent} />
      <button className="button" onClick={save}>ADD</button>
    </div>
  );
}
