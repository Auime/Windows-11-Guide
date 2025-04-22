import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Logo() {
  return (
    <>
      {/* Desktop logo */}
      <div className="fixed top-4 left-4 z-50 hidden sm:block">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="inline-block">
              <Image
                src="/images/Logo.png"
                alt="Solvex Logo"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto object-contain"
                priority
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Mobile logo */}
      <div className="fixed top-4 left-4 z-50 block sm:hidden">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="inline-block">
              <Image
                src="/images/Logo.png"
                alt="Solvex Logo"
                width={80}
                height={30}
                className="h-6 w-auto object-contain"
                priority
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
