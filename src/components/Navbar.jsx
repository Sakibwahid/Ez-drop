import { LuGithub } from "react-icons/lu";
import { IoInformationCircleOutline } from "react-icons/io5";
export default function Navbar() {
    return (
      <div className="fixed w-full flex items-center justify-between px-3 md:px-6 py-2">
        <img
          src="/ezdrop.png"
          alt="Ez Drop Logo"
          className="h-10 md:h-12 lg:h-16 mb-0 drop-shadow-lg"
        />
        <div className="flex items-center gap-3 md:gap-4">
          <LuGithub className="w-6 h-6 md:w-8 md:h-6" />
          <IoInformationCircleOutline className="w-6 h-6 md:w-8 md:h-6" />
        </div>
      </div>
    )
}
