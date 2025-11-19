// pages/InternshipApplicationFormPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Import Components
import ProgressSteps from "../components/InternshipForm/ProgressSteps";
import Step1Duration from "../components/InternshipForm/Step1Duration";
import Step2PersonalDetails from "../components/InternshipForm/Step2PersonalDetails";
import Step3AccountSetup from "../components/InternshipForm/Step3AccountSetup";
import Step4Payment from "../components/InternshipForm/Step4Payment";
import SuccessModal from "../components/InternshipForm/SuccessModal";
import { apiUrl } from "../utils/api";

// Password hashing function using Web Crypto API
const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const InternshipApplicationFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // NEW: fees state & loading
  const [internshipFee, setInternshipFee] = useState([]);
  const [feeLoading, setFeeLoading] = useState(true);
  const [feeError, setFeeError] = useState(null);

  const [formData, setFormData] = useState({
    duration: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    college: "",
    address: "",
    domain: "",
    linkedin: "",
    github: "",
    password: "",
    confirmPassword: "",
    agree: false,
    paymentChecked: false,
    emailConfirmed: false,
  });

  const [errors, setErrors] = useState({});

  // Set domain from navigation state
  useEffect(() => {
    if (location.state?.selectedDomain) {
      setFormData((prev) => ({
        ...prev,
        domain: location.state.selectedDomain,
      }));
    }
  }, [location.state]);

  // NEW: Fetch fees from backend on mount
  useEffect(() => {
    let mounted = true;
    const fetchFees = async () => {
      setFeeLoading(true);
      setFeeError(null);
      try {
        const res = await axios.get(apiUrl("/internship-fees"), {
          timeout: 10000,
        });
        // Backend returns objects like { duration, price (Number), currency, popular }
        // Map to include a display string for price so your components can show "₹199"
        const mapped = Array.isArray(res.data)
          ? res.data.map((f) => ({
              ...f,
              priceDisplay:
                typeof f.price === "number"
                  ? (f.currency === "INR" ? `₹${f.price}` : `${f.currency} ${f.price}`)
                  : f.price,
            }))
          : [];
        if (mounted) setInternshipFee(mapped);
      } catch (err) {
        console.error("Failed to load internship fees:", err);
        if (mounted) setFeeError("Failed to load fees. Please try again later.");
      } finally {
        if (mounted) setFeeLoading(false);
      }
    };

    fetchFees();
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.duration) {
        newErrors.duration = "Please select an internship duration";
      }
    }

    if (step === 2) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Phone number must be 10 digits";
      }
      if (!formData.dob) {
        newErrors.dob = "Date of birth is required";
      }
      if (!formData.college.trim()) {
        newErrors.college = "College name is required";
      }
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }
      if (!formData.linkedin.trim()) {
        newErrors.linkedin = "LinkedIn profile is required";
      }
    }

    if (step === 3) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password =
          "Password must contain uppercase, lowercase letters and numbers";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!formData.agree) {
        newErrors.agree = "You must agree to the terms and conditions";
      }
      if (!formData.emailConfirmed) {
        newErrors.emailConfirmed = "Please confirm your email address";
      }
    }

    if (step === 4) {
      if (!formData.paymentChecked) {
        newErrors.paymentChecked = "Please confirm the payment details";
      }
      if (!formData.agree) {
        newErrors.agree = "You must agree to the terms and conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    // prevent moving forward from step 1 if fees still loading or failed
    if (step === 1 && feeLoading) return;
    if (validateStep(step) && step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   if (!validateStep(4)) {
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   try {
  //     // Hash the password before sending
  //     const hashedPassword = await hashPassword(formData.password);

  //     // Prepare payload according to backend JSON schema
  //     const payload = {
  //       duration: formData.duration,
  //       fullName: formData.fullName,
  //       email: formData.email.toLowerCase().trim(), // Normalize email
  //       phone: formData.phone.replace(/\D/g, ""), // Normalize phone number
  //       dob: formData.dob,
  //       college: formData.college,
  //       address: formData.address,
  //       domain: formData.domain,
  //       linkedin: formData.linkedin,
  //       github: formData.github,
  //       password: hashedPassword, // Send hashed password
  //       agree: formData.agree,
  //     };

  //     // Send data to backend API
  //     const response = await axios.post(apiUrl("/applicants/register"), payload, {
  //       timeout: 120000, // 120 second timeout
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     // Handle success response
  //     if (response.status === 201) {
  //       setUniqueId(response.data.uniqueId);
  //       setShowSuccess(true);
  //       console.log("Application submitted successfully:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);

  //     if (error.response?.status === 409) {
  //       alert("⚠️ This email is already registered for an internship.");
  //     } else if (error.response?.data?.message) {
  //       alert(`❌ ${error.response.data.message}`);
  //     } else if (error.code === "ECONNABORTED") {
  //       alert("⏰ Request timeout. Please check your connection and try again.");
  //     } else {
  //       alert("❌ Something went wrong while submitting your application. Please try again.");
  //     }
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (!validateStep(4)) {
    setIsSubmitting(false);
    return;
  }

  try {
    const hashedPassword = await hashPassword(formData.password);

    const payload = {
      duration: formData.duration,
      fullName: formData.fullName,
      email: formData.email.toLowerCase().trim(),
      phone: formData.phone.replace(/\D/g, ""),
      dob: formData.dob,
      college: formData.college,
      address: formData.address,
      domain: formData.domain,
      linkedin: formData.linkedin,
      github: formData.github,
      password: hashedPassword,
      agree: formData.agree,
    };

    // Call backend to create Razorpay order
    const { data } = await axios.post(
      apiUrl("/payments/create-order-with-applicant"),
      payload
    );

    if (!data?.success) {
      alert("Failed to initiate payment. Try again!");
      setIsSubmitting(false);
      return;
    }

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: "GT Technovation",
      description: "Internship Registration Fee",
      order_id: data.orderId,
      handler: async function (response) {
        try {
          const verifyRes = await axios.post(apiUrl("/payments/verify"), {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            paymentDbId: data.paymentDbId,
          });

          if (verifyRes.data.success) {
            setUniqueId(verifyRes.data.uniqueId);
            setShowSuccess(true);
          } else {
            alert("Payment verification failed!");
          }
        } catch (err) {
          console.error("Verify error:", err);
          alert("Verification failed! Contact support.");
        } finally {
          setIsSubmitting(false);
        }
      },
      theme: { color: "#1D4ED8" },
      prefill: { name: formData.fullName, email: formData.email },
      modal: {
        ondismiss: function () {
          setIsSubmitting(false);
        },
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

  } catch (err) {
    console.error("Payment Error:", err);
    alert("Payment initiation failed. Try again!");
    setIsSubmitting(false);
  }
};
 
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate("/internships");
  };

  const steps = [
    { number: 1, title: "Duration" },
    { number: 2, title: "PersonalDetails" },
    { number: 3, title: "Password" },
    { number: 4, title: "Final" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 py-2 px-2 sm:px-4 mt-3">
      <SuccessModal
        showSuccess={showSuccess}
        uniqueId={uniqueId}
        handleCloseSuccess={handleCloseSuccess}
        handleLoginRedirect={handleLoginRedirect}
      />

      <div className="max-w-6xl mx-auto overflow-hidden">
        <div className="p-1 relative">
          <h1 className="text-2xl md:text-3xl font-bold text-center m-2 ml-4 md:ml-16">
            Internship Application
          </h1>
        </div>

        <ProgressSteps step={step} steps={steps} />

        <div className="px-4 md:px-8 pb-6 md:pb-8">
          {step === 1 && (
            <>
              {feeLoading ? (
                <div className="p-6 bg-white rounded shadow text-center">Loading internship...</div>
              ) : feeError ? (
                <div className="p-6 bg-red-50 rounded shadow text-center text-red-700">
                  {feeError}
                </div>
              ) : (
                <Step1Duration
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  handleNext={handleNext}
                  internshipFee={internshipFee}
                />
              )}
            </>
          )}

          {step === 2 && (
            <Step2PersonalDetails
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}

          {step === 3 && (
            <Step3AccountSetup
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}

          {step === 4 && (
            <Step4Payment
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleBack={handleBack}
              internshipFee={internshipFee}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-500 py-3">
          <div className="text-center text-gray-600 text-xs md:text-sm">
            Need help? Contact us at support@gttechnovation.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipApplicationFormPage;