import React, { useState, useEffect } from 'react';
import { Input, Card, Row, Col, Spin, Empty } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/jobs');
      if(res){
      const data = await res.json();
      setJobs(data);
      setFilteredJobs(data);
   } } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = jobs.filter(job =>
      job.title.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term)
    );
    setFilteredJobs(results);
  }, [searchTerm, jobs]);

  return (
    <>
      <Input.Search
        placeholder="Search by title or location"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '20px 0' }}
        allowClear
      />
      {loading ? (
        <Spin size="large" />
      ) : filteredJobs.length === 0 ? (
        <Empty description="No jobs found" />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredJobs.map(job => (
            <Col span={8} key={job._id}>
              <Card title={job.title} extra={<Link to={`/job/${job._id}`}>Details</Link>}>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Location:</strong> {job.location}</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Home;