import { useState } from "react";
import { loginAPI } from "../API/utils";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ setIsAuthenticated, setToast }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "password":
        if (!value) return "Password is required";
        if (value.length < 5)
          return "The Password length should be greater than 5";
        if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{1,}/.test(value)) {
          return "Password must contain at least 1 alphabet, 1 special character & 1 numeric digit";
        }
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
          return "Email is Invalid";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleLogin = async (e) => {
    e?.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      setToast({
        open: true,
        message: "Please fix the errors before submitting",
      });
      return;
    }

    try {
      const response = await loginAPI(formData);
      if (response.success) {
        setToast({
          open: true,
          message: response.message || "Login successful!",
        });
        setIsAuthenticated(true);
        navigate("/user/dashboard");
      } else {
        setToast({
          open: true,
          message:
            response.message || "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      setToast({
        open: true,
        message:
          error.response?.data?.message || "Login failed. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-96 px-4">
      <div className="w-full max-w-md space-y-6">
        <form
          onSubmit={handleLogin}
          className="border-2 rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <div className="flex flex-col mb-6">
            <label htmlFor="email" className="mb-2 text-sm font-medium">
              Email ID
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your Email ID"
              value={formData.email}
              onChange={handleChange}
              className={`border-2 rounded-md pl-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full ${
                errors.email ? "border-red-500" : ""
              }`}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  document.getElementById("password").focus();
                }
              }}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="mb-2 text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                maxLength="8"
                placeholder="Enter your password"
                className={`border-2 rounded-md pl-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full ${
                  errors.password ? "border-red-500" : ""
                }`}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleLogin(e);
                  }
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800"
                onClick={() => navigate("/register")}
              >
                Register here
              </button>
            </p>
          </div>
        </form>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials :</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Email: <span className="font-mono">span@mail.com</span></p>
                <p className="text-sm text-gray-600">Password: <span className="font-mono">Test@123</span></p>
              </div>
            </div>
      </div>
    </div>
  );
};

export default Login;
