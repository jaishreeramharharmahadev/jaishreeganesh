
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OtpInput from "../components/OtpInput";
import { apiUrl } from "../utils/api";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  Loader2,
  Shield,
  CheckCircle2,
  X,
} from "lucide-react";

const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [step, setStep] = useState(1);
  const [fpEmail, setFpEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [fpError, setFpError] = useState("");
  const [fpLoading, setFpLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendAllowed, setResendAllowed] = useState(false);
  const [resendUsed, setResendUsed] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer;
    if (step === 2 && !resendAllowed && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (step === 2 && countdown <= 0) {
      setResendAllowed(true);
    }
    return () => clearTimeout(timer);
  }, [step, countdown, resendAllowed]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(apiUrl("/auth/applicants/me"), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => navigate("/dashboard", { replace: true }))
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password)
      return setErrors({ general: "Please enter both email and password" });

    setIsLoading(true);

    try {
      const hashedPassword = await hashPassword(formData.password);

      const res = await axios.post(apiUrl(`/auth/login`), {
        email: formData.email.toLowerCase(),
        password: hashedPassword,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(user));

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setErrors({ general: "Invalid email or password. Please try again." });
    }
    setIsLoading(false);
  };

  const sendOtp = async () => {
    setFpError("");
    if (!fpEmail.trim())
      return setFpError("Please enter your registered email address");

    setFpLoading(true);

    try {
      await axios.post(apiUrl(`/auth/forgot-password`), {
        email: fpEmail.toLowerCase(),
      });

      setStep(2);
      setCountdown(60);
      setResendAllowed(false);
      setResendUsed(false);
    } catch (err) {
      setFpError(
        err.response?.data?.message || "Failed to send OTP. Please try again."
      );
    }
    setFpLoading(false);
  };

  const resendOtp = async () => {
    if (resendUsed) return;

    setFpError("");
    setFpLoading(true);

    try {
      await axios.post(apiUrl(`/auth/forgot-password`), {
        email: fpEmail.toLowerCase(),
      });

      setOtp(["", "", "", "", "", ""]);
      setCountdown(60);
      setResendAllowed(false);
      setResendUsed(true);
    } catch (err) {
      setFpError(
        err.response?.data?.message || "Failed to resend OTP. Please try again."
      );
    }

    setFpLoading(false);
  };

  const verifyOtp = async () => {
    if (otp.join("").length !== 6)
      return setFpError("Please enter the complete 6-digit OTP");

    setFpLoading(true);

    try {
      await axios.post(apiUrl(`/auth/verify-otp`), {
        email: fpEmail.toLowerCase(),
        otp: otp.join(""),
      });
      setStep(3);
    } catch (err) {
      setFpError(
        err.response?.data?.message || "Invalid OTP. Please try again."
      );
    }
    setFpLoading(false);
  };

  const updatePassword = async () => {
    if (newPassword.length < 6)
      return setFpError("Password must be at least 6 characters long");
    if (newPassword !== confirmNewPassword)
      return setFpError("Passwords do not match");

    setFpLoading(true);

    try {
      const hashedPwd = await hashPassword(newPassword);

      await axios.post(apiUrl(`/auth/reset-password`), {
        email: fpEmail.toLowerCase(),
        newPassword: hashedPwd,
      });

      setFpError("");
      setTimeout(() => {
        setShowForgotModal(false);
        setStep(1);
        setOtp(["", "", "", "", "", ""]);
        setFpEmail("");
        setResendAllowed(false);
        setResendUsed(false);
        setCountdown(60);
      }, 1500);
    } catch (err) {
      setFpError(
        err.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    }
    setFpLoading(false);
  };

  return (
    <div className="min-h-[90vh] flex bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="hidden lg:flex lg:w-[40%] bg-gradient-to-br from-emerald-700 to-teal-700 text-white p-10 flex-col justify-between">
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold mb-4">
            Welcome Back to Your Professional Journey
          </h1>
          <p className="text-blue-100 text-md mb-8">
            Access your personalized dashboard to track applications, discover
            new opportunities, and take the next step in your career.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-blue-50">Track your internship status</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-blue-50">
                Dashboard access after internship application
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-blue-50">
                Use the same email from your registration
              </span>
            </div>
          </div>

          <div className="bg-sky-600 rounded-2xl p-6 border border-blue-400/30">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="font-semibold">JS</span>
              </div>
              <div>
                <p className="font-semibold">Jessica Smith</p>
                <p className="text-blue-200 text-sm">
                  Full Stack Web Developer Intern
                </p>
              </div>
            </div>
            <p className="text-blue-50 italic">
              "The dashboard helped me track my applications and land my dream
              internship. The personalized recommendations were spot on!"
            </p>
          </div>
        </div>
      </div>

      <div className="flex-grow flex justify-center items-center p-3">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {errors.general && (
            <div className="mb-6 p-2 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-3 h-3 text-red-600" />
              </div>
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  className="w-full border rounded-md px-3 pl-10 py-2 focus:outline-sky-300 transition text-sm md:text-base"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border rounded-md px-3 pl-10 py-2 focus:outline-sky-300 transition text-sm md:text-base"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                className="text-blue-700 hover:text-blue-800 font-medium text-sm transition-colors hover:underline"
                onClick={() => setShowForgotModal(true)}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-blue-500 hover:to-sky-500 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>

            <div className="text-center mt-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-600 font-medium hover:text-blue-700 underline"
                onClick={() => navigate("/internships")}
              >
                Apply for Internship
              </button>
            </div>
          </form>
        </div>
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50">
          <div className="w-full max-w-md bg-white rounded-md shadow-xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between p-2 px-5 border-b border-gray-200">
              <div className="flex items-center gap-2">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <h3 className="text-xl font-semibold text-gray-900">
                  Reset Password
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowForgotModal(false);
                  setStep(1);
                  setOtp(["", "", "", "", "", ""]);
                  setFpEmail("");
                  setResendAllowed(false);
                  setResendUsed(false);
                  setCountdown(60);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-3 px-6">
              {fpError && (
                <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-sm flex items-center gap-3">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="w-3 h-3 text-red-600" />
                  </div>
                  <p className="text-red-700 text-sm">{fpError}</p>
                </div>
              )}

              {step === 1 && (
                <div>
                  <p className="text-gray-600 text-md mb-4">
                    Enter your registered email address and we'll send you a
                    verification code.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative mb-5">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        placeholder="Enter your registered email"
                        className="w-full border rounded-md px-3 pl-10 py-2 focus:outline-sky-300 transition text-sm md:text-base"
                        value={fpEmail}
                        onChange={(e) => setFpEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={sendOtp}
                    disabled={fpLoading}
                    className="mb-1 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-blue-500 hover:to-sky-500 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                  >
                    {fpLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Verification Code"
                    )}
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm mb-2">
                      We've sent a 6-digit verification code to
                    </p>
                    <p className="font-medium text-gray-900">{fpEmail}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                      Enter Verification Code
                    </label>
                    <OtpInput otp={otp} setOtp={setOtp} />
                  </div>

                  <button
                    onClick={verifyOtp}
                    disabled={fpLoading}
                    className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-blue-500 hover:to-sky-500 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                  >
                    {fpLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify Code"
                    )}
                  </button>

                  <div className="text-center">
                    {!resendAllowed ? (
                      <p className="text-gray-500 text-sm">
                        Resend code in {countdown}s
                      </p>
                    ) : (
                      <button
                        onClick={resendOtp}
                        disabled={resendUsed || fpLoading}
                        className={`text-sm font-medium transition-colors ${
                          resendUsed
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        {resendUsed
                          ? "Resend limit reached"
                          : "Resend verification code"}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    Create a new password for your account.
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="w-full border rounded-md px-3 pl-10 py-2 focus:outline-sky-300 transition text-sm md:text-base"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 6 characters long
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        className="w-full border rounded-md px-3 pl-10 py-2 focus:outline-sky-300 transition text-sm md:text-base"
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={updatePassword}
                    disabled={fpLoading}
                    className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-blue-500 hover:to-sky-500 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                  >
                    {fpLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;