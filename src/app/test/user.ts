import { Option } from "../shared/models/address/option";

export interface User {
  id: number;
  isSelected: boolean;
  ingredient: Option;
  quantity: number;
  IsEdit: boolean;
}

export const UserColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'ingredient',
    type: 'text',
    label: 'Ingredient',
    required: true,
  },
  {
    key: 'quantity',
    type: 'text',
    label: 'Quantity',
    required: true,
  },
  {
    key: 'delete',
    type: 'delete',
    label: '',
  },
];
