'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import styles from './MobileNav.module.css';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <button
        onClick={toggleMenu}
        className={styles.menuButton}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={toggleMenu}>
          <div className={styles.mobileMenu}>
            <div className={styles.closeButtonContainer}>
              <button
                onClick={toggleMenu}
                className={styles.closeButton}
              >
                <X size={24} />
              </button>
            </div>
            <nav className={styles.nav}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navItem}
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              ))}
              <div className={styles.themeToggleContainer}>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
