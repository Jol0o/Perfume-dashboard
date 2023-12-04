'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from './../components/layouts/Header';
import Sidebar from './../components/layouts/Sidebar';
import { auth } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from '@/components/auth/Login';

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  const [user] = useAuthState(auth);
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* {!user ?
          <Login /> :
          <>
            <Header /> */}
        <div className='dashboard-layout'>
          < Sidebar />
          {children}
        </div>
        {/* </>
        } */}
      </body>
    </html>
  )
}
