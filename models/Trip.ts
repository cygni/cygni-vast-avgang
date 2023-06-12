export type Trip = {
  id: string;
  platform: string;
  direction: string;
  number: string;
  estimatedDepartureTime: string;
  transportMode: string;
  colors: Colors;
};

type Colors = {
  foregroundColor: string;
  backgroundColor: string;
};
