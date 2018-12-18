import React, { Component, Fragment } from 'react'
import articles from '../../fixtures'
import style from './style.css'
import Article from './components/Article'

import ThemeContext from '../../contexts'

export default class ArticleList extends Component {
  state = { showRemoveBtn: true, articles: articles }

  showRemoveBtn = () => {
    this.setState(prevState => ({ showRemoveBtn: !prevState.showRemoveBtn }))
  }

  render() {
    const { showRemoveBtn, articles } = this.state
    return (
      <div className="articles">
        <h4>News portal</h4>
        <button
          className="btn-primary article__btn btn-dark"
          onClick={this.showRemoveBtn}
        >
          CHANGE
        </button>
        {articles.map(article => (
          <Fragment key={article.id}>
            <ThemeContext.Provider value={showRemoveBtn}>
              <Article article={article} removeArticle={this.removeArticle} />
            </ThemeContext.Provider>
          </Fragment>
        ))}
      </div>
    )
  }

  removeArticle = () => {
    const articles = this.state.articles
    console.log(articles)
    const indexArticle = articles.findIndex(
      article => article === this.props.article
    )
    articles.splice(indexArticle, 1)
    this.setState({ articles: articles })
    this.setState({ modalIsOpen: false })
  }
}
