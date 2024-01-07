import {PlayIcon} from '@heroicons/react/24/solid'

interface BillBoardButtonProps {
    text: string;
    theme: "light" | "dark"
}

const BillBoardButton = ({text,theme}: BillBoardButtonProps) => {
  return (
    <button className={`${theme === "dark" ? "bg-opacity-30" : null} bg-white rounded-md py-2 px-4 w-auto text-lg font-semibold flex items-center hover:bg-neutral-400 trasition`}>
        <PlayIcon className={`w-7 ${theme === "light" ? null : 'text-white'} mr-1`} />
        <p className={`${theme === "light" ? 'text-black' : 'text-white'} mr-1`}>{text}</p>
    </button>
  )
}

export default BillBoardButton