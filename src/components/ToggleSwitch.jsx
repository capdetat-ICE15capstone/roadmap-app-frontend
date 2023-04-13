const ToggleSwitch = ({name, isToggled, setIsToggled = () => {}, callOnChanged = () => {}}) => {
  return (
    <div className="">
        <label htmlFor={name} className="flex items-end cursor-pointer justify-between w-64">
            <p className="text-gray-800 text-sm mb-1 font-bold px-1 py-1">
                {name}
            </p>
            <div className="left-5 relative py-1">
                <input
                    id={name}
                    type="checkbox"
                    className="sr-only"
                    checked={isToggled}
                    onChange={() => {setIsToggled(!isToggled); callOnChanged();}}
                />
                <div className='w-16 h-6'>
                    <div className={`absolute top-1/2 -translate-y-1/2 block w-full h-4 rounded-full ${isToggled ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                    <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full transition border ${isToggled ? 'transform translate-x-10 bg-white border-blue-500' : 'bg-white border-gray-500'}`}></div>
                </div>    
            </div>
        </label>
    </div>
  );
}

export default ToggleSwitch;
