export type InputProps = {
  type: string;
  placeholder: string;
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};
