import { Banknote, Trash2 } from 'lucide-react';
import { currencyFormat } from '../lib/utils';

interface Props {
  categories: CategoryForm[];
  removeCategory: (category: string) => void;
}
export const CategoryList: React.FC<Props> = ({
  categories,
  removeCategory,
}) => {
  return (
    <ul className='flex items-center justify-center py-4 gap-4 flex-wrap'>
      {categories.map((category) => (
        <li
          key={category.name}
          className='border border-slate-400 rounded py-1 px-2 flex items-center gap-2'
        >
          <Banknote className='text-blue-400' />
          {category.name}: {currencyFormat(Number(category.budget))}
          <Trash2
            className='w-5 text-slate-400 hover:text-red-400'
            onClick={() => removeCategory(category.name)}
          />
        </li>
      ))}
    </ul>
  );
};
