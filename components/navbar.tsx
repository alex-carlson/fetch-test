"use client";
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
import { Link } from "@heroui/link";
import { UserDataProvider } from "@/context/UserContext";
import { useUserDataContext } from "@/context/UserContext";

import {
  SearchIcon,
  Logo,
  HeartFilledIcon
} from "@/components/icons";

export const Navbar = () => {

  const { name } = useUserDataContext();

  //conditionally render browse and favorites buttons
  const DesktopNav = () => {
    // if name is not empty, render browse, favorites, and logout buttons
    if (name) {
      return (
        <NavbarContent className="hidden sm:flex gap-4 align-center" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/browse">
              Browse
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" href="/favorites">
              <HeartFilledIcon color={"violet"} size={18} />
              Favorites
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="danger" href="/logout">
              Logout
            </Link>
          </NavbarItem>
        </NavbarContent>
      );
    } else {
      // render login button
      return (
        <NavbarContent className="hidden sm:flex gap-4 align-center" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Login
            </Link>
          </NavbarItem>
        </NavbarContent>
      );
    }
  };

  const MobileNav = () => {
    // if name is not empty, render browse and favorites buttons
    if (name) {
      return (
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
            <HeartFilledIcon color={"violet"} size={16} />
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
      );
    } else {
      // render login button
      return (
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="/" size="lg">
            Login
          </Link>
        </NavbarMenuItem>
      );
    }
  };

  return (
    //hero ui navbar with just a centered logo
    <HeroUINavbar className="flex justify-center py-6" maxWidth="xl" position="sticky">
      <NavbarBrand as="li" className="gap-3 max-w-fit ">
        <NextLink className="flex justify-center items-center gap-1" href={name ? "/browse" : "/"}>
          <Logo className="text-primary" />
        </NextLink>
      </NavbarBrand>
      <DesktopNav />
      <NavbarContent className="sm:hidden absolut top-10" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu className="py-12 gap-4">
        <MobileNav />
      </NavbarMenu>
    </HeroUINavbar>
  );
};
