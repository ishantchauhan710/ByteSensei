import React from "react";
import { FcFolder } from "react-icons/fc";

const Header = () => {
  return (
    <>
      <div className="text-4xl font-bold py-2 flex items-center">
        <FcFolder className="mr-2 text-5xl" />
        ByteSensei
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
