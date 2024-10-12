function Header() {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-green-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img
              src="../../public/logo.png"
              className="mr-3 h-9 sm:h-16"
              alt="Logo"
            />
          </a>

          <div className="flex items-center lg:order-2"></div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
