import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { request } from '../../config/axios'

import { Spin, Space, Row, Table, message, Image, Modal, Tabs, Input, Button, Form } from 'antd';

const { TabPane } = Tabs;


// import { getCurrentUser } from '../../utils/firebase'

const LessonsView = (props) => {
  const [loading, setLoading] = React.useState(true)
  const [dataSource, setDataSource] = React.useState([])
  const [vocabularyDataSource, setVocabularyDataSource] = React.useState([])
  const [conversationDataSource, setConverastionDataSource] = React.useState([])
  const [quizDataSource, setQuizDataSource] = React.useState([])
  const [isModalVisible, setModalVisible] = React.useState(false)
  const [isVocabularyUpdateModalVisible, setVocabularyUpdateModalVisible] = React.useState(false)
  const [isVocabularyCreateModalVisible, setVocabularyCreateModalVisible] = React.useState(false)
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
            <button type="primary" onClick={() => showVocabularyUpdateModal(record)}>Update</button>
            <button type="primary" onClick={() => showVocabularyCreateModal()}>Create</button>
          </Space>
        )
      }
    },
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

  const showVocabularyUpdateModal = (record) => {
    setVocabularyModalContent(record)
    setVocabularyUpdateModalVisible(true)
  }

  const showVocabularyCreateModal = () => {
    setVocabularyCreateModalVisible(true)
  }

  const showModal = (record) => {
    console.log("voca content: ", vocabularyDataSource)
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
        const result = await request.get(`/api/admin/getConversation/${record.lessonID}`)
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
        const result = await request.get(`/api/admin/getQuestion/${record.lessonID}`)
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

  const onVocabularyFormFinish = values => {
    // async function updateVocabulary() {
    //   try {
    //     const result = await request.put(`/api/admin/updateVocabulary`, {
    //       "description": vocabularyModalContent.description,
    //       "id": vocabularyModalContent.id,
    //       "image": vocabularyModalContent.image,
    //       "listVocabulary": [
    //         {
    //           "id": vocabularyModalContent.listVocabulary[0].id,
    //           "lessonID": vocabularyModalContent.listVocabulary[0].lessonID
    //         }
    //       ],
    //       "vocabulary": vocabularyModalContent.vocabulary,
    //       "voice_link": vocabularyModalContent.voice_link
    //     })
    //     if (result.code === 200) {
    //       console.log('success')
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

  const onCreateVocabularyFormFinish = values => {
    console.log("Create Submit")
    // async function updateVocabulary() {
    //   try {
    // const result = await request.post(`/api/admin/addVocab/${vocabularyModalContent.listVocabulary[0].lessonID}`, {
    //       "description": vocabularyModalContent.description,
    //       "id": vocabularyModalContent.id,
    //       "image": vocabularyModalContent.image,
    //       "listVocabulary": [
    //         {
    //           "id": vocabularyModalContent.listVocabulary[0].id,
    //           "lessonID": vocabularyModalContent.listVocabulary[0].lessonID
    //         }
    //       ],
    //       "vocabulary": vocabularyModalContent.vocabulary,
    //       "voice_link": vocabularyModalContent.voice_link
    //     })
    //     if (result.code === 200) {
    //       console.log('success')
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
                setVocabularyDataSource([])
                setQuizDataSource([])
                setConverastionDataSource([])
              }}
            >
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
                        visible={isVocabularyUpdateModalVisible}
                        width={900}
                        onCancel={() => {
                          setVocabularyUpdateModalVisible(false)
                        }}
                        footer={[
                          <Button
                            key="submit"
                            form="vocaForm"
                            default
                            // loading={isModalLoading}
                            htmlType="submit"
                          >
                            Submit
                          </Button>
                        ]}
                      >
                        <div
                          style={{ maxHeight: '60vh', overflowY: 'auto' }}
                        >
                          <Form
                            id="vocaForm"
                            name="vocaForm"
                            initialValues={{ remember: true }}
                            onFinish={onVocabularyFormFinish}
                            onFinishFailed={(e) => console.log(e)}
                          >
                            <h3>Vocabulary ID</h3> <Input value={vocabularyModalContent.id} disabled />
                            <h3>Vocabulary</h3>
                            <Form.Item
                              name="vocabulary"
                            // rules={[{ required: true, message: 'This field cannot be blank!' }]}
                            >
                              <Input value={vocabularyModalContent.vocabulary} />
                            </Form.Item>
                            <h3>Vocabulary Description</h3>
                            <Form.Item
                              name="description"
                            // rules={[{ required: true, message: 'This field cannot be blank!' }]}s
                            >
                              <Input placeholder={vocabularyModalContent.description} />
                            </Form.Item>
                            {/* <h3>Vocabulary Description</h3>
                            <h3>Vocabulary Image</h3> <Image src={vocabularyModalContent.image} width={300} height={300} />
                            <h3>Vocabulary Voice</h3> <audio key={vocabularyModalContent.id} controls><source src={vocabularyModalContent.voice_link} type="audio/mpeg" /></audio> */}
                          </Form>
                        </div>
                      </Modal>
                      {/* //update vocab */}
                      <Modal
                        title="Create Vocabulary"
                        visible={isVocabularyCreateModalVisible}
                        width={900}
                        onCancel={() => {
                          setVocabularyCreateModalVisible(false)
                        }}
                        footer={[
                          <Button
                            key="submitCreate"
                            form="createVocabularyForm"
                            default
                            // loading={isModalLoading}
                            htmlType="submit"
                          >
                            Submit
                          </Button>
                        ]}
                      >
                        <div
                          style={{ maxHeight: '60vh', overflowY: 'auto' }}
                        >
                          <Form
                            id="createVocabularyForm"
                            name="createVocabularyForm"
                            initialValues={{ remember: true }}
                            onFinish={onCreateVocabularyFormFinish}
                            onFinishFailed={(e) => console.log(e)}
                          >
                            <h3>Vocabulary ID</h3>
                            <Form.Item
                              name="vocabularyID"
                            // rules={[{ required: true, message: 'This field cannot be blank!' }]}
                            >
                              <Input />
                            </Form.Item>


                            <h3>Vocabulary</h3>
                            <Form.Item
                              name="vocabulary"
                            // rules={[{ required: true, message: 'This field cannot be blank!' }]}
                            >
                              <Input />
                            </Form.Item>


                            <h3>Vocabulary Description</h3>
                            <Form.Item
                              name="description"
                            // rules={[{ required: true, message: 'This field cannot be blank!' }]}s
                            >
                              <Input />
                            </Form.Item>

                            <h3>Vocabulary Image</h3>
                            <Form.Item
                              name="description"
                            // rules={[{ required: true, message: 'This field cannot be blank!' }]}s
                            >
                              <Input />
                            </Form.Item>

                            <h3>Vocabulary Voice</h3>
                            <Form.Item
                              name="description"
                            // rules={[{ required: true, message: 'This field cannot be blank!' }]}s
                            >
                              <Input />
                            </Form.Item>
                          </Form>
                        </div>
                      </Modal>
                      {/* //create vocab */}
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
              </div>
            </Modal>
          </Row>
      }
    </>
  )
}
export default connect(state => ({
}), dispatch => ({
}))(LessonsView)
