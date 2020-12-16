import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { request } from '../../config/axios'

import { Spin, Space, Row, Table, message, Image, Tag, Modal } from 'antd';


// import { getCurrentUser } from '../../utils/firebase'

const PostsView = (props) => {
  const [isModalVisible, setModalVisible] = React.useState(false)
  const [modalContent, setModalContent] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [dataSource, setDataSource] = React.useState([])

  const handleStatusChange = (record) => {
    console.log("Record info: ", record)
  }

  const showModal = (record) => {
    setModalVisible(true)
    setModalContent(record)
  }
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 800
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status) => (
        <Tag key={status} color={status === 'APPROVED' ? 'geekblue' : 'green'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (text, record) => {
        console.log("Record: ", record)
        return (
          <Space size="middle">
            <button type="primary" onClick={() => showModal(record)}>Edit</button>
          </Space>
        )
      }
    },
  ]
  useEffect(() => {
    async function fetchPosts() {
      try {
        const result = await request.get(`/api/post`)
        if (result.code === 200) {
          const { content } = result.data
          const tableData = content.map(post => {
            return {
              key: post.id,
              ...post
            };
          })
          setDataSource(tableData)
          setLoading(false)
        } else {
          message.error({
            content: 'Something went wrong!',
            style: {
              position: 'fixed',
              bottom: '10px',
              left: '50%'
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchPosts();
  }, [])

  useEffect(() => {
    console.log("Changed")
  }, [])


  return (
    <>
      {
        loading ?
          <Row justify="center" align="middle" style={{ width: '100%', height: '80vh' }}>
            <Space size="middle">
              <Spin size="large" />
            </Space>
          </Row> :
          <Row style={{ width: '100%', height: '80vh' }} justify="center">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{
                position: ['topRight', 'bottomRight'],
                pageSize: 10
              }}
            />
            <Modal title="Edit" visible={isModalVisible} onOk={() => setModalVisible(false)}>
              {modalContent && modalContent.id}
            </Modal>
          </Row>
      }
    </>
  )
}
export default connect(state => ({
}), dispatch => ({
}))(PostsView)
