import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import { useOnboardingStore } from "../../state/onboardingStore";

const AccountInfoPage = () => {
  const navigate = useNavigate();
  const setAccount = useOnboardingStore((s) => s.setAccount);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.jobTitle) {
      setAccount(formData); // persist in session store
      navigate("/onboarding/keywords");
    } else {
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
            <Input
              label="First Name"
              name="firstName"
              required
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="p-2"
            />
            <Input
              label="Last Name"
              name="lastName"
              required
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="p-2"
            />
            <Input
              label="Job Title"
              name="jobTitle"
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
