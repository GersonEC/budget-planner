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
    <ul className='flex flex-col'>
      {categories.map((category) => (
        <li key={category.name}>
          {category.name}
          {': '}
          {currencyFormat(Number(category.budget))}
          <Button
            name='remove'
            variant='ghost'
            size='icon'
            onClick={() => removeCategory(category.name)}
          >
            ⛔️
          </Button>
        </li>
      ))}
    </ul>
  );
};
