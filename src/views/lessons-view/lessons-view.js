import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { request } from '../../config/axios'

import { Spin, Space, Row, Table, message, Image } from 'antd';


// import { getCurrentUser } from '../../utils/firebase'

const LessonsView = (props) => {
  const [loading, setLoading] = React.useState(true)
  const [dataSource, setDataSource] = React.useState([])
  const columns = [
    {
      title: 'Lesson ID',
      dataIndex: 'lessonID',
      key: 'lessonID',
      width: 150
    },
    {
      title: 'Name',
      dataIndex: 'lessonName',
      key: 'lessonName',
      width: 150
    },
    {
      title: 'Image',
      dataIndex: 'lessonImage',
      key: 'lessonImage',
      width: 150,
      render: text => <Image src={text} width={100} />
    },
  ]
  useEffect(() => {
    async function fetchLessons() {
      try {
        const level = window.location.pathname.split('/').reverse()[0]
        const result = await request.get(`/api/lessons/getByLevel/${level}`)
        if (result.code === 200) {
          const { data } = result
          const tableData = data.map(lesson => ({
            key: lesson.lessonID,
            ...lesson
          }))
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

    fetchLessons();
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
          </Row>
      }
    </>
  )
}
export default connect(state => ({
}), dispatch => ({
}))(LessonsView)
