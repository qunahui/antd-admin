import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { request } from '../../config/axios'

import { Spin, Space, Row, Table, message, Image, Modal, Tabs, Input, Button, Form, Typography } from 'antd';

const { TabPane } = Tabs;
const { Text } = Typography

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
  const [isConversationUpdateModalVisible, setConversationUpdateModalVisible] = React.useState(false)
  const [isQuizUpdateModalVisible, setQuizUpdateModalVisible] = React.useState(false)
  const [vocabularyModalContent, setVocabularyModalContent] = React.useState({})
  const [conversationModalContent, setConversationModalContent] = React.useState({})
  const [quizModalContent, setQuizModalContent] = React.useState({})
  const [isSomethingLoading, setSomethingLoading] = React.useState(false)
  const [vocaForm] = Form.useForm()
  const [conversationForm] = Form.useForm()
  const [quizForm] = Form.useForm()
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
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (text, record) => {
        return (
          <Space size="middle">
            <button type="primary" onClick={() => showConversationUpdateModal(record)}>Update</button>
          </Space>
        )
      }
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
    {
      title: 'Answer A',
      dataIndex: 'answer_a',
      key: 'answer_a',
      width: 150,
      render: record => <Text type={record.checkCorrect === true ? 'success' : 'danger'}>{record.optionName}</Text>
    },
    {
      title: 'Answer B',
      dataIndex: 'answer_b',
      key: 'answer_b',
      width: 150,
      render: record => <Text type={record.checkCorrect === true ? 'success' : 'danger'}>{record.optionName}</Text>
    },
    {
      title: 'Answer C',
      dataIndex: 'answer_c',
      key: 'answer_c',
      width: 150,
      render: record => <Text type={record.checkCorrect === true ? 'success' : 'danger'}>{record.optionName}</Text>
    },
    {
      title: 'Answer D',
      dataIndex: 'answer_d',
      key: 'answer_d',
      width: 150,
      render: record => <Text type={record.checkCorrect === true ? 'success' : 'danger'}>{record.optionName}</Text>
    },
    {
      title: 'Action',
      dataIndex: 'edit',
      key: 'edit',
      width: 150,
      render: (text, record) => {
        return (
          <Space size="middle">
            <button type="primary" onClick={() => showQuizUpdateModal(record)}>Update</button>
          </Space>
        )
      }
    },
    // {
    //   title: 'Options',
    //   dataIndex: 'options',
    //   key: 'options',
    //   width: 300
    // },
  ]

  const showVocabularyUpdateModal = (record) => {
    console.log(record)
    vocaForm.setFieldsValue(record)
    setVocabularyModalContent(record)
    setVocabularyUpdateModalVisible(true)
  }

  const showConversationUpdateModal = (record) => {
    console.log(record)
    conversationForm.setFieldsValue(record)
    setConversationModalContent(record)
    setConversationUpdateModalVisible(true)
  }

  const showQuizUpdateModal = (record) => {
    console.log(record)
    quizForm.setFieldsValue(record)
    setQuizModalContent(record)
    setQuizUpdateModalVisible(true)
  }

  const showVocabularyCreateModal = () => {
    setVocabularyCreateModalVisible(true)
  }

  const showModal = (record) => {
    console.log("voca content: ", vocabularyDataSource)
    async function fetchVocabulary() {
      try {
        const result = await request.get(`/api/admin/getVocabulary/${record.lessonID}`)
        if (result.code === 200) {
          const { data } = result
          const tableData = data.map(vocabulary => ({
            key: vocabulary.id,
            ...vocabulary
          }))
          console.log("Set voca data source")
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
          const tableData = data.map(quiz => {
            quiz.key = quiz.questionID;
            quiz.answer_a = quiz.options[0]
            quiz.answer_b = quiz.options[1]
            quiz.answer_c = quiz.options[2]
            quiz.answer_d = quiz.options[3]
            return quiz
          })
          console.log(tableData)
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
    setModalVisible(true)
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
    setSomethingLoading(true)
    async function updateVocabulary() {
      try {
        const result = await request.put(`/api/admin/updateVocabulary`, {
          "description": values.description,
          "id": values.id,
          "image": values.image,
          "listVocabulary": [
            {
              "id": vocabularyModalContent.listVocabulary[0].id,
              "lessonID": vocabularyModalContent.listVocabulary[0].lessonID
            }
          ],
          "vocabulary": values.vocabulary,
          "voice_link": values.voice_link,

        })
        if (result.code === 200) {
          setVocabularyDataSource(() =>
            vocabularyDataSource.map(row => {
              if (row.id === vocabularyModalContent.id) {
                return {
                  ...row,
                  ...values
                }
              }
              return row
            })
          )
          console.log("success")
          setSomethingLoading(false)
          setVocabularyUpdateModalVisible(false)
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
    updateVocabulary();
  }

  const onConverastionFormFinish = values => {
    setSomethingLoading(true)
    async function updateConversation() {
      try {
        const result = await request.put(`/api/admin/updateConversation`, {
          "conversation": values.conversation,
          "conversationImage": values.converastionImage,
          "description": values.description,
          "id": values.id,
          "lessonID": conversationModalContent.lessonID,
          "voice_link": values.voice_link
        })
        if (result.code === 200) {
          setConverastionDataSource(conversationDataSource.map(row => {
            if(row.id === conversationModalContent.id) {
              return {
                ...row,
                ...values
              }
            }
            return row;
          }))
          console.log("success")
          setSomethingLoading(false)
          setConversationUpdateModalVisible(false)
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
    updateConversation();
  }

  const onQuizFormFinish = values => {

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
              footer={[
              ]}
            >
              <div
                style={{ maxHeight: '60vh', overflowY: 'auto' }}
              >
                <Tabs defaultActiveKey="tabVocabulary">
                  <TabPane tab="Vocabulary" key="tabVocabulary">
                    {
                      vocabularyDataSource.length > 0 ?
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
                                loading={isSomethingLoading}
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
                                form={vocaForm}
                                onFinish={onVocabularyFormFinish}
                                onFinishFailed={(e) => console.log(e)}
                              >
                                <h3>Vocabulary ID</h3>
                                <Form.Item
                                  name="id"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={vocabularyModalContent.id}
                                >
                                  <Input disabled />
                                </Form.Item>
                                <h3>Vocabulary</h3>
                                <Form.Item
                                  name="vocabulary"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={vocabularyModalContent.vocabulary}
                                >
                                  <Input />
                                </Form.Item>
                                <h3>Description</h3>
                                <Form.Item
                                  name="description"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={vocabularyModalContent.description}
                                >
                                  <Input />
                                </Form.Item>
                                <h3>Vocabulary Image</h3>
                                <Form.Item
                                  name="image"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={vocabularyModalContent.image}
                                >
                                  <Image src={vocabularyModalContent.image} width={300} height={300} />
                                </Form.Item>
                                <h3>Vocabulary Voice</h3>
                                <Form.Item
                                  name="voice_link"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={vocabularyModalContent.voice_link}
                                >
                                  <audio key={vocabularyModalContent.id} controls><source src={vocabularyModalContent.voice_link} type="audio/mpeg" /></audio>
                                </Form.Item>
                              </Form>
                            </div>
                          </Modal>
                        </Row> :
                        <Row justify="center" align="middle" style={{ width: '100%', height: '100%' }}>
                          <Space size="middle">
                            <Spin size="large" />
                          </Space>
                        </Row>
                    }
                  </TabPane>
                  <TabPane tab="Conversation" key="tabConversation">
                    {
                      conversationDataSource.length > 0 ?
                        <Row justify="center">
                          <Table
                            dataSource={conversationDataSource}
                            columns={conversationColumn}
                            pagination={{
                              position: ['bottomRight'],
                              pageSize: 10
                            }}
                          />
                          <Modal
                            visible={isConversationUpdateModalVisible}
                            width={900}
                            onCancel={() => {
                              setConversationUpdateModalVisible(false)
                            }}
                            footer={[
                              <Button
                                key="submit"
                                form="conversationForm"
                                default
                                loading={isSomethingLoading}
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
                                id="conversationForm"
                                name="conversationForm"
                                form={conversationForm}
                                onFinish={onConverastionFormFinish}
                                onFinishFailed={(e) => console.log(e)}
                              >
                                <h3>Conversation ID</h3>
                                <Form.Item
                                  name="id"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={conversationModalContent.id}
                                >
                                  <Input disabled />
                                </Form.Item>
                                <h3>Conversation</h3>
                                <Form.Item
                                  name="conversation"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={conversationModalContent.conversation}
                                >
                                  <Input />
                                </Form.Item>
                                <h3>Description</h3>
                                <Form.Item
                                  name="description"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={conversationModalContent.description}
                                >
                                  <Input />
                                </Form.Item>
                                {/* <h3>Conversation Image</h3>
                                <Form.Item
                                  name="image"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={vocabularyModalContent.image}
                                >
                                  <Image src={vocabularyModalContent.image} width={300} height={300} />
                                </Form.Item> */}
                                <h3>Conversation Voice</h3>
                                <Form.Item
                                  name="voice_link"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={conversationModalContent.voice_link}
                                >
                                  <audio key={conversationModalContent.id} controls><source src={conversationModalContent.voice_link && `https://drive.google.com/uc?export=download&id=${conversationModalContent.voice_link.split('/').reverse()[1]}`} type="audio/mpeg" /></audio>
                                </Form.Item>
                              </Form>
                            </div>
                          </Modal>
                        </Row> :
                        <Row justify="center" align="middle" style={{ width: '100%', height: '100%' }}>
                          <Space size="middle">
                            <Spin size="large" />
                          </Space>
                        </Row>
                    }
                  </TabPane>
                  <TabPane tab="Quiz" key="tabQuiz">
                  {
                      quizDataSource.length > 0 ?
                        <Row justify="center">
                          <Table
                            dataSource={quizDataSource}
                            columns={quizColumn}
                            pagination={{
                              position: ['bottomRight'],
                              pageSize: 10
                            }}
                          />
                          <Modal
                            visible={isQuizUpdateModalVisible}
                            width={900}
                            onCancel={() => {
                              setQuizUpdateModalVisible(false)
                            }}
                            footer={[
                              <Button
                                key="submit"
                                form="quizForm"
                                default
                                loading={isSomethingLoading}
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
                                id="quizForm"
                                name="quizForm"
                                form={quizForm}
                                onFinish={onQuizFormFinish}
                                onFinishFailed={(e) => console.log(e)}
                              >
                                <h3>Question ID</h3>
                                <Form.Item
                                  name="questionID"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={quizModalContent.questionID}
                                >
                                  <Input disabled />
                                </Form.Item>
                                <h3>Question </h3>
                                <Form.Item
                                  name="question"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={quizModalContent.question}
                                >
                                {
                                  (quizModalContent.quizType === 1) ? 
                                  <Input/> :
                                  (quizModalContent.quizType === 2) ? 
                                  <audio key={quizModalContent.questionID} controls><source src={quizModalContent.question && `https://drive.google.com/uc?export=download&id=${quizModalContent.question.split('/').reverse()[1]}`} type="audio/mpeg" /></audio> :
                                  (quizModalContent.quizType === 3) ?
                                  <Image src={quizModalContent && `https://drive.google.com/thumbnail?id=${quizModalContent.question.split('/').reverse()[1]}`} width={300} height={300} />
                                  : <Input/>                             
                                }
                                </Form.Item>
                                <h3>Quiz ID</h3>
                                <Form.Item
                                  name="quizID"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={quizModalContent.quizID}
                                >
                                  <Input disabled/>
                                </Form.Item>
                                <h3>Quiz type</h3>
                                <Form.Item
                                  name="quizType"
                                  rules={[{ required: true, message: 'This field is required!' }]}
                                  initialValue={quizModalContent.quizType}
                                >
                                  <Input disabled/>
                                </Form.Item>
                                {
                                  quizModalContent && quizModalContent.options.map((option,index) => <div key={option.optionID}>
                                    <h3>Answer {index+1}  </h3>
                                    <Form.Item
                                      name={`option_${index+1}`}
                                      rules={[{ required: true, message: 'This field is required!' }]}
                                      initialValue={option.optionName}
                                    >
                                      <Input/>
                                    </Form.Item>
                                  </div>)
                                }
                              </Form>
                            </div>
                          </Modal>
                        </Row> :
                        <Row justify="center" align="middle" style={{ width: '100%', height: '100%' }}>
                          <Space size="middle">
                            <Spin size="large" />
                          </Space>
                        </Row>
                    }
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
