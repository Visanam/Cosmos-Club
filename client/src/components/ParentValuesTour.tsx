import React from "react";
import { Joyride, STATUS, type EventData, type Step } from "react-joyride";

type ParentValuesTourProps = {
  run: boolean;
  onComplete: () => void;
  mode?: "home" | "lessons";
};

const homeSteps: Step[] = [
  {
    target: "[data-tour='value-selector']",
    title: "Begin with the moment that matters",
    content: "Choose one value your child is practising right now. There is no diagnosis here—only a gentle direction for tonight’s conversation.",
    placement: "bottom",
    skipBeacon: true,
  },
  {
    target: "[data-tour='value-pathway']",
    title: "Turn a value into a next step",
    content: "Once you choose a value, Visanam prepares a parent pathway with age-aware questions and a Season 1 story thread.",
    placement: "bottom",
  },
  {
    target: "[data-tour='outcome-strip']",
    title: "Look for small, real outcomes",
    content: "The goal is not a perfect lesson. It is a usable phrase, a shared ritual, or one kind next action your child can try in real life.",
    placement: "top",
  },
];

export const lessonTourSteps: Step[] = [
  {
    target: "[data-tour='moral-lesson-tag']",
    title: "Find the moment behind the lesson",
    content: "Every episode names both the value being practised and an ordinary moment where it can help. Use this pair to move from the page into a real conversation at home.",
    placement: "bottom",
    skipBeacon: true,
  },
];

export function ParentValuesTour({ run, onComplete, mode = "home" }: ParentValuesTourProps) {
  const handleEvent = ({ status }: EventData) => {
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) onComplete();
  };

  return <Joyride
    onEvent={handleEvent}
    continuous
    run={run}
    scrollToFirstStep
    steps={mode === "lessons" ? lessonTourSteps : homeSteps}
    options={{ buttons: ["back", "close", "primary"], closeButtonAction: "skip", overlayClickAction: false, overlayColor: "rgba(9, 31, 36, .58)", primaryColor: "#234f50", scrollOffset: 88, showProgress: true, skipBeacon: true, textColor: "#163c3d", zIndex: 1000 }}
    styles={{
      tooltip: { borderRadius: 18, boxShadow: "0 24px 72px rgba(8, 33, 36, .32)", padding: 22 },
      tooltipTitle: { fontFamily: "Eczar, Georgia, serif", fontSize: 22, lineHeight: 1.1 },
      tooltipContent: { fontFamily: "Manrope, sans-serif", fontSize: 14, lineHeight: 1.65, padding: "12px 0 18px" },
      buttonPrimary: { backgroundColor: "#234f50", borderRadius: 999, fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, padding: "10px 14px" },
      buttonBack: { color: "#54706d", fontFamily: "Manrope, sans-serif", fontSize: 12 },
      buttonSkip: { color: "#54706d", fontFamily: "Manrope, sans-serif", fontSize: 12 },
    }}
  />;
}
