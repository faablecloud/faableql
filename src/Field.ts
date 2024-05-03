export type Field = {
  name: string;
  db: string;
  cast?: (value: any) => any;
};
