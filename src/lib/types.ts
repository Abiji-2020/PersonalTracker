type ptod = {
  notes: string;
  isdone: boolean;
};

type striver_sheet = {
  problems_done: number;
  isdailydone: boolean;
  notes: string;
};

type personalProject = {
  name: string;
  notes: string;
  isdone: boolean;
};

type podcast = {
  name: string;
  notes: string;
  isdone: boolean;
};

type skillrack = {
  problems_done: number;
  isdailydone: boolean;
  notes: string;
};

export type { ptod, striver_sheet, personalProject, podcast, skillrack };
