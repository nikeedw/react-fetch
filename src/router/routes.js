import About from "../pages/About"
import Posts from "../pages/Posts"
import PostIdPage from "../pages/PostIdPage"
import Missing from "../pages/Missing"

export const routes = [
	{path: '/about', component: About, exact: true},
	{path: '/posts', component: Posts, exact: true},
	{path: '/posts/:id', component: PostIdPage, exact: true},
	{path: '*', component: Missing, exact: true},
]