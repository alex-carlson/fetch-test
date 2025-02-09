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
  HeartFilledIcon
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
      <NavbarContent className="hidden sm:flex gap-4 align-center" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/browse">
            Browse
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="/favorites">
            <HeartFilledIcon size={18} color={"violet"} />
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
      <NavbarMenu className="py-12 gap-4">
        {/* add top padding of 20 */}
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
            <HeartFilledIcon size={16} color={"violet"} />
            Favorites
          </Link>
          <Link
            className="w-full"
            color="danger"
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
