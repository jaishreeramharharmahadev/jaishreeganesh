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
          apiUrl(`/certificates/verify/${encodeURIComponent(certificateNumber)}`)
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <PreLoader text="Please wait while we verify the certificate details..."/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-lg w-full">
          <div className="text-center mb-5">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Verification Failed</h3>
            <p className="text-sm text-gray-600">{error}</p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">Certificate Number:</span>
              </div>
              <code className="text-sm text-red-700 bg-red-100 px-2 py-1 rounded break-all">
                {certificateNumber}
              </code>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={() => navigate("/verify")}
            >
              <Search className="w-4 h-4" />
              Verify Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 py-6 px-3">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 to-emerald-600 p-3 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Verified</h2>
                  <p className="text-green-100 text-sm">This certificate is authentic and issued by GT Technovation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Certificate Details</h3>
                <p className="text-sm md:text-base text-gray-600 mt-1">Complete information about the verified certificate</p>
              </div>

              <div className="mt-0 md:mt-0 text-left md:text-right">
                <div className="text-sm text-gray-500">Certificate ID</div>
                <div className="flex items-center gap-2 mt-1">
                  <code className="font-mono text-base md:text-lg font-semibold text-blue-600 break-all">{data?.certificateNumber}</code>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy certificate number"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copied && <div className="text-xs text-green-600 mt-1">Copied</div>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Full Name</div>
                    <div className="text-base font-semibold text-gray-900">{data?.fullName || "-"}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <IdCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Applicant Unique ID</div>
                    <div className="text-base font-semibold text-gray-900">{data?.applicantUniqueId || "-"}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Tag className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Domain / Course</div>
                    <div className="text-base font-semibold text-gray-900">{data?.domain || "-"}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Issued On</div>
                    <div className="text-base font-semibold text-gray-900">{data?.issueDate ? formatMonth(data.issueDate) : "-"}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm md:text-base">
                <Clock className="w-4 h-4 text-gray-600" />
                Program Duration
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Start Date</div>
                  <div className="text-base font-semibold text-gray-900">{formatMonth(data?.startDate)}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">End Date</div>
                  <div className="text-base font-semibold text-gray-900">{formatMonth(data?.endDate)}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-5 border-t border-gray-100">
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-400 text-black/80 rounded-lg font-semibold hover:bg-sky-300 transition-colors"
                onClick={() => navigate("/verify")}
              >
                <Search className="w-4 h-4" />
                Verify Another Certificate
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs md:text-sm text-gray-500">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@gttechnovation.com" className="text-blue-600 hover:underline">
              support@gttechnovation.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}