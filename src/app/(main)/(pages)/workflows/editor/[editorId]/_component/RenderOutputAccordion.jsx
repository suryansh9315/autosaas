import { useFuzzieStore } from "@/store";
import React from "react";
import ContentBasedOnTitle from "./ContentBasedOnTitle";

const RenderOutputAccordion = ({ state, nodeConnection }) => {
  const {
    googleFile,
    setGoogleFile,
    selectedSlackChannels,
    setSelectedSlackChannels,
  } = useFuzzieStore();
  return (
    <ContentBasedOnTitle
      nodeConnection={nodeConnection}
      newState={state}
      file={googleFile}
      setFile={setGoogleFile}
      selectedSlackChannels={selectedSlackChannels}
      setSelectedSlackChannels={setSelectedSlackChannels}
    />
  );
};

export default RenderOutputAccordion;
