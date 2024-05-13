export const ROUND = (number, precision) => {
  let factor = Math.pow(10, precision);
  let product = Math.round(number * factor);
  return product / factor;
};

export const HERMITE_MATRIX_CUBIC = math.matrix([
  [2, -2, 1, 1],
  [-3, 3, -2, -1],
  [0, 0, 1, 0],
  [1, 0, 0, 0],
]);
export const HERMITE_CONDITION = math.matrix([[0], [1], [0.5], [0]]);

export const BEZIER_MATRIX_CUBIC = math.matrix([
  [-1, 3, -3, 1],
  [3, -6, 3, 0],
  [-3, 3, 0, 0],
  [1, 0, 0, 0],
]);
export const BEZIER_CONDITION = math.matrix([[0], [3.855], [0], [0]]);

export const SPLINE_COEF = math.multiply(BEZIER_MATRIX_CUBIC, BEZIER_CONDITION);

export const CONSTANT = (x) => 1;
export const BELL = (x) => {
  const xMatrix = math.matrix([[x * x * x, x * x, x, 1]]);
  const result = math.multiply(xMatrix, SPLINE_COEF);
  return result.subset(math.index(0, 0));
};
