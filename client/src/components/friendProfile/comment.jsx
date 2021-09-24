import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class CommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      userid: this.props.userid,
      friendid: this.props.friendid
    }
    this.handleInputChange=this.handleInputChange.bind(this)
    this.handleSubmitComment=this.handleSubmitComment.bind(this)
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmitComment() {
    event.preventDefault()
    axios.post('/comment', {comment: this.state.comment, friendid: this.props.friendid, userid: this.props.userid, commentid: this.props.statid})
    .then(result => {
      this.props.onClose();
    })

  }
  render () {
    if(!this.props.show) {
      return null
    }

    return (
    <div className="c-modal" onClick={this.props.onClose}>
      <div className="c-modal-content" onClick={e => e.stopPropagation()}>
        <div className="c-modal-header">
          <h4 className="c-modal-title">Add Comment</h4>
        </div>
        <div className="c-modal-body">
          <label>
            <span>Your Comment: *   </span>
            <textarea maxLength="1000" name="comment" rows="4" cols="50" value={this.state.comment} onChange={this.handleInputChange}/>
          </label>
          <br></br>
        </div>
        <div className="c-modal-footer">
          <button className='profile-btn' onClick={this.props.onClose}>Close</button>
          <button className="profile-btn" onClick={this.handleSubmitComment}>Submit Comment </button>
        </div>
      </div>
    </div>
    )};
}

export default CommentModal;



