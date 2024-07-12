import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { useEnterSubmit } from './hooks/useEnterSubmit';

import styles from './RadioGroup.module.scss';

type OptionProps = {
  	option: OptionType;
  	groupName: string;
  	value: OptionType['value'];
  	title: string;
  	selected: OptionType;
  	onChange: (option: OptionType) => void;
};

export const Option = (props: OptionProps) => {
  	const { option, groupName, value, title, selected, onChange } = props;
  	const optionRef = useRef<HTMLLabelElement>(null);
  	const handleClick: MouseEventHandler<HTMLLabelElement> = () => {
    	onChange(option);
  	};

  	useEnterSubmit({
    	onChange,
    	option,
  });

  	return (
    	<div className={styles.item} data-checked={selected.value === value}>
      		<input
        		type="radio"
        		name={groupName}
        		value={value}
        		checked={selected.value === value}
        		onChange={() => onChange(option)}
        		className={styles.input}
      		/>
      		<label
        		className={clsx(styles.label, { [styles.selected]: selected.value === value })}
        		onClick={handleClick}
        		ref={optionRef}
        		role="button"
        		tabIndex={0}
			>
        	<Text>{title}</Text>
     		</label>
    	</div>
  	);
};