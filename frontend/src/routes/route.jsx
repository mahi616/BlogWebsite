import { createBrowserRouter } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { Home } from "../pages/Home";
import { RegisterForm } from "../components/auth/RegisterForm";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { BlogPost } from "../pages/BlogPosts";
// import { Profile } from "../pages/Profile";
// import  Profile  from "../pages/Profile";
import MyBlogs from "../pages/MyBlogs";
import  BlogList  from "../components/blog/BlogList";
import  CreatePost  from "../components/blog/CreatePost";
import  EditPost  from "../components/blog/EditPost";
import NotFound from "../pages/NotFound";


const route = createBrowserRouter([
    { path:'/', element:<Home/> },
    { path:'/home', element:<Home/> },
    { path:'/about', element:<About/> },
    { path:'/contact', element:<Contact/> },

    // perticular blog post 
    { path:'/blog-post', element:<BlogPost/> },

    //  all blogs
    { path:'/blog-list', element:<BlogList/> },
    { path:"/blog-list/:id", element:<BlogPost/> },

    //  create blogs
    { path:'/blog-create', element:<CreatePost/> },

    //  edit blogs
    { path:'/blog-edit/:id', element:<EditPost/> },




    // user blogs
    { path:'/my-blogs', element:<MyBlogs/> },


    { path:'/login', element:<LoginForm/> },
    { path:'/register', element:<RegisterForm/> },


    { path:'*', element:<NotFound/> },


])

export default route