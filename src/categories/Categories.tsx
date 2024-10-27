import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Button, Pagination } from 'flowbite-react';

type Category = {
  _id: string;
  name: string;
};

const Categories = () => {
  const auth = useContext(AuthContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

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

  const handleSelectCategory = (categoryId: string) => {
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
    const userId = auth;
    console.log("vimal",userId)
    try {
      await axios.post('http://127.0.0.1:5000/api/categories/select', { userId, categoryIds });
      alert('Categories updated successfully!');
    } catch (error) {
      console.error('Error updating categories:', error);
    }
  };

  const handleLogout = () => {
    auth?.logout(); 
    localStorage.removeItem('Token'); 
  };

  return (
    <div className="container mx-auto my-4 max-w-lg w-full px-4 sm:px-6 md:px-8 border-2 p-6 md:p-10 rounded-xl">
      <h1 className="text-xl sm:text-2xl text-center font-bold mb-4">Please mark your interests!</h1>
      <hr />
      <div className="flex flex-col ml-2 md:ml-4 items-start mt-3 space-y-2">
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
            <label htmlFor={category._id} className="text-base sm:text-lg">{category.name}</label>
          </div>
        ))}
      </div>

      <div className="mt-5 md:mt-7 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={handleSubmit}
          className="w-1/2 sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-center"
        >
          Submit Selection
        </Button>
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={handleLogout}
          className="w-1/2 sm:w-auto bg-red-500 text-center"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Categories;
