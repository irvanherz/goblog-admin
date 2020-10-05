import React from 'react'
import { Form, Input, Button, Select, Divider, Spin, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchArticleDetail, updateArticleDetail, resetArticleDetailState, createArticleDetail } from '../../redux/actions/article-detail';
import { useHistory, useRouteMatch } from 'react-router-dom';
import CKEditorInput from '../../components/CKEditorInput';



const CreateArticlePage = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const routeMatch = useRouteMatch()
  const history = useHistory()
  const articleDetailState = useSelector(state => state.articleDetail)

  useEffect(() => {
    if(articleDetailState.status === "created") {
      dispatch(resetArticleDetailState())
      history.push('/articles')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleDetailState.status])

  useEffect(() => {
    if (articleDetailState.status === "failed") {
      message.error({
        content: articleDetailState.error
      })
    }
  }, [articleDetailState.status, articleDetailState.error])

  const handleFinish = values => {
    values.tags = Array.isArray(values.tags) ? values.tags.join(",") : values.tags
    dispatch(createArticleDetail(values))
  }

  return (
    <Spin spinning={articleDetailState.status === "loading"}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item label="Title" name='title' required>
          <Input placeholder="Article title" />
        </Form.Item>
        <Form.Item label="Tags" name='tags'>
          <Select
            mode="tags"
            placeholder="Select tags"
            style={{ width: '100%' }}
          >
            {[]}
          </Select>
        </Form.Item>
        <Form.Item label="Content" name='content'>
          <CKEditorInput />
        </Form.Item>
        <Divider />
        <Form.Item label="Summary" name='summary'>
          <Input.TextArea placeholder='Content summary' maxLength="500" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={articleDetailState.status === "updating"} htmlType="submit">Update</Button>
        </Form.Item>
      </Form>

    </Spin>
  )
}

export default CreateArticlePage