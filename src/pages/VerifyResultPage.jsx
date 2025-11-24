import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  User,
  Tag,
  IdCard,
  Search,
  Copy,
  Clock,
} from "lucide-react";
import { apiUrl } from "../utils/api";
import PreLoader from "../components/common/PreLoader";

export default function VerifyResultPage() {
  const { certificateNumber } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!certificateNumber) {
      setError("No certificate number provided");
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function fetchCert() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          apiUrl(
            `/certificates/verify/${encodeURIComponent(certificateNumber)}`
          )
        );
        if (!cancelled) setData(res.data);
      } catch (err) {
        if (!cancelled)
          setError(err?.response?.data?.message || "Certificate not found");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCert();
    return () => {
      cancelled = true;
    };
  }, [certificateNumber]);

  const copyToClipboard = () => {
    if (!certificateNumber) return;
    navigator.clipboard.writeText(certificateNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  function formatMonth(dstr) {
    if (!dstr) return "-";
    const d = new Date(dstr);
    if (isNaN(d)) return dstr;

    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E9F5F6]">
        <PreLoader text="Please wait while we verify the certificate..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E9F5F6] p-5">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
          <div className="text-center mb-4">
            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-[#0A444D]">
              Invalid Certificate
            </h3>
            <p className="text-sm text-gray-600">{error}</p>
          </div>

          <div className="bg-red-50 p-3 rounded-md mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-red-800">
                Certificate Number:
              </span>
              <code className="text-red-700">{certificateNumber}</code>
            </div>
          </div>

          <button
            onClick={() => navigate("/verify")}
            className="w-full bg-[#0A444D] text-white py-2 rounded-md hover:bg-[#08606B] transition"
          >
            <Search className="w-4 h-4 inline mr-2" />
            Verify Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9F5F6] py-8 px-3">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-8 h-8 text-[#0A8A92]" />
          <div>
            <h2 className="text-xl font-bold text-[#0A444D]">
              Certificate Verified
            </h2>
            <p className="text-sm text-green-600">
              Document issued by GT Technovation
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center border rounded-md p-3 mb-6 bg-[#F7FAFA]">
          <div>
            <p className="text-xs text-gray-600">Certificate ID</p>
            <code className="text-base font-semibold text-[#0A8A92] break-all">
              {data?.certificateNumber}
            </code>
          </div>
          <button
            onClick={copyToClipboard}
            className="p-2 hover:text-[#0A444D] transition"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        {copied && <div className="text-xs text-green-600 mb-3">Copied</div>}

        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          <div className="p-3 border rounded-lg bg-[#FAFEFE]">
            <User className="w-5 h-5 text-[#0A444D] mb-1" />
            <p className="text-xs text-gray-600">Full Name</p>
            <p className="font-semibold">{data?.fullName || "-"}</p>
          </div>

          <div className="p-3 border rounded-lg bg-[#FAFEFE]">
            <IdCard className="w-5 h-5 text-[#0A444D] mb-1" />
            <p className="text-xs text-gray-600">Applicant ID</p>
            <p className="font-semibold">{data?.applicantUniqueId || "-"}</p>
          </div>

          <div className="p-3 border rounded-lg bg-[#FAFEFE]">
            <Tag className="w-5 h-5 text-[#0A444D] mb-1" />
            <p className="text-xs text-gray-600">Domain / Course</p>
            <p className="font-semibold">{data?.domain || "-"}</p>
          </div>

          <div className="p-3 border rounded-lg bg-[#FAFEFE]">
            <Calendar className="w-5 h-5 text-[#0A444D] mb-1" />
            <p className="text-xs text-gray-600">Issued On</p>
            <p className="font-semibold">{formatMonth(data?.issueDate)}</p>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-[#F3FAFA]">
          <h4 className="font-semibold text-[#0A444D] mb-3 flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            Program Duration
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-600">Start Date</p>
              <p className="font-semibold">{formatMonth(data?.startDate)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">End Date</p>
              <p className="font-semibold">{formatMonth(data?.endDate)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/verify")}
            className="px-5 py-2 bg-[#0A444D] text-white text-sm rounded-md hover:bg-[#08606B] transition"
          >
            <Search className="w-4 h-4 inline mr-2" />
            Verify Another Certificate
          </button>
        </div>
      </div>

      <p className="text-center text-xs mt-4 text-gray-600">
        Need help? Contact:{" "}
        <a
          href="mailto:support@gttechnovation.com"
          className="text-[#0A8A92] underline"
        >
          support@gttechnovation.com
        </a>
      </p>
    </div>
  );
}