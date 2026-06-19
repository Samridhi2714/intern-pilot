const Footer = () => {
  return (
    <footer className="border-t border-[#D6C2A1] bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="font-medium">
            Samridhi Bhatia
          </p>

          <p className="text-sm text-gray-600">
            samridhibhatia014@gmail.com
          </p>
        </div>

        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
          className="mt-4 md:mt-0 px-4 py-2 rounded-lg bg-[#8B6F47] text-white"
        >
          Built for Digital Heroes
        </a>
      </div>
    </footer>
  );
};

export default Footer;