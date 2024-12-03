export enum EStatus {
  incomplete = "incomplete",
  complete = "complete",
}

export type TTask = {
  id: string;
  name: string;
  description: string;
  status: EStatus;
};

export type TFilter = "all" | EStatus;
