import React from "react";
import Operations from "../../components/OperationsMath";

const Sum: React.FC = () => {
  const addNumbers = (x: number, y: number): number => x + y;

  return (
    <div>
      <Operations a={5} b={3} calculate={addNumbers} />
    </div>
  );
};

export default Sum;