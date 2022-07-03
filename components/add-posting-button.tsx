import { Component } from 'react';
import { ServiceLocatorContext } from '../services/service-locator';
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';
import axios from 'axios';
import config from '../env-config';

type AddPostingButtonProps = {
  onAddPosting: () => void,
}

type AddPostingButtonState = {
  title: string,
  content: string,
  errorMessage: string,
};

export default class AddPostingButton extends Component<AddPostingButtonProps, AddPostingButtonState> {
  static contextType = ServiceLocatorContext;

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      errorMessage: '',
    };
  }

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  handleChangeContent = (event) => {
    this.setState({ content: event.target.value });
  }

  // Long list of params is dictated by FilePond 3rd part component
  processFile = (fieldName, file, metadata, load, error, progress, abort) => {
    const { backendAddress } = config;

    const request = new XMLHttpRequest();
    request.open('POST', 'http://127.0.0.1:9000/image-uploads');
    request.upload.onprogress = (e) => {
      progress(e.lengthComputable, e.loaded, e.total);
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('Content-Type', file.type);

    axios.get(`${backendAddress}/image-uploads/get-image-upload-fields/`)
      .then(({ data: imageUploadFields }) => {
        Object.keys(imageUploadFields).forEach(key => {
          formData.append(key, imageUploadFields[key]);
        });
        const s3Key =  imageUploadFields['key'];

        request.onload = () => {
          if(request.status >= 200 && request.status < 300) {
            const processingData = { s3Key };
            axios.post(`${backendAddress}/image-uploads/start-processing/`, processingData)
              .then(() => {
                load();
              })
              .catch(() => {
                error();
              });
          } else {
            error();
          }
        }

        if (!request['wasAborted']) {
          request.send(formData);
        }
      })
      .catch(() => {
        error();
      });

    return {
      abort: () => {
        request['wasAborted'] = true;
        request.abort();
        abort();
      }
    }
  }

  save = () => {
    const { onAddPosting } = this.props;
    const { title, content } = this.state;
    if (!title || !content) {
      this.setState({ errorMessage: 'All fields are required' });
      return;
    }

    this.setState({ errorMessage: '' });
    this.context.postingService.save({
      title,
      content,
    })
      .then(() => {
        if (onAddPosting) {
          onAddPosting();
        }
      });
  }

  render() {
    const { title, content, errorMessage } = this.state;

    return (
      <div className="form">
        <div>{errorMessage}</div>
        <label className="label" htmlFor="title">Title:</label>
        <input className="control-element" name="title" value={title} onChange={this.handleChangeTitle} />
        <label className="label" htmlFor="content">Content:</label>
        <textarea className="control-element" name="content" value={content} onChange={this.handleChangeContent} />
        <button className="button" onClick={this.save}>ADD</button>


        <FilePond allowMultiple={false} server={{ process: this.processFile }} />
      </div>
    );
  }
}
