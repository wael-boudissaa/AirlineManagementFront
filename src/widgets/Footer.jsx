import { IconButton, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
export function Footer() {
  return (
    <footer className="w-full bg-white p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
      <Link className="text-2xl text-black font-semibold my-5">WAEL</Link>

        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
         
      
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
          <IconButton className="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10">
        <i className="fab fa-github text-2xl" />
      </IconButton>
      <IconButton className="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10">
      <i class="fa-brands fa-instagram text-2xl"></i>    </IconButton>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2023 Wael Boudissa
      </Typography>
    </footer>
  );
}