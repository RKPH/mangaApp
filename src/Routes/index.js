import Home from '../Pages/Home'
import Category from '../Pages/Category'
import Truyen from '../Pages/Truyen'
import CategoryManga from '../Pages/CategoryManga'
import ResultPage from '../Pages/ResultPage'
import LoginForm from '../Pages/LoginPage'
import SignUpForm from '../Pages/SignInPage'
import UserLibrary from '../Pages/UserLibrary'
import Personalpage from '../Pages/Personal'
import EditProfile from '../Pages/EditProfile'
import Gacha from '../Pages/VongQuay/gacha'
import Chapter from '../Pages/Chapter'
import GachaLayout from '../Layout/GachaLayout'
import ComicList from '../Pages/MangaList'
import TruyenLayout from '../Layout/TruyenLayout'
import Shop from '../Pages/Shop'

export const publicRoutes = [
  {
    path: '/',
    component: LoginForm
  },
  {
    path: '/Signin',
    component: SignUpForm
  },
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/danh-sach/the-loai',
    component: Category
  },
  {
    path: '/the-loai/:slug',
    component: CategoryManga
  },
  {
    path: '/danh-sach/:type',
    component: ComicList
  },
  {
    path: '/danh-sach/:type/:page',
    component: ComicList
  },
  {
    path: '/truyen-tranh/:slug',
    component: Truyen
  },
  {
    path: '/truyen-tranh/:slug/:chapter',
    component: Chapter,
    layout: TruyenLayout
  },
  {
    path: '/gacha',
    component: Gacha,
    layout: GachaLayout
  },
  {
    path: '/result',
    component: ResultPage
  },
  {
    path: '/login',
    component: LoginForm
  },
  {
    path: '/library',
    component: UserLibrary
  },
  {
    path: '/setting',
    component: EditProfile
  },
  {
    path: '/me',
    component: Personalpage
  },
  {
    path: '/Shop',
    component: Shop
  }
]
