'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
   ChevronLeft,
   LayoutDashboard,
   Users,
   BookText,
   Settings,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SubMenu from './sub-menu';
import { Blocks, AreaChart, Menu } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
   let isTab = useMediaQuery({ query: '(max-width:768px)' });
   const [isOpen, setIsOpen] = useState(true);
   const pathName = usePathname();

   const Sidebar_animation = isTab
      ? {
           open: {
              x: 0,
              width: '16rem',
              transition: {
                 damping: 40,
              },
           },
           closed: {
              x: -2,
              width: 0,
              transition: {
                 damping: 40,
                 delay: 0.15,
              },
           },
        }
      : {
           open: {
              width: '16rem',
              transition: {
                 damping: 40,
              },
           },
           closed: {
              width: '4rem',
              transition: {
                 damping: 40,
                 delay: 0.15,
              },
           },
        };

   const subMenuList = [
      {
         name: 'build',
         icon: Blocks,
         menus: [
            {
               name: 'auth',
               link: 'auth',
            },
            {
               name: 'app settings',
               link: 'app-settings',
            },
         ],
      },
      {
         name: 'analytics',
         icon: AreaChart,
         menus: [
            {
               name: 'dashboard',
               link: 'dashboard',
            },
            {
               name: 'realtime',
               link: 'realtime',
            },
         ],
      },
   ];

   useEffect(() => {
      if (isTab) {
         setIsOpen(false);
      } else {
         setIsOpen(true);
      }
   }, [isTab]);

   //if path name changed, close sidebar (only on mobile)
   useEffect(() => {
      isTab && setIsOpen(false);
   }, [pathName]);

   return (
      <aside>
         <div
            className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
               isOpen ? 'block' : 'hidden'
            }`}
            onClick={() => setIsOpen(false)}
         ></div>
         <motion.div
            variants={Sidebar_animation}
            initial={{ x: isTab ? -250 : 0 }}
            animate={isOpen ? 'open' : 'closed'}
            className='bg-white text-gray shadow-xl z-[999] w-[256px] max-w-[256px] h-screen overflow-hidden md:relative fixed'
         >
            {/* Logo */}
            <div className='flex items-center gap-2.5 border-b py-3 mx-3'>
               <Image
                  src={'/images/icon.png'}
                  alt='logo'
                  width={45}
                  height={45}
               />
               <span className='text-xl font-medium whitespace-pre'>
                  Firefake
               </span>
            </div>
            {/* Menu */}
            <div className='h-full flex flex-col'>
               <ul className='whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 h-[70%] md:h-[68%]'>
                  <li>
                     <Link
                        className={`link ${pathName === '/' && 'active'}`}
                        href={'/'}
                     >
                        <LayoutDashboard className='min-w-max' />
                        Dashboard
                     </Link>
                  </li>
                  <li>
                     <Link className='link' href={'/'}>
                        <BookText className='min-w-max' />
                        Posts
                     </Link>
                  </li>
                  {/* With sub menu */}
                  {(isOpen || isTab) && (
                     <div className='border-y py-5 border-slate-300'>
                        <small className='pl-3 text-slate-500 inline-block mb-2'>
                           Product categories
                        </small>
                        {subMenuList.map((menu, index) => (
                           <div key={index} className='flex flex-col gap-1'>
                              <SubMenu data={menu} />
                           </div>
                        ))}
                     </div>
                  )}

                  <li>
                     <Link className='link' href={'/'}>
                        <Users className='min-w-max' />
                        Users
                     </Link>
                  </li>
                  <li>
                     <Link className='link' href={'/'}>
                        <Settings className='min-w-max' />
                        Settings
                     </Link>
                  </li>
               </ul>
               {isOpen && (
                  <div className='flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full font-medium'>
                     <div className='flex items-center justify-between border-y border-slate-300 p-4'>
                        <div>
                           <p>Spark</p>
                           <small>No-cost $0/month</small>
                        </div>
                        <p className='text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl'>
                           Upgrade
                        </p>
                     </div>
                  </div>
               )}
            </div>
            {/* Sidebar control */}
            <motion.div
               animate={
                  isOpen
                     ? {
                          x: 0,
                          y: 0,
                          rotate: 0,
                       }
                     : {
                          x: -10,
                          y: -200,
                          rotate: 180,
                       }
               }
               transition={{ duration: 0 }}
               onClick={() => setIsOpen(!isOpen)}
               className='absolute w-fit h-fit z-50 right-2 bottom-5 cursor-pointer hidden md:block'
            >
               <ChevronLeft />
            </motion.div>
         </motion.div>
         <div className='m-3 md:hidden' onClick={() => setIsOpen(true)}>
            <Menu size={25} />
         </div>
      </aside>
   );
};

export default Sidebar;
