
import { AuthenticatedLayout, UnauthenticatedLayout } from '@/components/Layout'
import { Fragment } from 'react'

export function getLayout(pathname: string) {
  if (pathname.match(/^\/login|signup|forgot-password/)) {
    return UnauthenticatedLayout
  }

  if (pathname.match(/^\/homepage/)) {
    return AuthenticatedLayout;
  }

  return Fragment
}