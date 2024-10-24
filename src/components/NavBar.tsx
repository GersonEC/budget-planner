import { useNavigate } from '@tanstack/react-router';

interface Props {
  categories: string[];
  activeCategory: string;
  setNewActiveCategory: (category: string) => void;
}

function NavBar(props: Props) {
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
    'p-4 inline bg-grey-lighter hover:bg-grey-light uppercase font-black cursor-pointer';

  return (
    <ul className='list-reset flex justify-center border-b-4 mb-0'>
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
                className={liStyle}
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

export default NavBar;
