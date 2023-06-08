import React from "react";
import { FcFolder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const close = () => {
    if (window.confirm("Are you sure you want to go back?") == true) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="text-4xl font-bold py-2 flex items-center">
          <FcFolder className="mr-2 text-5xl" />
          ByteSensei
        </div>
        <div>
          <button
            class="bg-neutral-700 rounded-md p-2 inline-flex items-center justify-center text-gray-200  hover:bg-neutral-600"
            onClick={() => close()}
          >
            <span class="sr-only">Close menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="text-neutral-300 text-md">
        Here are the analytics of your project. You can also export them as an
        image format. If you like this software, please give it a star on its
        github repository.
      </div>
    </>
  );
};

export default Header;
