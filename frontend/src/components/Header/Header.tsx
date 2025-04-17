import { FC } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Link, useLocation } from "react-router";
import { Logo } from "@/ui";

const Header: FC = () => {
  const { pathname } = useLocation();

  return (
    <Navbar
      shouldHideOnScroll
      className="bg-gray-800"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-4",
          "data-[active=true]:after:inset-x-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-white",
        ],
      }}
    >
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link className="text-white" to="/">
            Table of Memes
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/memeList"}>
          <Link className="text-white" to="/memeList">
            List of Memes
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent />
    </Navbar>
  );
};

export default Header;
