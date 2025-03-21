import React from "react";
import Operations from "../../components/OperationsMath";

const Resta: React.FC = () => {
  const subNumbers = (x: number, y: number): number => x - y;

  return (
    <div>
      <Operations a={5} b={3} calculate={subNumbers} />
    </div>
  );
};

export default Resta;