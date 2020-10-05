import React from 'react'
import { List, Button } from 'antd'

const StaticListPage = props => {
  return (
    <List
      dataSource={[{}, {}, {}]}
      renderItem={item => (
        <List.Item
          actions={[
            <Button>Edit</Button>,
            <Button>Delete</Button>
          ]}
        >
          <List.Item.Meta 
            title="Post"
            description="Hehehhee"
          />
        </List.Item>
      )}
    />
  )
}

export default StaticListPage