import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
  	const [articleStyles, setArticleStyles] = useState({
    	fontFamily: defaultArticleState.fontFamilyOption.value,
    	fontSize: defaultArticleState.fontSizeOption.value,
    	fontColor: defaultArticleState.fontColor.value,
    	backgroundColor: defaultArticleState.backgroundColor.value,
    	contentWidth: defaultArticleState.contentWidth.value,
  	});

  	const handleApply = (formData: {
    	fontFamily: OptionType;
    	fontSize: OptionType;
    	fontColor: OptionType;
    	backgroundColor: OptionType;
    	contentWidth: OptionType;
  	}) => {
    	setArticleStyles({
      	fontFamily: formData.fontFamily.value,
      	fontSize: formData.fontSize.value,
      	fontColor: formData.fontColor.value,
      	backgroundColor: formData.backgroundColor.value,
      	contentWidth: formData.contentWidth.value,
    	});
  	};

  	const handleReset = () => {
    	setArticleStyles({
     		fontFamily: defaultArticleState.fontFamilyOption.value,
      		fontSize: defaultArticleState.fontSizeOption.value,
      		fontColor: defaultArticleState.fontColor.value,
      		backgroundColor: defaultArticleState.backgroundColor.value,
      		contentWidth: defaultArticleState.contentWidth.value,
    	});
  	};

  	return (
    	<div
      		className={clsx(styles.main)}
      		style={
        		{
          		'--font-family': articleStyles.fontFamily,
          		'--font-size': articleStyles.fontSize,
          		'--font-color': articleStyles.fontColor,
          		'--bg-color': articleStyles.backgroundColor,
          		'--container-width': articleStyles.contentWidth,
        		} as React.CSSProperties
      		}
    		>
      		<ArticleParamsForm onApply={handleApply} onReset={handleReset} />
      		<Article
        		style={{
          			fontFamily: articleStyles.fontFamily,
          			fontSize: articleStyles.fontSize,
          			color: articleStyles.fontColor,
          			backgroundColor: articleStyles.backgroundColor,
          			maxWidth: articleStyles.contentWidth,
        		}}
    	  	/>
    	</div>
  	);
};

root.render(
  	<StrictMode>
    	<App />
  	</StrictMode>
);