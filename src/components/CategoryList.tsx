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
            <button name='remove' onClick={() => removeCategory(category.name)}>
              ⛔️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
