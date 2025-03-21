import React from "react";

interface OperationsProps {
  a: number;
  b: number;
  calculate: (x: number, y: number) => number;
}

const Operations: React.FC<OperationsProps> = ({ a, b, calculate }) => {
  return <p>Resultado: {calculate(a, b)}</p>;
};

export default Operations;