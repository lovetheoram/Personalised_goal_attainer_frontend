import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import StepWizard from "../../components/StepWizard/StepWizard";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import GamificationMessages from "../../components/GamificationMessages/GamificationMessages";
import MiniReport from "../../components/MiniReport/MiniReport";

const OnboardingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If onboarding is already complete, skip onboarding
    if ( user?.profile?.dob && user?.profile?.bio) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-8">Onboarding</h1>
      <section className="mb-8">
        <StepWizard />
      </section>
      <section className="mb-8 max-w-xl mx-auto">
        <ProgressBar progress={50} />
      </section>
      <section className="mb-8">
        <GamificationMessages />
      </section>
      <section className="mb-8">
        <MiniReport />
      </section>
    </div>
  );
};

export default OnboardingPage;
