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
    <div>
      <ul>
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
    </div>
  );
};
