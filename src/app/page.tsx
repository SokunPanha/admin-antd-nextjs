'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  Space,
  Typography,
  Divider,
  Tag,
  Avatar,
  Badge,
  message,
  Statistic,
  Row,
  Col,
} from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { ProCard, ProTable, ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';

const { Title, Paragraph, Text } = Typography;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = () => {
    messageApi.success('Ant Design integration successful! 🎉');
  };

  const columns: ProColumns<DataType>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            const color = tag === 'developer' ? 'geekblue' : tag === 'designer' ? 'green' : 'volcano';
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['developer', 'cool'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['designer'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '24px' }}>
      {contextHolder}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header Section */}
        <ProCard
          style={{ marginBottom: 24 }}
          bordered
          hoverable
          boxShadow
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <Badge.Ribbon text="Integrated" color="green">
                <Title level={1} style={{ marginBottom: 8 }}>
                  <RocketOutlined style={{ marginRight: 12, color: '#1890ff' }} />
                  Next.js + Ant Design + Pro Components
                </Title>
              </Badge.Ribbon>
              <Paragraph style={{ fontSize: 16, color: '#666', marginTop: 16 }}>
                A powerful combination for building enterprise-level applications with beautiful UI components
              </Paragraph>
            </div>

            <Row gutter={16}>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="Components"
                    value={50}
                    prefix={<ThunderboltOutlined />}
                    suffix="+"
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="Pro Components"
                    value={20}
                    prefix={<CrownOutlined />}
                    suffix="+"
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="Icons"
                    value={1000}
                    prefix={<SmileOutlined />}
                    suffix="+"
                    valueStyle={{ color: '#cf1322' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="TypeScript"
                    value={100}
                    suffix="%"
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
            </Row>

            <Space wrap>
              <Button type="primary" size="large" icon={<RocketOutlined />} onClick={showMessage}>
                Test Message
              </Button>
              <Button size="large" icon={<SettingOutlined />}>
                Settings
              </Button>
              <Avatar.Group>
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                <Avatar style={{ backgroundColor: '#7265e6' }}>U</Avatar>
                <Avatar style={{ backgroundColor: '#ffbf00' }}>M</Avatar>
                <Avatar style={{ backgroundColor: '#00a2ae' }} icon={<UserOutlined />} />
              </Avatar.Group>
            </Space>
          </Space>
        </ProCard>

        {/* Pro Components Demo */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <ProCard title="ProForm Example" bordered headerBordered>
              <ProForm
                onFinish={async (values) => {
                  console.log(values);
                  messageApi.success('Form submitted successfully!');
                }}
                submitter={{
                  searchConfig: {
                    submitText: 'Submit',
                  },
                }}
              >
                <ProFormText
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                />
                <ProFormText
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                />
                <ProFormSelect
                  name="role"
                  label="Role"
                  placeholder="Select a role"
                  options={[
                    { label: 'Developer', value: 'developer' },
                    { label: 'Designer', value: 'designer' },
                    { label: 'Manager', value: 'manager' },
                  ]}
                  rules={[{ required: true, message: 'Please select a role' }]}
                />
              </ProForm>
            </ProCard>
          </Col>

          <Col xs={24} lg={12}>
            <ProCard title="Feature Highlights" bordered headerBordered>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Card size="small" style={{ background: '#e6f7ff', border: '1px solid #91d5ff' }}>
                  <Text strong>🎨 Rich Component Library</Text>
                  <Paragraph style={{ marginBottom: 0, marginTop: 8 }}>
                    50+ high-quality React components out of the box
                  </Paragraph>
                </Card>
                <Card size="small" style={{ background: '#f6ffed', border: '1px solid #b7eb8f' }}>
                  <Text strong>🚀 Pro Components</Text>
                  <Paragraph style={{ marginBottom: 0, marginTop: 8 }}>
                    Advanced components like ProTable, ProForm, ProLayout for enterprise apps
                  </Paragraph>
                </Card>
                <Card size="small" style={{ background: '#fff7e6', border: '1px solid #ffd591' }}>
                  <Text strong>🎯 TypeScript Support</Text>
                  <Paragraph style={{ marginBottom: 0, marginTop: 8 }}>
                    Written in TypeScript with predictable static types
                  </Paragraph>
                </Card>
                <Card size="small" style={{ background: '#fff0f6', border: '1px solid #ffadd2' }}>
                  <Text strong>🌈 Customizable Theme</Text>
                  <Paragraph style={{ marginBottom: 0, marginTop: 8 }}>
                    Powerful theme customization with design tokens
                  </Paragraph>
                </Card>
              </Space>
            </ProCard>
          </Col>
        </Row>

        {/* ProTable Demo */}
        <ProCard title="ProTable Example" bordered headerBordered style={{ marginTop: 16 }}>
          <ProTable<DataType>
            columns={columns}
            dataSource={data}
            search={false}
            pagination={{
              pageSize: 5,
            }}
            dateFormatter="string"
            headerTitle="User List"
            toolBarRender={() => [
              <Button key="button" icon={<UserOutlined />} type="primary">
                Add User
              </Button>,
            ]}
          />
        </ProCard>

        {/* Footer */}
        <Card style={{ marginTop: 24, textAlign: 'center' }}>
          <Text type="secondary">
            Built with ❤️ using Next.js 16, React 19, Ant Design 5, and Pro Components
          </Text>
        </Card>
      </div>
    </div>
  );
}

