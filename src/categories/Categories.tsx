import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Categories = () => {
  const auth = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/categories?page=${currentPage}`);
        setCategories(response.data.categories);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [currentPage]);

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('selectedCategories') || '[]');
    setSelectedCategories(new Set(savedCategories));
  }, []);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(categoryId)) {
        newSelected.delete(categoryId);
      } else {
        newSelected.add(categoryId);
      }
      localStorage.setItem('selectedCategories', JSON.stringify(Array.from(newSelected)));
      return newSelected;
    });
  };

  const handleSubmit = async () => {
    const categoryIds = Array.from(selectedCategories);
    const userId = auth.user; 

    try {
      await axios.post('http://127.0.0.1:5000/api/categories/select', { userId, categoryIds });
      alert('Categories updated successfully!');
    } catch (error) {
      console.error('Error updating categories:', error);
    }
  };

  const renderPagination = () => {
    const pages = [];
    let startPage, endPage;

    if (totalPages <= 7) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 4) {
        startPage = 1;
        endPage = 7;
      } else if (currentPage + 3 >= totalPages) {
        startPage = totalPages - 6;
        endPage = totalPages;
      } else {
        startPage = currentPage - 3;
        endPage = currentPage + 3;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i);
            }}
            className={`flex items-center justify-center px-3 h-8 leading-tight border ${
              i === currentPage
                ? 'text-blue-600 border-gray-300 bg-blue-50'
                : 'text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            {i}
          </a>
        </li>
      );
    }

    return (
      <nav aria-label="Page navigation example" className="mt-7">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </a>
          </li>
          {pages}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="container mx-auto my-4 max-w-md w-fit border-2 p-10 rounded-xl">
      <h1 className="text-2xl text-center font-bold mb-4">Please mark your interests!</h1>
      <hr />
      <div className="ml-4 items-center mt-3 space-y-2">
        {categories.map((category) => (
          <div key={category._id} className="flex items-center">
            <input
              type="checkbox"
              id={category._id}
              value={category._id}
              checked={selectedCategories.has(category._id)}
              onChange={() => handleSelectCategory(category._id)}
              className="mr-2"
            />
            <label htmlFor={category._id} className="text-lg">{category.name}</label>
          </div>
        ))}
      </div>
      {renderPagination()}
      <button onClick={handleSubmit} className="flex mx-auto mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Submit Selection
      </button>
    </div>
  );
};

export default Categories;
