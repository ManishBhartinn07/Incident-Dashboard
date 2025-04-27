export type Incident = {
  id: number;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  date: string;
};
