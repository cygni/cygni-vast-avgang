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

export type StopArea = {
  id: string;
  name: string;
  offset: string;
  limit: string;
};

export type ColumnWrapper = {
  colLeft: Column[];
  colMiddle: Column[];
  colRight: Column[];
};

export type Column = {
  title: string;
  trips: Trip[];
};
