import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Terms = () => {
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getTerms } = useAuth();

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await getTerms();
        if (response?.data?.success && response.data.terms.length > 0) {
          setTermsData(response.data.terms[0]);
        } else {
          setError("No terms and conditions available");
        }
      } catch (err) {
        setError("Failed to load terms and conditions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, [getTerms]);

  if (loading) {
    return (
      <div className="text-center py-8">Loading terms and conditions...</div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-6">
        Terms & Conditions - divas Pvt. Ltd.
      </h1>

      {/* Terms Content */}
      <div
        className="terms-content mb-8"
        dangerouslySetInnerHTML={{ __html: termsData.content }}
      />

      <div className="contact mt-10">
        <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
        <p>
          <strong>Delhi Office:</strong> 179-A, 1st Floor, Jeewan Nagar, New
          Delhi - 110014
          <br />
          <strong>Faridabad Office:</strong> H. No. 351, Sector-48, Faridabad,
          Haryana - 121001
          <br />
          <strong>Email:</strong> *
          <br />
          <strong>Effective Date:</strong>{" "}
          {new Date(termsData.effectiveDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="footer mt-8 pt-4 border-t border-gray-200">
        <p>
          © 2014-{new Date().getFullYear()} divas Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Terms;
