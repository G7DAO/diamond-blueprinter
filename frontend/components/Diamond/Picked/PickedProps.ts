import { IPickedElement, IFacet } from '@/types';

export interface IPickedProps extends IFacet {
  children?: React.ReactNode;
  onClick: React.MouseEventHandler;
}
