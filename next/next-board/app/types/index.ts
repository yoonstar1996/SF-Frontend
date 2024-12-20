export interface Page {
  id: number;
  title: string;
  from: Date | null;
  to: Date | null;
  boards: BoardData[];
}

export interface BoardData {
  id: string;
  isCompleted: boolean;
  title: string;
  from: Date | null;
  to: Date | null;
  contents: string;
}
