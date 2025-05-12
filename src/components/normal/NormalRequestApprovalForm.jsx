import React, { useState, useEffect } from 'react';
import Loading from '../background/Loading';
import Unauthorized from '../background/Unauthorised';
import { getCookie } from '../utils/common-function';

const NormalRequestApprovalForm = () => {

  const authToken = getCookie("authToken");


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    details: '',
    contactNumber: '',
    legalAccountNumber: '',
    designation: '',
    organization: '',
    jurisdiction: '',
    experience: '',
    expertise: '',
    requested_features: ''
  });


  const [isSubmitted, setIsSubmitted] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(null); // null | 'pending' | { status: 'approved', approvedBy: 'Name', comments: '...' }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://nyayamitra-backend-dev.onrender.com/api/normal/v1/request-approval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit access request");
      }

      const result = await response.json();

      setApprovalStatus(result.approvalStatus || 'PENDING');
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const [isAuthorized, setIsAuthorized] = useState(null);
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch("https://nyayamitra-backend-dev.onrender.com/api/normal/v1/request-approval", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        });

        if (response.status === 202) {
          const data = await response.json();
          setFormData({
            ...formData,
            name: data.name,
            email: data.email,
            reason: data.reason,
            details: data.details,
            contactNumber: data.contactNumber,
            legalAccountNumber: data.legalAccountNumber,
            designation: data.designation,
            organization: data.organization,
            jurisdiction: data.jurisdiction,
            experience: data.experience,
            expertise: data.expertise,
            requested_features: data.requestedFeatures,
          });

          setApprovalStatus({
            status: data.approvalStatus || "PENDING",
            approvedBy: data.approvedBy,
            comments: data.approverComments
          });

          setIsSubmitted(true);
          setIsAuthorized(true);
        }
        else if (response.status === 204) {
          setIsSubmitted(false);
          setIsAuthorized(true);
        }
        else if (response.status === 401) {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Authorization check failed", error);
        setIsAuthorized(false);
      }
    };

    verify();
  }, []);


  if (isAuthorized === null) {
    return <Loading />
  }

  if (!isAuthorized) {
    return <Unauthorized />;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-8 col-lg-7">
        {!isSubmitted ? (
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center fw-bold">Request Access Approval</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Contact Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Legal Account Holder Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="legalAccountNumber"
                    value={formData.legalAccountNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Reason for Request</label>
                  <input
                    type="text"
                    className="form-control"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Additional Details</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Organization</label>
                  <input
                    type="text"
                    className="form-control"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Jurisdiction</label>
                  <input
                    type="text"
                    className="form-control"
                    name="jurisdiction"
                    value={formData.jurisdiction}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Experience</label>
                  <input
                    type="text"
                    className="form-control"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Expertise</label>
                  <input
                    type="text"
                    className="form-control"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Requested Features</label>
                  <input
                    type="text"
                    className="form-control"
                    name="requested_features"
                    value={formData.requested_features}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="d-grid">
                  <button type="submit" className="btn btn-success fw-bold">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="card shadow border-info bg-light">
            <div className="card-body text-black">
              <h4 className="card-title fw-bold mb-4 text-center">REQUEST SUMMARY</h4>
              <hr />
              <p><strong>Full Name:</strong> {formData.name}</p>
              <p><strong>Email Address:</strong> {formData.email}</p>
              <p><strong>Contact Number:</strong> {formData.contactNumber}</p>
              <p><strong>Legal Account Number:</strong> {formData.legalAccountNumber}</p>
              <p><strong>Request Reason:</strong> {formData.reason}</p>
              <p><strong>Additional Information:</strong> {formData.details || 'N/A'}</p>
              <p><strong>Designation:</strong> {formData.designation}</p>
              <p><strong>Organization:</strong> {formData.organization}</p>
              <p><strong>Jurisdiction:</strong> {formData.jurisdiction}</p>
              <p><strong>Years of Experience:</strong> {formData.experience}</p>
              <p><strong>Area of Expertise:</strong> {formData.expertise}</p>
              <p><strong>Requested Features:</strong> {formData.requested_features}</p>

              <hr className="my-4" />

              {(() => {
                const status = typeof approvalStatus === 'string' ? approvalStatus : approvalStatus?.status;

                if (status === 'PENDING') {
                  return <>
                    <strong>Request Status : </strong>
                    <span className="fw-bold text-warning"> Pending Review</span></>;
                } else if (status === 'REJECTED') {
                  return (
                    <>
                      <strong>Request Status : </strong>
                      <span className="fw-bold text-danger"> Rejected </span>
                      <p><strong>Reviewed By:</strong> {approvalStatus?.approvedBy || 'N/A'}</p>
                      <p><strong>Remarks:</strong> {approvalStatus?.comments || 'No remarks provided.'}</p>
                    </>
                  );
                } else if (status === 'APPROVED') {
                  return (
                    <>
                      <strong>Request Status : </strong>
                      <span className="fw-bold text-success"> Approved</span>
                      <br />
                      <p><strong>Approved By:</strong> {approvalStatus?.approvedBy || 'N/A'}</p>
                      <p><strong>Remarks:</strong> {approvalStatus?.comments || 'No remarks provided.'}</p>
                    </>
                  );
                } else {
                  return <p className="fw-bold text-secondary">Request Status: Not Available</p>;
                }
              })()}

              <div className="text-center mt-4">
                <p className="text-muted">
                  For any grievances, complaints, or suggestions, please&nbsp;
                  <a href="/normal/contact" className="text-primary fw-semibold">contact us</a>.
                </p>
              </div>

            </div>
          </div>


        )}
      </div>
    </div>
  );
};

export default NormalRequestApprovalForm;
