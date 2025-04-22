import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, HelpCircle, BookOpen, Info, User, MessageSquare, Home, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavBar } from '@/components/ui/tubelight-navbar';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Guides', url: '#guides', icon: BookOpen },
    { name: 'Pricing', url: '#pricing', icon: HelpCircle },
    { name: 'About', url: '#about', icon: Info }
  ];

  const navItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <header className="relative z-40">
      {/* Floating Navigation */}
      <NavBar items={navItems} />

      {/* Floating Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-3">
        <div className="flex items-center space-x-3 bg-background/30 border border-border/40 backdrop-blur-lg py-1 px-2 rounded-full shadow-lg">
          <ThemeToggle />

          <div className="hidden md:flex space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center rounded-full bg-background/50 hover:bg-background/80 border border-border/30 px-4"
              >
                <User className="h-4 w-4 mr-2 text-primary" />
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent font-medium">Sign In</span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                className="flex items-center rounded-full bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-500 text-white px-4 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Get Support
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-background/50 border border-border/30 text-primary"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-16 right-4 bg-background/95 backdrop-blur-lg border border-border/40 rounded-2xl shadow-xl z-40 overflow-hidden w-64"
          >
            <div className="py-3 space-y-2">
              <nav className="flex flex-col space-y-1 px-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center justify-between py-2 px-3 rounded-lg",
                          "hover:bg-primary/10 transition-colors duration-200"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="flex items-center">
                          <Icon className="h-4 w-4 mr-3 text-primary" />
                          <span className="font-medium">{item.name}</span>
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="px-3 pt-2 pb-1 space-y-2 border-t border-border/40 mt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center rounded-lg bg-background/50 hover:bg-background/80 border border-border/30"
                >
                  <User className="h-4 w-4 mr-2 text-primary" />
                  <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent font-medium">Sign In</span>
                </Button>
                <Button
                  size="sm"
                  className="w-full justify-center rounded-lg bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-500 text-white shadow-sm"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Get Support
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
