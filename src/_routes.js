import React from 'react'
import { Redirect } from 'react-router-dom'
const LessonsView = React.lazy(() => import('./views/lessons-view'))
const LoginView = React.lazy(() => import('./views/login-view'))

const routes = [
  {
    path: '/app/lessons/:id',
    name: 'Lessons',
    component: LessonsView,
    rolesAccess: [''],
    key: window.location.pathname
  },
]

const authRoutes = [
  {
    path: '/login',
    name: 'auth login',
    component: LoginView,
    rolesAccess: [''],
  },
  {
    path: '/',
    name: 'Redirect',
    component: Redirect,
    componentProps: {
      to: '/app/lessons/1',
    },
    rolesAccess: [''],
  },
]

export { routes, authRoutes }
