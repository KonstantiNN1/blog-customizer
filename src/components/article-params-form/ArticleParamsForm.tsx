import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select/Select';
import { RadioGroup } from 'components/radio-group/RadioGroup';
import { Separator } from 'components/separator/Separator';
import { fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import wideIcon from 'src/images/wide.svg';
import narrowIcon from 'src/images/narrow.svg';

interface ArticleParamsFormProps {
	onApply: (formData: any) => void;
	onReset: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ onApply, onReset }) => {
  	const [isOpen, setIsOpen] = useState(false);
  	const [formData, setFormData] = useState({
    	fontFamily: fontFamilyOptions[0],
    	fontSize: fontSizeOptions[0],
    	fontColor: fontColors[0],
    	backgroundColor: backgroundColors[0],
    	contentWidth: contentWidthArr[0],
  	});

  	const [error, setError] = useState<string | null>(null);

  	const handleToggle = () => {
		setIsOpen(!isOpen);
  	};

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
    	if (selected.value === formData.backgroundColor.value) {
      		setError('Цвет текста и цвет фона не могут быть одинаковыми.');
      		return;
    	}
    	setFormData((prevData) => ({
      		...prevData,
      		fontColor: selected,
    	}));
    	setError(null);
	};

  	const handleBackgroundColorChange = (selected: OptionType) => {
    	if (selected.value === formData.fontColor.value) {
      		setError('Цвет текста и цвет фона не могут быть одинаковыми.');
      		return;
    	};
    	setFormData((prevData) => ({
      		...prevData,
      		backgroundColor: selected,
    	}));
    	setError(null);
  	};

  	const handleContentWidthChange = (selected: OptionType) => {
    	setFormData((prevData) => ({
      		...prevData,
      		contentWidth: selected,
    	}));
  	};

  	const handleSubmit = (e: FormEvent) => {
    	e.preventDefault();
    	if (formData.fontColor.value === formData.backgroundColor.value) {
      		setError('Цвет текста и цвет фона не могут быть одинаковыми.');
      		return;
    	};
    	onApply(formData);
    	setError(null);
  	};

  	const handleReset = () => {
    	setFormData({
      		fontFamily: fontFamilyOptions[0],
      		fontSize: fontSizeOptions[0],
      		fontColor: fontColors[0],
      		backgroundColor: backgroundColors[0],
      		contentWidth: contentWidthArr[0],
    	});
    	onReset();
    	setError(null);
 	};

  	return (
    	<>
      		<ArrowButton onClick={handleToggle} isOpen={isOpen} />
      		<aside className={`${styles.container} ${isOpen ? styles.open : ''}`}>
        		<h2 className={styles.header}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>
        		<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          		<div className={styles.field}>
            	<Select
             		selected={formData.fontFamily}
              		onChange={handleFontChange}
              		options={fontFamilyOptions}
              		title="Шрифт"
              		placeholder="Выберите шрифт"
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
              				options={fontColors}
              				title="Цвет шрифта"
              				placeholder="Выберите цвет"
              				renderOption={(option) => (
                				<div style={{ display: 'flex', alignItems: 'center' }}>
                  					<div
                    					style={{
                      						width: 20,
                      						height: 20,
                      						backgroundColor: option.value,
                      						marginRight: 8,
                    					}}
                  					></div>
                  				{option.title}
                				</div>
              				)}
            			/>
         			</div>
          		<Separator /> { }
          			<div className={styles.field}>
            			<Select
              				selected={formData.backgroundColor}
              				onChange={handleBackgroundColorChange}
              				options={backgroundColors}
              				title="Цвет фона"
              				placeholder="Выберите цвет фона"
              				renderOption={(option) => (
                				<div style={{ display: 'flex', alignItems: 'center' }}>
                  					<div
                    					style={{
                      						width: 20,
                      						height: 20,
                      						backgroundColor: option.value,
                      						marginRight: 8,
                    					}}
                  					></div>
                  				{option.title}
                				</div>
              				)}
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
          		{error && <div className={styles.error}>{error}</div>}
          			<div className={styles.bottomContainer}>
            			<Button title="Сбросить" type="reset" />
            			<Button title="Применить" type="submit" />
          			</div>
       			</form>
      		</aside>
    	</>
  	);
};