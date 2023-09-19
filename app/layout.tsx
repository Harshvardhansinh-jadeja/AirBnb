import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import {Nunito} from "next/font/google";
import RegisterModal from "./modal/RegisterModal";
import ToasterProviders from "./providers/ToasterProviders";
import {Toaster} from "react-hot-toast";
import LoginModal from "./modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./modal/RentModal";
const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb",
  description: "Airbnb website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClientOnly> */}
        {/* <Modal title="Hello World" actionLabel="Submit" isOpen /> */}
        {/* we don't need to use this now. */}
        {/* <ToasterProviders/> */}
        <Toaster />
        <LoginModal />
        <RentModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {/* </ClientOnly> */}
        {children}
      </body>
    </html>
  );
}
