import { useNavigate } from 'react-router-dom'
import {Card, CardHeader, CardBody, CardFooter,Accordion, AccordionItem} from "@heroui/react";
import { FaQuestion } from "react-icons/fa"
import GlobalErrorHandler from '../../Calculadora/components/GlobalErrorHandler';
const Faq = () => {
      const navigate = useNavigate();

        const defaultContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  return (
<>

    <div
      className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover font-terciaria'
      style={{ backgroundImage: "url('/fondoTres.jpg')" }}
    >
      <Card className="w-full max-w-6xl overflow-hidden bg-white shadow-lg rounded-2xl">
        <GlobalErrorHandler />
        <CardHeader className="flex items-center justify-center p-6 text-black">
          <h1 className="text-3xl font-bold text-center">Preguntas Frecuentes</h1>
          <FaQuestion  className="text-4xl text-[#2eb6f5]" />
        </CardHeader>
        <CardBody className="p-6">
          <Accordion variant="splitted " showDivider>
          <AccordionItem
      key="1"
      aria-label="Accordion 1"
      title={<span className="flex items-center justify-center w-full text-center">Question 1</span>}
      className="bg-[#e7f6fd] text-black rounded-lg mb-4 min-h-[40px]"
    >
      <div className="break-words"> {defaultContent} </div>
    </AccordionItem>
    <AccordionItem
      key="2"
      aria-label="Accordion 2"
      title="Question 2"
      className="bg-[#e7f6fd] text-black rounded-lg mb-4 min-h-[40px]"
    >
      <div className="break-words"> {defaultContent} </div>
    </AccordionItem>
    <AccordionItem
      key="3"
      aria-label="Accordion 3"
      title="Question 3"
      className="bg-[#e7f6fd] text-black rounded-lg mb-4 min-h-[40px]"
    >
      <div className="break-words"> {defaultContent} </div>
    </AccordionItem>
    <AccordionItem
      key="4"
      aria-label="Accordion 4"
      title="Question 4"
      className="bg-[#e7f6fd] text-black rounded-lg mb-4 min-h-[40px]"
    >
      <div className="break-words"> {defaultContent} </div>
    </AccordionItem>
          </Accordion>
        </CardBody>
        <CardFooter />
      </Card>

      <button
        onClick={() => navigate('/')}
        className="mt-8 px-6 py-3 bg-gradient-to-r from-[#1D70B7] to-[#203A8F] text-white rounded-md font-semibold shadow hover:from-[#203A8F] hover:to-[#59358B] transition-all duration-300"
      >
        Volver al inicio
      </button>
    </div>
    
    </>
  )
}

export default Faq
