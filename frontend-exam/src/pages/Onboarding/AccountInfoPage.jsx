import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import OnboardingLayout from '../../components/layout/OnboardingLayout';

const AccountInfoPage = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        // Here you would save the data to a state or your database
        // and then navigate to the next step.
        navigate('/onboarding/keywords');
    };

    return (
        <OnboardingLayout>
            <Card>
                <h2 className="text-2xl font-bold text-center mb-6">Account Information</h2>
                <p className="text-center text-gray-600 mb-8">
                    Create your account to get started with your newsletter journey
                </p>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                    <Input label="First Name*" type="text" placeholder="Enter your first name" />
                    <Input label="Last Name*" type="text" placeholder="Enter your last name" />
                    <Input label="Job Title*" type="text" placeholder="Enter your job title" />
                    <div className="mt-8">
                        <Button type="submit" className="w-full bg-black hover:bg-gray-800">
                            Next
                        </Button>
                    </div>
                </form>
            </Card>
        </OnboardingLayout>
    );
};

export default AccountInfoPage;