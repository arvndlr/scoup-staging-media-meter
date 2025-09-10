import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import OnboardingLayout from "../../components/layout/OnboardingLayout";

const AccountInfoPage = () => {
  const navigate = useNavigate();

  // 1. Add state to hold form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
  });

  // Handle input changes and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault(); // Prevents the default form submission (page reload)

    // Check if all required fields are filled
    if (formData.firstName && formData.lastName && formData.jobTitle) {
      console.log("Form Data:", formData);
      // In a real application, you would save this data here (e.g., via an API call)

      // Navigate to the next step
      navigate("/onboarding/keywords");
    } else {
      // Optional: Provide user feedback if validation fails
      alert("Please fill in all required fields.");
    }
  };

  return (
    <OnboardingLayout>
      <div className="w-full h-full flex-1 flex flex-col items-center justify-center bg-[#faf9f5]">
        <Card>
          <h2 className="text-xl font-bold text-left">Account Information</h2>
          <p className="text-left text-sm text-black-600 mb-4">
            Create your account to get started with your newsletter journey
          </p>
          <form className="space-y-2" onSubmit={handleNext}>
            {/* Connect inputs to the component's state */}
            <Input
              label="First Name"
              name="firstName" // Add a name attribute to identify the input
              required
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="p-2"
            />
            <Input
              label="Last Name"
              name="lastName" // Add a name attribute
              required
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="p-2"
            />
            <Input
              label="Job Title"
              name="jobTitle" // Add a name attribute
              required
              type="text"
              placeholder="Enter your job title"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className="p-2"
            />
            <div className="mt-8">
              <Button
                type="submit"
                className="w-full bg-[#141413] hover:bg-[#121212] hover:text-[#ffba49]"
              >
                Next
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </OnboardingLayout>
  );
};

export default AccountInfoPage;
