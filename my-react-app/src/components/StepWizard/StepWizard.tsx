import React, { useState } from "react";
import ProfileForm from "../ProfileForm/ProfileForm";

const StepWizard = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);

  return (
    <div className="flex flex-col gap-6">
      {step === 1 && <ProfileForm onSaved={nextStep} />}
      {step === 2 && <div>Step 2: Take Diagnostic Quiz</div>}
      {step === 3 && <div>Step 3: Summary & Gamification</div>}
    </div>
  );
};

export default StepWizard;
