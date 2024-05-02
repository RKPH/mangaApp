import Home from "../Pages/Home";
import Category from "../Pages/Category";
import TruyenMoi from "../Pages/TruyenMoi";
import DangPhatHanh from "../Pages/DangPhatHanh";
import Truyen from "../Pages/Truyen";
import CategoryManga from "../Pages/CategoryManga";
import HoanThanh from "../Pages/HoanThanh";
import ResultPage from "../Pages/ResultPage";
export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/Home",
    component: Home,
  },
  {
    path: "/danh-sach/the-loai",
    component: Category,
  },
  {
    path: "/the-loai/:slug",
    component: CategoryManga,
  },
  {
    path: "/danh-sach/truyen-moi",
    component: TruyenMoi, // Assuming Home is the component for displaying the list of new comics
  },
  {
    path: "/danh-sach/truyen-moi/:page", // Define a dynamic route parameter for the page number
    component: TruyenMoi, // Assuming Home is the component for displaying the list of new comics
  },
  {
    path: "/danh-sach/dang-phat-hanh",
    component: DangPhatHanh, // Assuming Home is the component for displaying the list of new comics
  },
  {
    path: "/danh-sach/dang-phat-hanh/:page", // Define a dynamic route parameter for the page number
    component: DangPhatHanh, // Assuming Home is the component for displaying the list of new comics
  },
  {
    path: "/danh-sach/hoan-thanh",
    component: HoanThanh, // Assuming Home is the component for displaying the list of new comics
  },
  {
    path: "/danh-sach/hoan-thanh/:page", // Define a dynamic route parameter for the page number
    component: HoanThanh, // Assuming Home is the component for displaying the list of new comics
  },
  {
    path: "/truyen-tranh/:slug",
    component: Truyen,
  },
  {
    path: "/result",
    component: ResultPage,
  },
];
