import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select/Select';
import { RadioGroup } from 'components/radio-group/RadioGroup';
import { Separator } from 'components/separator/Separator';
import { fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import wideIcon from 'src/images/wide.svg';
import narrowIcon from 'src/images/narrow.svg';
import { Text } from 'components/text';
import { defaultArticleState } from 'src/constants/articleProps';

interface ArticleParamsFormProps {
  	onApply: (formData: any) => void;
  	onReset: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ onApply, onReset }) => {
  	const [isOpen, setIsOpen] = useState(false);
  	const [formData, setFormData] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
  	});

  	const menuRef = useRef<HTMLDivElement>(null);

  	const handleToggle = () => {
    	setIsOpen(!isOpen);
  	};

  	const handleClickOutside = (event: MouseEvent) => {
    	if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      		setIsOpen(false);
    	}
  	};

  	useEffect(() => {
    	document.addEventListener('mousedown', handleClickOutside);
    	return () => {
      		document.removeEventListener('mousedown', handleClickOutside);
    	};
  	}, []);

  	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    	const { name, value } = e.target;
    	setFormData((prevData) => ({
      		...prevData,
      	[name]: value,
    	}));
  	};

  	const handleFontChange = (selected: OptionType) => {
    	setFormData((prevData) => ({
      		...prevData,
      		fontFamily: selected,
    	}));
  	};

  	const handleFontSizeChange = (selected: OptionType) => {
    	setFormData((prevData) => ({
      		...prevData,
      		fontSize: selected,
    	}));
  	};

  	const handleFontColorChange = (selected: OptionType) => {
    	setFormData((prevData) => ({
    	  	...prevData,
      		fontColor: selected,
    	}));
  	};

  	const handleBackgroundColorChange = (selected: OptionType) => {
    	setFormData((prevData) => ({
    		...prevData,
      		backgroundColor: selected,
    	}));
  	};

  	const handleContentWidthChange = (selected: OptionType) => {
    	setFormData((prevData) => ({
      		...prevData,
      		contentWidth: selected,
    	}));
  	};

  	const handleSubmit = (e: FormEvent) => {
    	e.preventDefault();
    	onApply(formData);
  	};

  	const handleReset = () => {
    	setFormData({
    		fontFamily: defaultArticleState.fontFamilyOption,
      		fontSize: defaultArticleState.fontSizeOption,
      		fontColor: defaultArticleState.fontColor,
      		backgroundColor: defaultArticleState.backgroundColor,
      		contentWidth: defaultArticleState.contentWidth,
    	});
    	onReset();
  	};

  	const renderColorOption = (option: OptionType) => (
    	<div
      	style={{
        	display: 'flex',
        	alignItems: 'center',
        	cursor: option.isDisabled ? 'not-allowed' : 'pointer',
      	}}
      	aria-disabled={option.isDisabled}
    	>
      	<Text family={option.className}>{option.title}</Text>
    	</div>
  	);

  	return (
    	<>
      		<ArrowButton onClick={handleToggle} isOpen={isOpen} />
      			<aside ref={menuRef} className={`${styles.container} ${isOpen ? styles.open : ''}`}>
        		<h2 className={styles.header}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>
        		<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          			<div className={styles.field}>
            			<Select
              				selected={formData.fontFamily}
              				onChange={handleFontChange}
              				options={fontFamilyOptions}
              				title="Шрифт"
              				placeholder="Выберите шрифт"
              				renderOption={(option) => (
                				<Text family={option.className}>
                 	 				{option.title}
                				</Text>
              				)}
            			/>
          			</div>
          			<div className={styles.field}>
            			<RadioGroup
              				name="fontSize"
              				options={fontSizeOptions}
              				selected={formData.fontSize}
              				onChange={handleFontSizeChange}
              				title="Размер шрифта"
            			/>
          			</div>
          			<div className={styles.field}>
            			<Select
             	 			selected={formData.fontColor}
             				onChange={handleFontColorChange}
              				options={fontColors.map((option) => ({
                				...option,
                				isDisabled: option.value === formData.backgroundColor.value,
              				}))}
              				title="Цвет шрифта"
              				placeholder="Выберите цвет"
              				renderOption={(option) => renderColorOption(option)}
            			/>
          			</div>
          			<Separator />
          			<div className={styles.field}>
            			<Select
              				selected={formData.backgroundColor}
              				onChange={handleBackgroundColorChange}
              				options={backgroundColors.map((option) => ({
                				...option,
                				isDisabled: option.value === formData.fontColor.value,
              				}))}
              				title="Цвет фона"
              				placeholder="Выберите цвет фона"
              				renderOption={(option) => renderColorOption(option)}
            			/>
          			</div>
          			<div className={styles.field}>
            			<Select
              				selected={formData.contentWidth}
              				onChange={handleContentWidthChange}
              				options={contentWidthArr}
              				title="Ширина контента"
              				placeholder="Выберите ширину"
              				renderOption={(option) => (
                				<div style={{ display: 'flex', alignItems: 'center' }}>
                 			 		<img
                    					src={option.value === '1394px' ? wideIcon : narrowIcon}
                    					alt={option.title}
                    					style={{ width: 20, height: 20, marginRight: 8 }}
                  					/>
                  					{option.title}
                				</div>
              				)}
            			/>
          			</div>
          			<div className={styles.bottomContainer}>
            			<Button title="Сбросить" type="reset" />
            			<Button title="Применить" type="submit" />
          			</div>
        		</form>
      		</aside>
   		</>
  	);
};