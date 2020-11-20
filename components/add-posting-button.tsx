import { Component } from 'react';
import { ServiceLocatorContext } from '../services/service-locator';

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
      </div>
    );
  }
}
