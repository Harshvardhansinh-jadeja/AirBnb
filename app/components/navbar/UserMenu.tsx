"use client";
import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "../Avatar";
import {useCallback, useState} from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {User} from "@prisma/client";
import {signOut} from "next-auth/react";
import {SafeUser} from "@/app/types";
import useRentalModal from "@/app/hooks/useRentModal";
import {useRouter} from "next/navigation";

interface UserMenuProps {
  currentUser?: User | null;
  // currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentalModal();
  const [iseOpen, setIsOpen] = useState(false);

  const onRent = useCallback(() => {
    console.log("On rent clicked");
    if (!currentUser) {
      return loginModal.onOpen();
    }

    //Open Rent Modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  console.log("Current User is ", currentUser);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb Your Home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {iseOpen && (
        <div className="absolute rounded-xl  shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                  }}
                  label="My trips"
                />
                <MenuItem onClick={() => {}} label="My Favrites" />
                <MenuItem
                  onClick={() => {
                    router.push("/reservations");
                  }}
                  label="My Reservations"
                />
                <MenuItem onClick={() => {}} label="My Properties" />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb My Home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Log out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="LogIn" />
                <MenuItem onClick={registerModal.onOpen} label="Signup" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
