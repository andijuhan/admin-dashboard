'use client';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const SubMenu = ({ data }) => {
   const pathName = usePathname();
   const [subMenuOpen, setSubMenuOpen] = useState(false);

   return (
      <>
         <li
            className={`link ${
               pathName.includes(data.name) && '!text-blue-600'
            }`}
            onClick={() => setSubMenuOpen(!subMenuOpen)}
         >
            {/* Dynamic icon */}
            <data.icon className='min-w-max' />
            <p className='capitalize flex-1'>{data.name}</p>
            <ChevronDown size={20} />
         </li>
         <motion.ul
            animate={
               subMenuOpen
                  ? {
                       height: 'fit-content',
                    }
                  : {
                       height: 0,
                    }
            }
            className='flex flex-col pl-14 text-[0.8rem] font-normal overflow-hidden h-0'
         >
            {data.menus.map((menu, index) => (
               <li key={index}>
                  <Link
                     className={`link !bg-transparent capitalize ${
                        pathName.includes(menu) && '!text-blue-600'
                     }`}
                     href={`/${data.name}/${menu}`}
                  >
                     {menu}
                  </Link>
               </li>
            ))}
         </motion.ul>
      </>
   );
};

export default SubMenu;
