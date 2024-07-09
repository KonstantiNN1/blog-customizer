import { useState } from 'react';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

interface ArrowButtonProps {
  	onClick: () => void;
  	isOpen: boolean;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick, isOpen }) => {
  	return (
    	<div
      		role="button"
      		aria-label="Открыть/Закрыть форму параметров статьи"
      		tabIndex={0}
      		className={`${styles.container} ${isOpen ? styles.open : ''}`}
      		onClick={onClick}
    	>
      	<img src={arrow} alt="иконка стрелочки" className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`} />
    	</div>
  	);
};