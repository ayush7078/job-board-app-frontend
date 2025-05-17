import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';

const { Option } = Select;

const AddJob = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!res.ok) {
        throw new Error('Failed to add job');
      }

      message.success('Job added successfully!');
    } catch (error) {
      message.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Add New Job</h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        <Form.Item
          label="Job Title"
          name="title"
          rules={[{ required: true, message: 'Please input the job title!' }]}
        >
          <Input placeholder="Enter job title" />
        </Form.Item>

        <Form.Item
          label="Company Name"
          name="company"
          rules={[{ required: true, message: 'Please input the company name!' }]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>

        <Form.Item
          label="Job Type"
          name="type"
          rules={[{ required: true, message: 'Please select job type!' }]}
        >
          <Select placeholder="Select job type">
            <Option value="Full-time">Full-time</Option>
            <Option value="Part-time">Part-time</Option>
            <Option value="Internship">Internship</Option>
            <Option value="Contract">Contract</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Please input the location!' }]}
        >
          <Input placeholder="Enter job location" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a job description!' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter job description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddJob;
