// src/components/Footer.tsx (Correct)
import React from 'react';

function Footer() {
  return (
    <footer>
      <p>© {new Date().getFullYear()} DeanMachines.com</p>
    </footer>
  );
}

export default Footer;