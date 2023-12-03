'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, LayoutDashboard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
   const Sidebar_animation = {
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
         },
      },
   };
   const [isOpen, setIsOpen] = useState(true);

   return (
      <aside>
         <motion.div
            variants={Sidebar_animation}
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
               <ul className='whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden'>
                  <li>
                     <Link className='link' href={'/'}>
                        <LayoutDashboard className='min-w-max' />
                        Insight
                     </Link>
                  </li>
               </ul>
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
      </aside>
   );
};

export default Sidebar;
