export default interface IErrorRecord {
  created_at: string;
  error: string | null;
  handled: boolean;
  id: number;
  page: string | null;
}


