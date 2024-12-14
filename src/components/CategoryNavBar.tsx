import { useNavigate } from '@tanstack/react-router';

interface Props {
  categories: string[];
  activeCategory: string;
  setNewActiveCategory: (category: string) => void;
}

export function CategoryNavBar(props: Props) {
  const navigate = useNavigate();
  const setNewActiveCategory = (category: string) => {
    props.setNewActiveCategory(category);
  };

  const handleEditCategories = () => {
    navigate({
      to: '/categories',
    });
  };

  const liStyle =
    ' text-gray-200 border bg-zinc-800 text-gray-300 hover:cursor-pointer rounded shadow-md';

  return (
    <ul className='list-reset flex flex-wrap justify-center gap-2 bg-zinc-800 rounded mb-2 p-1 shadow-sm'>
      <li
        className={
          liStyle +
          (props.activeCategory === '' || props.activeCategory === undefined
            ? ' bg-grey-dark'
            : ' bg-grey-lighter')
        }
        onClick={() => setNewActiveCategory('')}
      >
        All
      </li>
      {props.categories
        ? props.categories.map((value, index) => {
            return (
              <li
                className={`${liStyle} ${
                  props.activeCategory === value ? 'bg-zinc-600 px-1' : ''
                }`}
                key={index}
                onClick={() => setNewActiveCategory(value)}
              >
                {value}
              </li>
            );
          })
        : '<li>No categories</li>'}
      <li className={liStyle} onClick={handleEditCategories}>
        ✏️
      </li>
    </ul>
  );
}
