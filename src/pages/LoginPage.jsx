import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Password hashing function
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
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/applicants/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              timeout: 5000,
            }
          );

          if (response.status === 200) {
            // User is authenticated, redirect to dashboard
            navigate("/dashboard", { replace: true });
          }
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
    if (errors.general) {
      setErrors({ ...errors, general: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Hash the password before sending
      const hashedPassword = await hashPassword(formData.password);

      // Send login request to backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email.toLowerCase().trim(),
          password: hashedPassword,
        },
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store token in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));

        // Redirect to dashboard or intended page
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        setErrors({ general: "Invalid email or password" });
      } else if (error.response?.status === 404) {
        setErrors({ general: "User not found. Please check your email." });
      } else if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else if (error.code === "ECONNABORTED") {
        setErrors({ general: "Request timeout. Please try again." });
      } else if (error.message === "Network Error") {
        setErrors({ general: "Network error. Please check your connection." });
      } else {
        setErrors({ general: "Login failed. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Left Section - Attractive Design */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-10 flex-col justify-between">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-4">
            Welcome Back to Your Professional Journey
          </h1>
          <p className="text-blue-100 text-md mb-8">
            Access your personalized dashboard to track applications, discover
            new opportunities, and take the next step in your career.
          </p>

          {/* Features List */}
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

          {/* Testimonial */}
          <div className="bg-blue-500/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="font-semibold">JS</span>
              </div>
              <div>
                <p className="font-semibold">Jessica Smith</p>
                <p className="text-blue-200 text-sm">
                  Software Engineer Intern
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

      {/* Right Section - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Login</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="border border-red-200 bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your registered email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.email
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.password
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold flex items-center justify-center shadow-sm"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in to dashboard"
              )}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/internships")}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Apply for Internship
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

// // Password hashing function
// const hashPassword = async (password) => {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(password);
//   const hash = await crypto.subtle.digest('SHA-256', data);
//   return Array.from(new Uint8Array(hash))
//     .map(b => b.toString(16).padStart(2, '0'))
//     .join('');
// };

// function LoginPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('login'); // 'login' or 'forgot'

//   // Forgot password states
//   const [forgotPasswordData, setForgotPasswordData] = useState({
//     email: '',
//     code: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: email, 2: code, 3: new password
//   const [isSendingCode, setIsSendingCode] = useState(false);
//   const [isVerifyingCode, setIsVerifyingCode] = useState(false);
//   const [isResettingPassword, setIsResettingPassword] = useState(false);
//   const [countdown, setCountdown] = useState(0);

//   // Check if user is already logged in
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem('authToken');
//       if (token) {
//         try {
//           const response = await axios.get('http://localhost:5000/api/applicants/me', {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             },
//             timeout: 5000
//           });

//           if (response.status === 200) {
//             navigate('/dashboard', { replace: true });
//           }
//         } catch (error) {
//           localStorage.removeItem('authToken');
//           localStorage.removeItem('userData');
//         }
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   // Countdown timer for resend code
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     if (errors[e.target.name]) {
//       setErrors({
//         ...errors,
//         [e.target.name]: ''
//       });
//     }
//     if (errors.general) {
//       setErrors({ ...errors, general: '' });
//     }
//   };

//   const handleForgotPasswordChange = (e) => {
//     setForgotPasswordData({
//       ...forgotPasswordData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateForgotPassword = (step) => {
//     const newErrors = {};

//     if (step === 1) {
//       if (!forgotPasswordData.email.trim()) {
//         newErrors.email = 'Email is required';
//       } else if (!/\S+@\S+\.\S+/.test(forgotPasswordData.email)) {
//         newErrors.email = 'Email is invalid';
//       }
//     } else if (step === 2) {
//       if (!forgotPasswordData.code.trim()) {
//         newErrors.code = 'Verification code is required';
//       } else if (!/^\d{6}$/.test(forgotPasswordData.code)) {
//         newErrors.code = 'Code must be 6 digits';
//       }
//     } else if (step === 3) {
//       if (!forgotPasswordData.newPassword) {
//         newErrors.newPassword = 'New password is required';
//       } else if (forgotPasswordData.newPassword.length < 6) {
//         newErrors.newPassword = 'Password must be at least 6 characters';
//       }

//       if (!forgotPasswordData.confirmPassword) {
//         newErrors.confirmPassword = 'Please confirm your password';
//       } else if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
//         newErrors.confirmPassword = 'Passwords do not match';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);

//     try {
//       const hashedPassword = await hashPassword(formData.password);

//       const response = await axios.post(
//         'http://localhost:5000/api/auth/login',
//         {
//           email: formData.email.toLowerCase().trim(),
//           password: hashedPassword
//         },
//         {
//           timeout: 10000,
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.status === 200) {
//         const { token, user } = response.data;

//         localStorage.setItem('token', token);
//         localStorage.setItem('userData', JSON.stringify(user));

//         const from = location.state?.from?.pathname || '/dashboard';
//         navigate(from, { replace: true });
//       }
//     } catch (error) {
//       console.error('Login error:', error);

//       if (error.response?.status === 401) {
//         setErrors({ general: 'Invalid email or password' });
//       } else if (error.response?.status === 404) {
//         setErrors({ general: 'User not found. Please check your email.' });
//       } else if (error.response?.data?.message) {
//         setErrors({ general: error.response.data.message });
//       } else if (error.code === 'ECONNABORTED') {
//         setErrors({ general: 'Request timeout. Please try again.' });
//       } else if (error.message === 'Network Error') {
//         setErrors({ general: 'Network error. Please check your connection.' });
//       } else {
//         setErrors({ general: 'Login failed. Please try again.' });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendVerificationCode = async () => {
//     if (!validateForgotPassword(1)) return;

//     setIsSendingCode(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/auth/forgot-password',
//         {
//           email: forgotPasswordData.email.toLowerCase().trim()
//         },
//         {
//           timeout: 10000
//         }
//       );

//       if (response.status === 200) {
//         setForgotPasswordStep(2);
//         setCountdown(60); // 60 seconds countdown
//         setErrors({ general: 'Verification code sent to your email!' });
//       }
//     } catch (error) {
//       if (error.response?.status === 404) {
//         setErrors({ general: 'No account found with this email address.' });
//       } else if (error.response?.data?.message) {
//         setErrors({ general: error.response.data.message });
//       } else {
//         setErrors({ general: 'Failed to send verification code. Please try again.' });
//       }
//     } finally {
//       setIsSendingCode(false);
//     }
//   };

//   const handleVerifyCode = async () => {
//     if (!validateForgotPassword(2)) return;

//     setIsVerifyingCode(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/auth/verify-reset-code',
//         {
//           email: forgotPasswordData.email.toLowerCase().trim(),
//           code: forgotPasswordData.code
//         },
//         {
//           timeout: 10000
//         }
//       );

//       if (response.status === 200) {
//         setForgotPasswordStep(3);
//         setErrors({ general: 'Code verified! Now set your new password.' });
//       }
//     } catch (error) {
//       if (error.response?.status === 400) {
//         setErrors({ general: 'Invalid or expired verification code.' });
//       } else {
//         setErrors({ general: 'Verification failed. Please try again.' });
//       }
//     } finally {
//       setIsVerifyingCode(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!validateForgotPassword(3)) return;

//     setIsResettingPassword(true);
//     try {
//       const hashedPassword = await hashPassword(forgotPasswordData.newPassword);

//       const response = await axios.post(
//         'http://localhost:5000/api/auth/reset-password',
//         {
//           email: forgotPasswordData.email.toLowerCase().trim(),
//           code: forgotPasswordData.code,
//           newPassword: hashedPassword
//         },
//         {
//           timeout: 10000
//         }
//       );

//       if (response.status === 200) {
//         setErrors({ general: 'Password reset successfully! You can now login with your new password.', type: 'success' });
//         setTimeout(() => {
//           setActiveTab('login');
//           setForgotPasswordStep(1);
//           setForgotPasswordData({
//             email: '',
//             code: '',
//             newPassword: '',
//             confirmPassword: ''
//           });
//         }, 2000);
//       }
//     } catch (error) {
//       if (error.response?.status === 400) {
//         setErrors({ general: 'Invalid or expired verification code.' });
//       } else {
//         setErrors({ general: 'Password reset failed. Please try again.' });
//       }
//     } finally {
//       setIsResettingPassword(false);
//     }
//   };

//   const handleResendCode = async () => {
//     if (countdown > 0) return;

//     setIsSendingCode(true);
//     try {
//       await axios.post(
//         'http://localhost:5000/api/auth/forgot-password',
//         {
//           email: forgotPasswordData.email.toLowerCase().trim()
//         },
//         {
//           timeout: 10000
//         }
//       );

//       setCountdown(60);
//       setErrors({ general: 'Verification code resent to your email!' });
//     } catch (error) {
//       setErrors({ general: 'Failed to resend code. Please try again.' });
//     } finally {
//       setIsSendingCode(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Section - Enhanced Design */}
//       <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-12 flex-col justify-between relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
//           <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
//           <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
//         </div>

//         <div className="relative z-10">
//           <div className="flex items-center space-x-3 mb-16">
//             <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
//               <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             </div>
//             <span className="text-xl font-bold">CareerConnect</span>
//           </div>

//           <div className="max-w-md">
//             <h1 className="text-4xl font-bold mb-6">
//               {activeTab === 'login' ? 'Welcome Back to Your Professional Journey' : 'Reset Your Password'}
//             </h1>

//             {activeTab === 'login' ? (
//               <>
//                 <p className="text-blue-100 text-lg mb-8">
//                   Access your personalized dashboard to track applications, discover new opportunities, and take the next step in your career.
//                 </p>

//                 {/* Features List */}
//                 <div className="space-y-4 mb-12">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                     <span className="text-blue-50">Dashboard access after internship application</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                     <span className="text-blue-50">Use the same email from your registration</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                     <span className="text-blue-50">Secure password reset available</span>
//                   </div>
//                 </div>

//                 {/* Testimonial */}
//                 <div className="bg-blue-500/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30">
//                   <div className="flex items-center space-x-4 mb-4">
//                     <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
//                       <span className="font-semibold">JS</span>
//                     </div>
//                     <div>
//                       <p className="font-semibold">Jessica Smith</p>
//                       <p className="text-blue-200 text-sm">Software Engineer Intern</p>
//                     </div>
//                   </div>
//                   <p className="text-blue-50 italic">
//                     "Applied for an internship and got immediate dashboard access to track my application. The process was seamless!"
//                   </p>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <p className="text-blue-100 text-lg mb-8">
//                   Secure password reset process. Enter your registered email to receive a verification code and set a new password.
//                 </p>

//                 {/* Security Features */}
//                 <div className="space-y-4 mb-12">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                     </div>
//                     <span className="text-blue-50">6-digit verification code sent to your email</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                       </svg>
//                     </div>
//                     <span className="text-blue-50">Secure password update process</span>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="relative z-10 text-blue-200 text-sm">
//           © 2024 CareerConnect. All rights reserved.
//         </div>
//       </div>

//       {/* Right Section - Login/Forgot Password Form */}
//       <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
//         <div className="mx-auto w-full max-w-md">
//           {/* Mobile Logo */}
//           <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
//             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             </div>
//             <span className="text-xl font-bold text-gray-900">CareerConnect</span>
//           </div>

//           {/* Tab Navigation */}
//           <div className="flex border-b border-gray-200 mb-8">
//             <button
//               onClick={() => setActiveTab('login')}
//               className={`flex-1 py-4 font-medium text-center border-b-2 transition-colors ${
//                 activeTab === 'login'
//                   ? 'border-blue-600 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Sign In
//             </button>
//             <button
//               onClick={() => setActiveTab('forgot')}
//               className={`flex-1 py-4 font-medium text-center border-b-2 transition-colors ${
//                 activeTab === 'forgot'
//                   ? 'border-blue-600 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Reset Password
//             </button>
//           </div>

//           {/* Header */}
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-900">
//               {activeTab === 'login' ? 'Welcome back' : 'Reset Password'}
//             </h2>
//             <p className="text-gray-600 mt-2">
//               {activeTab === 'login'
//                 ? 'Sign in to your account'
//                 : 'Enter your email to reset your password'
//               }
//             </p>
//           </div>

//           {/* Error/Success Message */}
//           {errors.general && (
//             <div className={`border px-4 py-3 rounded-lg mb-6 flex items-center ${
//               errors.type === 'success'
//                 ? 'border-green-200 bg-green-50 text-green-700'
//                 : 'border-red-200 bg-red-50 text-red-700'
//             }`}>
//               <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {errors.type === 'success' ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 )}
//               </svg>
//               {errors.general}
//             </div>
//           )}

//           {/* Login Form */}
//           {activeTab === 'login' && (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter your registered email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
//                     errors.email ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.email && (
//                   <p className="text-red-600 text-sm mt-1 flex items-center">
//                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     {errors.email}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <button
//                     type="button"
//                     onClick={() => setActiveTab('forgot')}
//                     className="text-sm text-blue-600 hover:text-blue-500 font-medium"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
//                     errors.password ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.password && (
//                   <p className="text-red-600 text-sm mt-1 flex items-center">
//                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     {errors.password}
//                   </p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold flex items-center justify-center shadow-sm"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Signing in...
//                   </>
//                 ) : (
//                   'Sign in to dashboard'
//                 )}
//               </button>
//             </form>
//           )}

//           {/* Forgot Password Form */}
//           {activeTab === 'forgot' && (
//             <div className="space-y-6">
//               {/* Step 1: Email Input */}
//               {forgotPasswordStep === 1 && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Registered Email Address
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Enter your registered email"
//                       value={forgotPasswordData.email}
//                       onChange={handleForgotPasswordChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
//                         errors.email ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
//                       }`}
//                     />
//                     {errors.email && (
//                       <p className="text-red-600 text-sm mt-1 flex items-center">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   <button
//                     onClick={handleSendVerificationCode}
//                     disabled={isSendingCode}
//                     className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold flex items-center justify-center shadow-sm"
//                   >
//                     {isSendingCode ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Sending Code...
//                       </>
//                     ) : (
//                       'Send Verification Code'
//                     )}
//                   </button>
//                 </>
//               )}

//               {/* Step 2: Code Verification */}
//               {forgotPasswordStep === 2 && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       6-Digit Verification Code
//                     </label>
//                     <input
//                       type="text"
//                       name="code"
//                       placeholder="Enter 6-digit code"
//                       maxLength="6"
//                       value={forgotPasswordData.code}
//                       onChange={handleForgotPasswordChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
//                         errors.code ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
//                       }`}
//                     />
//                     {errors.code && (
//                       <p className="text-red-600 text-sm mt-1 flex items-center">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         {errors.code}
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex space-x-3">
//                     <button
//                       onClick={handleResendCode}
//                       disabled={countdown > 0 || isSendingCode}
//                       className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold"
//                     >
//                       {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
//                     </button>
//                     <button
//                       onClick={handleVerifyCode}
//                       disabled={isVerifyingCode}
//                       className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold flex items-center justify-center"
//                     >
//                       {isVerifyingCode ? (
//                         <>
//                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Verifying...
//                         </>
//                       ) : (
//                         'Verify Code'
//                       )}
//                     </button>
//                   </div>
//                 </>
//               )}

//               {/* Step 3: New Password */}
//               {forgotPasswordStep === 3 && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       name="newPassword"
//                       placeholder="Enter new password"
//                       value={forgotPasswordData.newPassword}
//                       onChange={handleForgotPasswordChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
//                         errors.newPassword ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
//                       }`}
//                     />
//                     {errors.newPassword && (
//                       <p className="text-red-600 text-sm mt-1 flex items-center">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         {errors.newPassword}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Confirm New Password
//                     </label>
//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       placeholder="Confirm new password"
//                       value={forgotPasswordData.confirmPassword}
//                       onChange={handleForgotPasswordChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
//                         errors.confirmPassword ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
//                       }`}
//                     />
//                     {errors.confirmPassword && (
//                       <p className="text-red-600 text-sm mt-1 flex items-center">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         {errors.confirmPassword}
//                       </p>
//                     )}
//                   </div>

//                   <button
//                     onClick={handleResetPassword}
//                     disabled={isResettingPassword}
//                     className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold flex items-center justify-center shadow-sm"
//                   >
//                     {isResettingPassword ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Resetting...
//                       </>
//                     ) : (
//                       'Reset Password'
//                     )}
//                   </button>
//                 </>
//               )}

//               {/* Back to Login */}
//               <div className="text-center">
//                 <button
//                   onClick={() => {
//                     setActiveTab('login');
//                     setForgotPasswordStep(1);
//                     setForgotPasswordData({
//                       email: '',
//                       code: '',
//                       newPassword: '',
//                       confirmPassword: ''
//                     });
//                   }}
//                   className="text-blue-600 hover:text-blue-500 font-medium"
//                 >
//                   ← Back to Sign In
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Additional Links for Login */}
//           {activeTab === 'login' && (
//             <div className="mt-8 text-center">
//               <p className="text-gray-600">
//                 Don't have an account?{' '}
//                 <button
//                   onClick={() => navigate('/internships')}
//                   className="text-blue-600 hover:text-blue-500 font-medium"
//                 >
//                   Apply for Internship
//                 </button>
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
