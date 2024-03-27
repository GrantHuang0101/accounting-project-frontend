import React from "react";
import { Button } from "flowbite-react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate(-1);
      }}
      outline
      pill
      size="sm"
    >
      <HiArrowNarrowLeft className="h-6 w-6" />
    </Button>
  );
};

export default BackButton;
