import {
  Button,
  Navbar,
} from "flowbite-react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

const Header = () => {

  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="#">
          <span className="text-2xl font-bold">ECOMMERCE</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link active={true} as={"div"}>
            Categories
          </Navbar.Link>
          <Navbar.Link as={"div"}>
            Sale
          </Navbar.Link>
          <Navbar.Link as={"div"}>
            Clearance
          </Navbar.Link>
          <Navbar.Link as={"div"}>
            New Stock
          </Navbar.Link>
          <Navbar.Link as={"div"}>
            Trending
          </Navbar.Link>
        </Navbar.Collapse>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4 text-gray-800 text-xs">
            <span className="md:inline">Help</span>
            <span className="md:inline">Orders & Returns</span>
            <span className=" md:inline">Hi, John</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button className=" sm:inline bg-gradient-to-r from-cyan-500 to-blue-500" pill>
              <FaSearch className="h-4 w-4" />
            </Button>
           
            <Button className=" sm:inline bg-gradient-to-r from-cyan-500 to-blue-500" pill>
              <FaShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Navbar>

      <div className="bg-gray-100 text-center py-2">
        <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
          Get 10% off on business sign up
        </a>
      </div>
    </>
  );
};

export default Header;