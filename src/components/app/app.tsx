import { useState, useMemo, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
  defaultArticleState,
  type ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
  
  const [appliedArticleState, setAppliedArticleState] =
    useState<ArticleStateType>(defaultArticleState);


  const initialArticleState = defaultArticleState;


  const appStyle = useMemo(() => {
    return {
      '--font-family': appliedArticleState.fontFamilyOption.value,
      '--font-size': appliedArticleState.fontSizeOption.value,
      '--font-color': appliedArticleState.fontColor.value,
      '--container-width': appliedArticleState.contentWidth.value,
      '--bg-color': appliedArticleState.backgroundColor.value,
    } as CSSProperties;
  }, [appliedArticleState]);


  const handleApply = (nextState: ArticleStateType) => {
    setAppliedArticleState(nextState);
  };


  const handleReset = () => {
    setAppliedArticleState(initialArticleState);
  };

  return (
    <main className={clsx(styles.main)} style={appStyle}>
      <ArticleParamsForm
        initialArticleState={appliedArticleState}
        initialPageState={initialArticleState}
        onApply={handleApply}
        onReset={handleReset}
      />
      <Article />
    </main>
  );
};