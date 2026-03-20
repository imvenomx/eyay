const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 p-4 md:p-6 lg:p-10">
      <nav className="flex items-center justify-center">
        <a href="/" className="font-handwritten text-2xl md:text-3xl lg:text-4xl text-foreground tracking-wide hover:text-accent transition-colors duration-300">
          <img src="eylogo.png" alt="Logo" className="inline-block h-10 md:h-10 lg:h-12" />
        </a>
      </nav>
    </header>
  );
};

export default Header;
