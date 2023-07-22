import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Footer() {
  const cardContent = (
    <>
      <p>
        1- This website is not affiliated with the university in any way, but
        the data is from the university{"'"}s website and I am not responsible
        for any mistakes in the data.
      </p>
      <br />
      <p>
        2- This website is not bug free, if you are using this website and found
        any bug please report them to me on my social media accounts.
      </p>
      <br />
      <p>
        3- This website is not a replacement for the university{"'"}s website,
        it is just a tool to help you organize your schedule and have your
        schedule + friends schedule if you want.
      </p>
    </>
  );
  return (
    <footer
      id="footer"
      style={{ backgroundColor: "#121826" }}
      className="rounded-lg shadow m-10 dark:bg-gray-800"
    >
      <div className="whitespace-normal flex-col justify-between items-center text-center">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 Made By <br />
          <a
            href="https://www.linkedin.com/in/jaafar-al-muallim"
            className="text-white underline"
            target="_blank"
          >
            Jaafar Al-Muallim
          </a>
          <br />
          All Rights Reserved.
        </span>
        <ul className="hidden md:flex flex-wrap justify-center text-sm font-medium my-5 text-gray-400 ">
          <HoverCard>
            <HoverCardTrigger aria-controls="trigger" className="underline">
              IMPORTANT
            </HoverCardTrigger>
            <HoverCardContent className="bg-slate-700 text-white">
              {cardContent}
            </HoverCardContent>
          </HoverCard>
        </ul>
        <ul className="my-3 text-gray-400 md:hidden">
          <Popover>
            <PopoverTrigger aria-controls="trigger" className="underline">
              IMPORTANT
            </PopoverTrigger>
            <PopoverContent className="bg-slate-700 text-white">
              {cardContent}
            </PopoverContent>
          </Popover>
        </ul>
        <ul className="my-5 flex justify-center text-sm font-medium text-gray-500">
          <li className="px-2">
            <a href="https://twitter.com/Ja3far032" target="_blank">
              <Image
                src="/twitter.svg"
                height={40}
                width={40}
                alt="twitter Logo"
              />
            </a>
          </li>
          <li className="px-2">
            <a href="https://www.instagram.com/wrath_12" target="_blank">
              <Image
                src="/instgram.svg"
                height={40}
                width={40}
                alt="instagram Logo"
              />
            </a>
          </li>
          <li className="px-2">
            <a
              href="https://www.linkedin.com/in/jaafar-al-muallim"
              target="_blank"
            >
              <Image
                src="/linkedIn.svg"
                height={40}
                width={40}
                alt="linkedin Logo"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
