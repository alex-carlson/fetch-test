import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import {
  SearchIcon,
  Logo,
} from "@/components/icons";

export const Navbar = () => {

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    //hero ui navbar with just a centered logo
    <HeroUINavbar maxWidth="xl" position="sticky" className="flex justify-center py-6">
      <NavbarBrand as="li" className="gap-3 max-w-fit ">
        <NextLink className="flex justify-center items-center gap-1" href="/">
          <Logo className="text-primary" />
        </NextLink>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/browse">
            Browse
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="/favorites">
            Favorites
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="danger" href="/logout">
            Logout
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="sm:hidden absolut top-10" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color="foreground"
            href="/browse"
            size="lg"
          >
            Browse
          </Link>
          <Link
            className="w-full"
            color="foreground"
            href="/favorites"
            size="lg"
          >
            Favorites
          </Link>
          <Link
            className="w-full"
            color="warning"
            href="/logout"
            size="lg"
          >
            Logout
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
