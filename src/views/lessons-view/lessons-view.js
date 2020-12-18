import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { request } from '../../config/axios'

import { Spin, Space, Row, Table, message, Image, Modal, Tabs, Input, Button } from 'antd';

const { TabPane } = Tabs;


// import { getCurrentUser } from '../../utils/firebase'

const LessonsView = (props) => {
  const [loading, setLoading] = React.useState(true)
  const [dataSource, setDataSource] = React.useState([])
  const [vocabularyDataSource, setVocabularyDataSource] = React.useState([])
  const [conversationDataSource, setConverastionDataSource] = React.useState([])
  const [quizDataSource, setQuizDataSource] = React.useState([])
  const [isModalVisible, setModalVisible] = React.useState(false)
  const [isVocabularyModalVisible, setVocabularyModalVisible] = React.useState(false)
  const [modalContent, setModalContent] = React.useState({})
  const [vocabularyModalContent, setVocabularyModalContent] = React.useState({})
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
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (text, record) => {
        return (
          <Space size="middle">
            <button type="primary" onClick={() => showModal(record)}>Edit</button>
          </Space>
        )
      }
    },
  ]
  const vocabularyColumn = [
    {
      title: 'Vocabulary ID',
      dataIndex: 'id',
      key: 'vocabularyID',
      width: 150
    },
    {
      title: 'Vocabulary',
      dataIndex: 'vocabulary',
      key: 'vocabulary',
      width: 300
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 300
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'vocabularyImage',
      width: 150,
      render: text => <Image src={text} width={100} />
    },
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (text, record) => {
        return (
          <Space size="middle">
            <button type="primary" onClick={() => showVocabularyModal(record)}>Edit</button>
          </Space>
        )
      }
    }
  ]
  const conversationColumn = [
    {
      title: 'Conversation ID',
      dataIndex: 'id',
      key: 'conversationID',
      width: 150
    },
    {
      title: 'Conversation',
      dataIndex: 'conversation',
      key: 'conversation',
      width: 300
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 300
    },
    // {
    //   title: 'Image',
    //   dataIndex: 'conversationImage',
    //   key: 'conversationImage',
    //   width: 150,
    //   render: text => <Image src={text} width={100} />
    // },
  ]
  const quizColumn = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      width: 150
    },
    // {
    //   title: 'Options',
    //   dataIndex: 'options',
    //   key: 'options',
    //   width: 300
    // },
  ]

  const showVocabularyModal = (record) => {
    setVocabularyModalContent(record)
    setVocabularyModalVisible(true)
  }

  const showModal = (record) => {
    setModalContent({})
    console.log("modal content: ", modalContent)
    setModalVisible(true)
    async function fetchVocabulary() {
      try {
        const result = await request.get(`/api/admin/getVocabulary/${record.lessonID}`)
        if (result.code === 200) {
          const { data } = result
          const tableData = data.map(vocabulary => ({
            key: vocabulary.id,
            ...vocabulary
          }))
          setVocabularyDataSource(tableData)
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
    fetchVocabulary();
    async function fetchConversation() {
      try {
        const result = await request.get(`/api/admin/getConversation/${modalContent.lessonID}`)
        if (result.code === 200) {
          const { data } = result
          const tableData = data.map(conversation => ({
            key: conversation.id,
            ...conversation
          }))
          setConverastionDataSource(tableData)
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
    fetchConversation();
    async function fetchQuiz() {
      try {
        const result = await request.get(`/api/admin/getQuestion/${modalContent.lessonID}`)
        if (result.code === 200) {
          const { data } = result
          const tableData = data.map(quiz => ({
            key: quiz.questionID,
            ...quiz
          }))
          setQuizDataSource(tableData)
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
    fetchQuiz();
  }

  const handleSubmit = () => {
    // async function updateVocabulary() {
    //   try {
    //     setModalLoading(true)
    //     const result = await request.put(`/api/admin/${modalContent.id}/changeStatus/APPROVED`)
    //     if (result.code === 200) {
    //       setDataSource(() =>
    //         dataSource.map(row => {
    //           if (row.id === modalContent.id) {
    //             row.status = 'APPROVED'
    //           }
    //           return row
    //         })
    //       )
    //       console.log("change success")
    //       setModalLoading(false)
    //       setModalVisible(false)
    //     } else {
    //       message.error({
    //         content: 'Something went wrong!',
    //         style: {
    //           position: 'fixed',
    //           bottom: '10px',
    //           left: '50%'
    //         }
    //       })
    //     }
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
    // updateVocabulary();
  }

  useEffect(() => {
    async function fetchLessons() {
      try {
        const level = window.location.pathname.split('/').reverse()[0]
        const result = await request.get(`/api/admin/getByLevel/${level}`)
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
            <Modal
              visible={isModalVisible}
              width={1200}
              onCancel={() => {
                setModalVisible(false)
              }}
            >
              {modalContent ?
                <div
                  style={{ maxHeight: '60vh', overflowY: 'auto' }}
                >
                  <Tabs defaultActiveKey="tabVocabulary">
                    <TabPane tab="Vocabulary" key="tabVocabulary">
                      <Row justify="center">
                        <Table
                          dataSource={vocabularyDataSource}
                          columns={vocabularyColumn}
                          pagination={{
                            position: ['bottomRight'],
                            pageSize: 10
                          }}
                        />
                        <Modal
                          visible={isVocabularyModalVisible}
                          width={900}
                          onCancel={() => {
                            setVocabularyModalVisible(false)
                          }}
                          footer={[
                            <Button
                              key="submit"
                              default
                              // loading={isModalLoading}
                              onClick={handleSubmit}
                            >
                              Submit
                          </Button>
                          ]}
                        >
                          <div
                            style={{ maxHeight: '60vh', overflowY: 'auto' }}
                          >
                            <h3>Vocabulary ID</h3> <Input value={vocabularyModalContent.id} disabled />
                            <h3>Vocabulary</h3> <Input value={vocabularyModalContent.vocabulary} />
                            <h3>Vocabulary Description</h3> <Input value={vocabularyModalContent.description} />
                            <h3>Vocabulary Image</h3> <Image src={vocabularyModalContent.image} width={300} height={300} />
                            <h3>Vocabulary Voice</h3> <audio controls><source src={vocabularyModalContent.voice_link} type="audio/mpeg" /></audio>
                          </div>
                        </Modal>
                      </Row>
                    </TabPane>
                    <TabPane tab="Conversation" key="tabConversation">
                      <Row justify="center">
                        <Table
                          dataSource={conversationDataSource}
                          columns={conversationColumn}
                          pagination={{
                            position: ['bottomRight'],
                            pageSize: 10
                          }}
                        />
                      </Row>
                    </TabPane>
                    <TabPane tab="Quiz" key="tabQuiz">
                      <Row justify="center">
                        <Table
                          dataSource={quizDataSource}
                          columns={quizColumn}
                          pagination={{
                            position: ['bottomRight'],
                            pageSize: 10
                          }}
                        />
                      </Row>
                    </TabPane>
                  </Tabs>
                </div> : null}
            </Modal>
          </Row>
      }
    </>
  )
}
export default connect(state => ({
}), dispatch => ({
}))(LessonsView)
