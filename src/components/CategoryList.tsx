import { currencyFormat } from '../lib/utils';
import { Button } from './ui/button';

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
        <li key={category.name} className='flex gap-1'>
          <div className='border border-slate-400 rounded py-1 px-2 text-center'>
            {category.name}
            {': '}
            {currencyFormat(Number(category.budget))}
          </div>
          <Button
            name='remove'
            variant='ghost'
            size='icon'
            onClick={() => removeCategory(category.name)}
          >
            ❌
          </Button>
        </li>
      ))}
    </ul>
  );
};
