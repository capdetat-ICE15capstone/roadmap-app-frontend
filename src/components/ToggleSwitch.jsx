const ToggleSwitch = ({name, isToggled, setIsToggled}) => {
  return (
    <div className="">
        <label htmlFor={name} className="flex items-end cursor-pointer justify-between w-72">
            <p className="text-gray-800 text-sm mb-1 font-bold px-1">
                {name}
            </p>
            <div className="left-5 relative">
                <input
                    id={name}
                    type="checkbox"
                    className="sr-only"
                    checked={isToggled}
                    onChange={() => setIsToggled(!isToggled)}
                />
                <div className='w-24 h-8'>
                    <div className={`absolute top-1/2 -translate-y-1/2 block bg-gray-600 w-full h-6 rounded-full ${isToggled ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                    <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition border border-gray-500 ${isToggled ? 'transform translate-x-16 bg-white border-blue-500' : 'bg-white'}`}></div>
                </div>    
            </div>
        </label>
    </div>
  );
}

export default ToggleSwitch;
