import React, { useState, useEffect } from 'react';
import { Card, Button, Collapse, Row, Col, Badge } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { checkAuthorization } from '../utils/auth';
import Unauthorized from '../background/Unauthorised';
import Loading from '../background/Loading';
import axios from 'axios';
import { getCookie } from '../utils/common-function';

const statusColors = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'danger'
};

const AdminApprovalRequests = () => {
  const [approvals, setApprovals] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [comments, setComments] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);
  const authToken = getCookie("authToken");
  const [editModeIds, setEditModeIds] = useState([]);

  useEffect(() => {
    const verify = async () => {
      const authorized = await checkAuthorization("/api/admin/v1/home");
      setIsAuthorized(authorized);
    };
    verify();
  }, []);

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/v1/get-approval-list', {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        const data = response.data.map(item => ({
          ...item,
          status: item.approvalStatus.toUpperCase(),
          comment: item.approverComments || '',
          requestedFeatures: item.requestedFeatures
            ? item.requestedFeatures.split(',').map(f => f.trim())
            : []
        }));
        setApprovals(data.sort((a, b) => {
          const order = { 'PENDING': 0, 'APPROVED': 1, 'REJECTED': 2 };
          return order[a.status] - order[b.status];
        }));

      } catch (error) {
        console.error("Error fetching approvals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthorized) {
      fetchApprovals();
    }
  }, [isAuthorized]);

  const handleAction = async (id, action) => {
    try {
      const comment = action === 'APPROVED' ? comments[id] || '' : '';
      await axios.post(
        'http://localhost:8080/api/admin/v1/approve',
        {
          id,
          approverComments: comment,
          approvalStatus: action
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setApprovals(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status: action, comment } : item
        )
      );
    } catch (error) {
      console.error("Failed to update approval:", error);
    }
  };

  const handleSaveEdit = async (id) => {
    const updatedApproval = approvals.find(a => a.id === id);
    const updatedStatus = updatedApproval.status;
    const updatedComment = comments[id] || updatedApproval.comment || '';

    try {
      await axios.post(
        'http://localhost:8080/api/admin/v1/approve',
        {
          id,
          approverComments: updatedComment,
          approvalStatus: updatedStatus
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setApprovals(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status: updatedStatus, comment: updatedComment } : item
        )
      );
      setEditModeIds(prev => prev.filter(eid => eid !== id));
    } catch (error) {
      console.error("Failed to update approval:", error);
    }
  };

  const toggleEditMode = (id) => {
    setEditModeIds(prev =>
      prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setApprovals(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };


  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const handleCommentChange = (id, value) => {
    setComments((prev) => ({ ...prev, [id]: value }));
  };

  if (isAuthorized === null || loading) return <Loading />;
  if (!isAuthorized) return <Unauthorized />;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-center">Approval Requests</h2>
      {approvals.map((approval) => (
        <Card key={approval.id} className="mb-4 shadow-sm border-0 rounded-4">
          <Card.Body className="px-4 py-4">
            <Row className="align-items-center">
              <Col md={8}>
                <h5 className="fw-semibold mb-2">{approval.name}</h5>
                <p className="mb-1 text-muted"><strong>Email:</strong> {approval.email}</p>
                <p className="mb-1 text-muted"><strong>Reason:</strong> {approval.reason}</p>
                <p className="mb-1 text-muted"><strong>Designation:</strong> {approval.designation}</p>
                <p className="mb-1 text-muted"><strong>Organization:</strong> {approval.organization}</p>
                <Badge bg={statusColors[approval.status]} className="text-uppercase px-3 py-1">
                  {approval.status}
                </Badge>
              </Col>
              <Col md={4} className="mt-3 mt-md-0">
                <div className="d-flex flex-wrap align-items-center justify-content-md-end gap-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleAction(approval.id, 'APPROVED')}
                    disabled={approval.status !== 'PENDING'}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleAction(approval.id, 'REJECTED')}
                    disabled={approval.status !== 'PENDING'}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => toggleExpand(approval.id)}
                    aria-label="Toggle details"
                  >
                    {expandedIds.includes(approval.id) ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Col>
            </Row>
            <Collapse in={expandedIds.includes(approval.id)}>
              <div className="mt-4">
                <Card className="border-start border-4 bg-light-subtle rounded-3">
                  <Card.Body>
                    <h6 className="fw-bold mb-2">Additional Details</h6>
                    <p className="mb-1"><strong>Jurisdiction:</strong> {approval.jurisdiction}</p>
                    <p className="mb-1"><strong>Experience:</strong> {approval.experience}</p>
                    <p className="mb-1"><strong>Expertise:</strong> {approval.expertise}</p>
                    <p className="mb-1"><strong>Contact Number:</strong> {approval.contactNumber}</p>
                    <p className="mb-3"><strong>Legal Account Holder Number:</strong> {approval.legalAccountNumber}</p>
                    <p className="mb-1"><strong>Requested Features:</strong> {approval.requestedFeatures?.join(', ') || 'None'}</p>
                    <p className="mb-3"><strong>Details:</strong> {approval.details}</p>
                    {approval.status === 'PENDING' && (
                      <div>
                        <label className="form-label fw-semibold">Leave a Comment (Optional):</label>
                        <textarea
                          rows="2"
                          className="form-control"
                          value={comments[approval.id] || ''}
                          onChange={(e) => handleCommentChange(approval.id, e.target.value)}
                          placeholder="Enter your comment here"
                        />
                      </div>
                    )}
                    {editModeIds.includes(approval.id) ? (
                      <>
                        <div className="mb-2">
                          <label className="form-label fw-semibold">Change Status:</label>
                          <select
                            className="form-select"
                            value={approval.status}
                            onChange={(e) => handleStatusChange(approval.id, e.target.value)}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Edit Comment:</label>
                          <textarea
                            rows="2"
                            className="form-control"
                            value={comments[approval.id] || approval.comment || ''}
                            onChange={(e) => handleCommentChange(approval.id, e.target.value)}
                          />
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleSaveEdit(approval.id)}
                        >
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <>
                        {approval.comment && (
                          <p className="mt-2"><strong>Approver Comment:</strong> {approval.comment}</p>
                        )}
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => toggleEditMode(approval.id)}
                          className="mt-2"
                        >
                          Edit Status
                        </Button>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </div>
            </Collapse>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AdminApprovalRequests;
