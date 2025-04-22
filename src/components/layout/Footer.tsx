import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Twitter, Linkedin, Github, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const FooterLink = ({ href, children, external }: FooterLinkProps) => {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link
        href={href}
        className="text-muted-foreground hover:text-foreground transition-colors flex items-center group"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
        {external && (
          <ExternalLink className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </Link>
    </motion.div>
  );
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Resources",
      links: [
        { name: "Windows Guides", href: "#" },
        { name: "Mac Guides", href: "#" },
        { name: "Troubleshooting", href: "#" },
        { name: "Security Tips", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#", external: true },
        { name: "Blog", href: "#" },
        { name: "Press", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Disclaimer", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", href: "#", icon: <Twitter className="h-5 w-5" /> },
    { name: "LinkedIn", href: "#", icon: <Linkedin className="h-5 w-5" /> },
    { name: "GitHub", href: "#", icon: <Github className="h-5 w-5" /> }
  ];

  return (
    <footer className="bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/30 dark:to-slate-950 border-t border-blue-100/50 dark:border-blue-900/20 w-full mt-auto">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/images/Logo.png"
                  alt="Solvex Logo"
                  width={120}
                  height={40}
                  className="h-auto w-auto object-contain"
                />
              </Link>
            </motion.div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Solvex is a company filled with some of the best help desk technicians dedicated to serving you. We pride ourselves on easy-to-follow self-help instructions for resolving computer issues you may have.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href} external={link.external}>
                      {link.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-blue-100/50 dark:border-blue-900/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Solvex Solutions LLC. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center">
            <p className="text-muted-foreground text-sm mr-4">
              Designed with <span className="text-red-500">♥</span> for help desk concepts
            </p>
            <motion.a
              href="#"
              className="p-2 rounded-full bg-blue-100/50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <ChevronUp className="h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
