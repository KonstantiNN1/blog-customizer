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
      		aria-disabled={option.isDisabled}
    	>
      		{renderOption ? (
        		renderOption(option)
      		) : (
        		<>
          			<div
            			className={styles.colorBox}
            			style={{
              				backgroundColor: option.value,
              				border: option.value === '#FFFFFF' ? '1px solid #000' : 'none',
            			}}
          			>
            			{option.isDisabled && (
              				<div className={styles.disabledOverlay}></div>
            			)}
          			</div>
          			<Text>{option.title}</Text>
        		</>
      		)}
    	</li>
  	);
};