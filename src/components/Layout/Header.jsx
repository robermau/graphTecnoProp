
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@heroui/react";



const Header = () => {
  return (
    <div>
      <Navbar>
        <NavbarBrand>

          <Link href="/">
            <img
              src="/tecnoLogo.PNG"
              alt="Tecno Logo"
              className="h-20 mr-2 cursor-pointer w-26"
            />
          </Link>
        </NavbarBrand>
        <NavbarContent className=" sm:flex font-terciaria" >
          <NavbarItem>
            <Link
              color="foreground"
              href="/"
              className="transition-colors rounded-2xl px-6 py-3 font-semibold text-[#000000] 
        hover:bg-[#e7f6fd] hover:text-[#1db2ff] 
        data-[active=true]:bg-[#e7f6fd] data-[active=true]:text-[#1db2ff]"
              data-active={window.location.pathname === "/" ? "true" : "false"}
            >
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem isActive={window.location.pathname === "/preguntas-frecuentes"}>
            <Link
              aria-current="page"
              href="/preguntas-frecuentes"
              className="transition-colors rounded-2xl px-6 py-3 font-semibold text-[#000000] 
        hover:bg-[#e7f6fd] hover:text-[#1db2ff] 
        data-[active=true]:bg-[#e7f6fd] data-[active=true]:text-[#1db2ff]"
              data-active={window.location.pathname === "/preguntas-frecuentes" ? "true" : "false"}
            >
              FAQ
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  )
}

export default Header
