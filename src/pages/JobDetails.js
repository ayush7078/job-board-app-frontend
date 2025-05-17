import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spin, Alert } from 'antd';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        if (!res.ok) throw new Error('Job not found');
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <Card title={job.title} style={{ maxWidth: 600, margin: '20px auto' }}>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Posted on:</strong> {new Date(job.createdAt).toLocaleString()}</p>
    </Card>
  );
};

export default JobDetails;