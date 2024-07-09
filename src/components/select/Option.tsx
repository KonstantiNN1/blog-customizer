import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
  	option: OptionType;
  	onClick: (option: OptionType) => void;
  	renderOption?: (option: OptionType) => React.ReactNode;
};

export const Option = (props: OptionProps) => {
  	const { option, onClick, renderOption } = props;
  	const optionRef = useRef<HTMLLIElement>(null);

  	useEnterOptionSubmit({
    	onClick,
    	option,
    	optionRef,
  	});

  	const handleClick: MouseEventHandler<HTMLLIElement> = () => {
    	onClick(option);
  	};

  	return (
    	<li
      		className={clsx(styles.option, styles[option.optionClassName || ''])}
      		value={option.value}
      		onClick={handleClick}
      		tabIndex={0}
      		data-testid={`select-option-${option.value}`}
      		ref={optionRef}
    		>
      		{renderOption ? renderOption(option) : <Text>{option.title}</Text>}
    	</li>
  	);
};