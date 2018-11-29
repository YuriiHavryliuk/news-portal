import React, { Component } from 'react'

import isArrayValid from '../../utils/isArrayValid'
import style from './style.css'

export default class Comments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }
  }

  render() {
    const { comments } = this.props
    const { visible } = this.state
    return (
      <div>
        {isArrayValid(comments) && (
          <div>
            <h3 className="comments__title">comments ({comments.length})</h3>
            <button
              onClick={this.showsComments}
              className="comments__btn btn-primary"
            >
              {visible ? 'hide' : 'show'} comments
            </button>
            {visible && (
              <div className="comment__content">
                {comments.map(comment => (
                  <div className="comment__text" key={comment.id}>
                    {comment.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {!isArrayValid(comments) && (
          <div>
            <b>Для этой статьи нет комментариев</b>
          </div>
        )}
      </div>
    )
  }
  showsComments = e => {
    this.setState(prevState => ({ visible: !prevState.visible }))
  }
}
