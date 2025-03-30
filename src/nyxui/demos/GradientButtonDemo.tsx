import React from "react";
import { GradientButton } from "@/nyxui/components/GradientButton";

const GradientButtonDemo = () => {
  return (
    <>
      <GradientButton variant="animated">Animated Gradient</GradientButton>
      <GradientButton variant="fill">Gradient Fill</GradientButton>
      <GradientButton variant="slide-up">Slide Up Effect</GradientButton>
    </>
  );
}

export default GradientButtonDemo;
