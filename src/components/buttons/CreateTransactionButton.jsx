import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

const CreateTransactionButton = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Link to="create">
        <Button
          outline
          gradientDuoTone="purpleToBlue"
          className="font-semibold"
        >
          <HiPlus className="mr-2 h-5 w-5" />
          Add Entries
        </Button>
      </Link>
    </div>
  );
};

export default CreateTransactionButton;
