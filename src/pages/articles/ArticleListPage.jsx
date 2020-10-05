import React from 'react'
import { List, Button, message, Modal } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { fetchArticles, deleteArticle } from '../../redux/actions/article'
import moment from 'moment'

const ArticleListItem = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (props.article.state.status === "failed") {
      message.error({
        content: props.article.state.error
      })
    }
  }, [props.article.state.status, props.article.state.error])

  const handleDelete = () => {
    Modal.confirm({
      centered: true,
      title: "Are you sure?",
      content: "You cannot undo after deleted.",
      onOk: () => dispatch(deleteArticle(props.article.id))
    })
  }

  return (
    <List.Item
      actions={[
        <Link to={`/articles/${props.article.id}/edit`}><Button>Edit</Button></Link>,
        <Button onClick={handleDelete}>Delete</Button>
      ]}
    >
      <List.Item.Meta
        title={props.article.title || <i>Untitled</i>}
        description={`Created by ${props.article.author.name} — created at ${moment(props.article.createdAt).format("llll")} — last updated at ${moment(props.article.updatedAt).format("llll")}`}
      />
    </List.Item>
  )
}
const ArticleListPage = props => {
  const dispatch = useDispatch()
  const articleState = useSelector(state => state.article)
  const location = useLocation()

  useEffect(() => {
    dispatch(fetchArticles())
  }, [location.search])

  useEffect(() => {
    if (articleState.status === "failed") {
      message.error({
        content: articleState.error
      })
    }
  }, [articleState.status, articleState.error])

  return (
    <List
      loading={articleState.status === "loading"}
      dataSource={Object.keys(articleState.articles).map(key => articleState.articles[key])}
      renderItem={item => <ArticleListItem article={item} />}
    />
  )
}

export default ArticleListPage