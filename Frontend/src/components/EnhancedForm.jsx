import React, { useState } from "react";

const EnhancedForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone) return "Phone number is required";
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) return "Please enter a valid phone number";
    return "";
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "phone":
        return validatePhone(value);
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // UPDATED handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const response = await fetch("http://localhost:5000/api/waitlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        alert("✅ Successfully joined the waitlist!");
        setFormData({ name: "", email: "", phone: "" });
        setTouched({});
        setErrors({});
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("❌ Failed to submit: " + error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass =
      "w-full pl-10 md:pl-12 pr-10 md:pr-12 py-3 md:py-4 rounded-xl bg-white/5 backdrop-blur-sm border text-white placeholder-slate-300 focus:outline-none transition-all duration-300 text-sm md:text-base font-medium";

    if (errors[fieldName] && touched[fieldName]) {
      return `${baseClass} border-red-400/50 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 shadow-lg shadow-red-500/10`;
    } else if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
      return `${baseClass} border-green-400/50 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 shadow-lg shadow-green-500/10`;
    } else {
      return `${baseClass} border-white/20 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-white/30 shadow-lg shadow-black/10`;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 animate-pulse"></div>
            <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl"></div>
          </div>

          <div className="relative z-10 p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Join Waitlist
              </h2>
              <p className="text-slate-300 text-sm md:text-base">Get early access by joining our waitlist</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName("name")}
                  required
                />
                {errors.name && touched.name && <p className="mt-2 text-xs md:text-sm text-red-400">{errors.name}</p>}
              </div>

              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName("email")}
                  required
                />
                {errors.email && touched.email && <p className="mt-2 text-xs md:text-sm text-red-400">{errors.email}</p>}
              </div>

              <div className="relative group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName("phone")}
                  required
                />
                {errors.phone && touched.phone && <p className="mt-2 text-xs md:text-sm text-red-400">{errors.phone}</p>}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 md:py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600/80 to-cyan-600/80 text-white font-semibold text-base md:text-lg transition-all duration-300 hover:scale-[1.02] shadow-xl"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedForm;
