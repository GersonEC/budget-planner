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
    <ul className='flex items-center gap-6 justify-center'>
      {categories.map((category) => (
        <li key={category.name}>
          {category.name}{' '}
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
