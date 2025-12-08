export interface Score {
  id?: number;
  title: string;
  composer?: {
    id: number;
    firstName: string;
    lastName: string;
  };
}
