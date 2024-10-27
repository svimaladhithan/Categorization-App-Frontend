import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, Checkbox, Pagination } from 'flowbite-react';
import { fetchCategories, fetchSelectedCategories, updateSelectedCategories } from '../services/categoryApi';
import { toast } from 'react-toastify';
import Toast from "../components/Toast";

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
    const fetchData = async () => {
      try {
        const { categories, totalPages } = await fetchCategories(currentPage);
        setCategories(categories);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error("Error fetching categories. Please try again.");
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth?.user?.userId;

      if (userId) {
        try {
          const savedCategories = await fetchSelectedCategories(userId);
          setSelectedCategories(new Set(savedCategories));
        } catch (error) {
          console.error('Error fetching selected categories:', error);
          toast.error("Error fetching categories. Please try again.");
        }
      }
    };

    fetchData();
  }, [auth?.user?.userId]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategories((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(categoryId)) {
        newSelected.delete(categoryId);
      } else {
        newSelected.add(categoryId);
      }
      return newSelected;
    });
  };

  const handleSubmit = async () => {
    const categoryIds = Array.from(selectedCategories);
    const userId = auth?.user?.userId;

    if (!userId) {
      toast.error("User is not logged in.");
      return;
    }

    try {
      await updateSelectedCategories(userId, categoryIds);
      toast.success("Categories updated successfully");
    } catch (error) {
      console.error('Error updating categories:', error);
      toast.error("Error updating categories. Please try again.");
    }
  };

  const handleLogout = () => {
    auth?.logout();
    localStorage.removeItem('Token');
  };
return (
    <div className="container mx-auto my-4 max-w-lg w-full px-4 sm:px-6 md:px-8 border-2 p-6 md:p-10 rounded-xl">
      <Toast />
      <h1 className="text-xl sm:text-2xl text-center font-bold mb-4">Please mark your interests!</h1>
      <p className="text-center text-sm mt-6">
        We will keep you notified.
      </p>
      <hr />
      <div className="flex flex-col ml-2 md:ml-4 items-start mt-3 space-y-2">
      <p className="text-center text-lg mt-4 mb-2">
        My saved interests!
      </p>
        {categories.map((category) => (
          <div key={category._id} className="flex items-center">
             <Checkbox
              id={category._id}
              checked={selectedCategories.has(category._id)}
              onChange={() => handleSelectCategory(category._id)}
              className="mr-2"
            />
            <label htmlFor={category._id} className="text-base sm:text-md">{category.name}</label>
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
