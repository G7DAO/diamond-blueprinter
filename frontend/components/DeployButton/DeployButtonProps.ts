export interface IDeployButtonProps {
  children?: React.ReactNode;
  onClick: React.MouseEventHandler;
  deploying: boolean;
  error: boolean;
}
