import { useEffect } from 'react';
import { OptionType } from 'src/constants/articleProps';

type UseEnterOptionSubmit = {
  	onClick: (option: OptionType) => void;
  	option: OptionType;
  	optionRef: React.RefObject<HTMLLIElement>;
};

export const useEnterOptionSubmit = ({
  	onClick,
  	option,
  	optionRef,
}: UseEnterOptionSubmit) => {
  	useEffect(() => {
    	const currentOption = optionRef.current;
   		if (!currentOption) return;
    	const handleEnterKeyDown = (event: KeyboardEvent) => {
      		if (document.activeElement === currentOption && event.key === 'Enter') {
        		onClick(option);
      		}
    	};

    	currentOption.addEventListener('keydown', handleEnterKeyDown);
    	return () => {
      		currentOption.removeEventListener('keydown', handleEnterKeyDown);
    	};
  	}, [option, onClick, optionRef]);
};