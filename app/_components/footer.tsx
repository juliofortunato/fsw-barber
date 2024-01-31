const Footer = () => {
  return (
    <footer className="w-full bg-secondary py-6 px-5">
      <p className="text-gray-400 text-xs font-bold opacity-75">
        © {new Date().getFullYear()} Copyright FSW Barber
      </p>
    </footer>
  );
};

export default Footer;